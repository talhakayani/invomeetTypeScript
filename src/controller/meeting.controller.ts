import { NextFunction, Response, Request } from 'express';

import { db } from '../models';
const { Op } = require('sequelize');
export const addMeeting = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { body } = req;
    if (!body.hasOwnProperty('reservedBy')) {
      throw new Error('Please attach the body');
    }
    const result = await db.Meeting.create(body);
    return res
      .status(200)
      .json({ status: 200, message: 'Meeting created', meeting: result });
  } catch (err: any) {
    return res
      .status(400)
      .json({ status: 400, message: err.message, meeting: null });
  }
};
export const getMeetings = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const meetings = await db.Meeting.findAll({
      include: {
        model: db.Room,
        as: 'room',
      },
    });
    let message = 'Meetings Found';
    if (!meetings.length) message = 'No meetings are available';
    return res.status(200).json({ status: 200, message, meetings });
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ status: 400, message: err.message });
  }
};

export const updateMeetingById = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('Please provide the Id ');
    const result = await db.Meeting.update(
      { inProgress: 'EndMeeting' },
      {
        where: {
          id: id,
        },
      }
    );

    let message = 'Meeting End';
    if (!result) message = 'Unable to end the meeting';
    return res.status(200).json({ status: 200, message });
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ status: 400, message: err.message });
  }
};

export const inProgressMeetings = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const meetings = await db.Meeting.findAll({
      where: {
        inProgress: 'InProgress',
      },
      include: {
        model: db.Room,
        as: 'room',
      },
    });
    let message = 'Meetings Found';
    if (!meetings.length) message = 'No meetings are available';
    return res.status(200).json({ status: 200, message, meetings });
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ status: 400, message: err.message });
  }
};

export const getMeetingsHistory = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { reservedBy } = req.params;
    if (!reservedBy) throw new Error('please provide the user id');
    const meetings = await db.Meeting.findAll({
      where: {
        reservedBy: reservedBy,
        inProgress: 'EndMeeting',
      },
      include: {
        model: db.Room,
        as: 'room',
      },
    });
    let message = 'Meetings Found';
    if (!meetings.length) message = 'No meetings are available';
    return res.status(200).json({ status: 200, message, meetings });
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ status: 400, message: err.message });
  }
};

export const inProgressMeetingsByUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { reservedBy } = req.params;
    if (!reservedBy) throw new Error('Please provide the reserver id');
    const meetings = await db.Meeting.findAll({
      where: {
        reservedBy: reservedBy,
        inProgress: 'InProgress',
      },
      include: {
        model: db.Room,
        as: 'room',
      },
    });
    let message = 'Meetings Found';
    if (!meetings.length) message = 'No meetings are available';
    return res.status(200).json({ status: 200, message, meetings });
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ status: 400, message: err.message });
  }
};
export const getInformationByEventId = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { googleCalendarEventId } = req.params;
    if (!googleCalendarEventId)
      throw new Error('please provide the Google Calendar Event Id');
    const meeting = await db.Meeting.findOne({
      where: {
        googleCalendarEventId: googleCalendarEventId,
        inProgress: 'InProgress',
      },
    });
    let message = 'Meeting found';
    if (!meeting) message = 'No meeting found';
    res.status(200).json({
      status: 200,
      message,
      meeting,
    });
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ status: 400, message: err.message });
  }
};

export const removeHistory = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { reservedBy } = req.params;
    if (!reservedBy) throw new Error('Please add the user id as path params');
    const result = await db.Meeting.destroy({
      where: {
        reservedBy: reservedBy,
      },
    });
    let message = 'History cleared';
    if (!result) message = 'History already cleared';

    return res.status(200).json({
      status: 200,
      message,
    });
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ status: 400, message: err.message });
  }
};

export const getMeetingsHistoryByDate = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { reservedBy, reservedFrom } = req.params;
    let date = new Date(reservedFrom);
    const greaterDate = new Date(reservedFrom);
    greaterDate.setDate(date.getDate() + 1);
    console.log(date, greaterDate);
    if (!reservedBy || !reservedFrom)
      throw new Error('please provide the user id  and date');
    const meetings = await db.Meeting.findAll({
      where: {
        reservedBy: reservedBy,
        [Op.and]: [
          { reservedFrom: { [Op.gte]: date } },
          { reservedFrom: { [Op.lt]: greaterDate } },
        ],
        inProgress: 'EndMeeting',
      },
      include: {
        model: db.Room,
        as: 'room',
      },
    });
    let message = 'Meetings Found';
    if (!meetings.length) message = 'No meetings are available';
    return res.status(200).json({ status: 200, message, meetings });
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ status: 400, message: err.message });
  }
};
