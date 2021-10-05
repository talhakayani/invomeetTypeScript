import {
  sendPrivateMessage,
  sendMessageToSlackUrl,
} from '../services/command.services';
import {
  generateMessageForRooms,
  generateMesssageForMeetings,
  generateMessageForMeetingHistory,
} from '../services/message.services';
import {
  getAllRooms,
  getGoogleAuthToken,
  getInProgressMeetingsByUser,
  getAllRoomsWithAllMeetingsInProgress,
  getMeetingHistory,
  getMeetingHistoryByDate,
} from '../services/api.services';
require('dotenv').config('../../.env');
import fs from 'fs';
import {
  sendErrorMessage,
  getDateFromText,
} from '../services/utils/helper-functions';
import { NextFunction, Request, Response } from 'express';
const { authorize } = require('../services/google_calander/auth');

export const roomsAvailable = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    res.status(200).send();
    const { token, channel_id, user_id, command, text, response_url } =
      req.body;
    if (fs.existsSync(`tempData${user_id}.json`))
      fs.unlinkSync(`tempData${user_id}.json`);

    const rooms = await getAllRooms();
    if (rooms.length) {
      const message = generateMessageForRooms(rooms);
      sendMessageToSlackUrl(channel_id, 'Available Rooms', message);

      return res.status(200).send();
    }
    sendPrivateMessage(
      channel_id,
      user_id,
      'Confirmation Message',
      sendErrorMessage(
        "We're really sorry, currently no rooms are available. Please try again later"
      )
    );
    console.log('everything is running');
  } catch (err) {
    return res.status(400).end('Something went wrong');
  }
};

export const connectToGoogleCalendar = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    res.status(200).send();
    const { token, channel_id, user_id, command, text, response_url } =
      req.body;
    const credentials = JSON.parse(process.env.CREDENTIALS || 'Something');

    const data = await getGoogleAuthToken(user_id);
    if (!data) {
      authorize(credentials, channel_id, user_id, false);
      return res.status(200).send();
    }

    sendPrivateMessage(
      channel_id,
      user_id,
      'Google Calendar Already Configured',
      sendErrorMessage('Google Calendar Already Configured')
    );
    return res.status(200).send();
  } catch (err) {
    console.log(err);
    return res.status(400).send();
  }
};

export const my_meetings = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    res.status(200).send();
    const { body } = req;
    const { user_id, channel_id } = body;
    const meetings = await getInProgressMeetingsByUser(user_id);
    if (!meetings.length) {
      sendPrivateMessage(
        channel_id,
        user_id,
        'Your meeting details',
        sendErrorMessage("You don't have any meeting for now")
      );
      return res.status(200).send();
    }
    const message = generateMesssageForMeetings(meetings);

    sendPrivateMessage(channel_id, user_id, 'Your Meetings', message);
  } catch (err) {
    console.log(err);
    return res.status(200).send();
  }
};

export const getInfoReservedRooms = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    res.status(200).send();
    const rooms = await getAllRoomsWithAllMeetingsInProgress();
    const { user_id, channel_id } = req.body;
    if (!rooms.length) {
      sendPrivateMessage(
        channel_id,
        user_id,
        'No meeting found in any room',
        sendErrorMessage('Currently there is no meeting room is reserved')
      );
      return res.status(200).send();
    }
    const message = generateMesssageForMeetings(rooms);

    sendPrivateMessage(
      channel_id,
      user_id,
      'Reserved Rooms Information',
      message
    );
    return res.status(200).send();
  } catch (err) {
    console.log(err);
    return res.status(400).send();
  }
};

export const getEndMeetingsHistory = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    res.status(200).send();
    const { user_id, channel_id, text } = req.body;
    let showBtn = true;
    let history,
      date: string = '';
    if (!text) history = await getMeetingHistory(user_id);
    else {
      showBtn = false;
      date = getDateFromText(text.toLowerCase()) || '';
      const enteredDate: Date = new Date(date);
      console.log('Printing date', enteredDate);
      if (!date || enteredDate.toString() === 'Invalid Date' || !enteredDate) {
        sendPrivateMessage(
          channel_id,
          user_id,
          'Please provide the date',
          sendErrorMessage(
            "Please provide date in format => YYYY-MM-DD (YEAR-MONTH-DAY)\n*[NOTE]* if you want today's or yesterday's meetings history then please type */meeting-history today* OR *yesterday*, Thank you"
          )
        );
        return res.status(200).send();
      }
      history = await getMeetingHistoryByDate(user_id, date);
    }

    if (!history.length) {
      const enteredDate = new Date(date);
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      let message = `Currently you don't have any meeting history on *${
        days[enteredDate.getDay()]
      }, ${enteredDate.getDate()} ${
        monthNames[enteredDate.getMonth()]
      }, ${enteredDate.getFullYear()}* may be you reserve meetings but untill they are end it will not considered as history`;

      if (!text)
        message =
          "Currently you don't have any meeting history, may be you reserve meetings but untill they are end it will not considered as history";
      sendPrivateMessage(
        channel_id,
        user_id,
        'Your history is ready',
        sendErrorMessage(message)
      );
      return res.status(200).send();
    }
    const message = generateMessageForMeetingHistory(history, showBtn);
    const result = await sendPrivateMessage(
      channel_id,
      user_id,
      'Your history',
      message
    );
    return res.status(200).send();
  } catch (err) {
    console.log(err);
    return res.status(400).send();
  }
};
