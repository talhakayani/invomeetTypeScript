import { NextFunction, Request, Response } from 'express';

import { db } from '../models';

const addToken = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { body } = req;
    if (!body) throw new Error('Please attach the body with this');
    const result = await db.CalendarConfig.create(body);
    if (!result) throw new Error('Something went wrong');
    return res.status(200).json({
      status: 200,
      message: result,
    });
  } catch (err: any) {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

const getToken = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { user_id } = req.params;
    console.log(user_id);
    if (!user_id) throw new Error('Please provide the user id');
    const result = await db.CalendarConfig.findOne({
      where: {
        userId: user_id,
      },
    });
    if (!result)
      return res
        .status(200)
        .json({ status: 200, message: 'No Token found', token: result });
    return res
      .status(200)
      .json({ status: 200, message: 'Token found', token: result });
  } catch (err: any) {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

const getAllTokens = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const tokens = await db.CalendarConfig.findAll();
    if (!tokens.length)
      return res
        .status(200)
        .json({ status: 200, message: 'No Token Found', tokens });
    return res
      .status(200)
      .json({ status: 200, message: 'Tokens  Found', tokens });
  } catch (err: any) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};
const addCalendar = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { params, body } = req;
    const { user_id } = params;
    if (!body) throw new Error('Please attach the body with this');
    if (!user_id) throw new Error('Please provide the calendar Id');
    const result = await db.CalendarConfig.update(body, {
      where: {
        userId: user_id,
      },
    });

    if (result[0] == 0) throw new Error('No User Found');
    return res.status(200).json({
      status: 200,
      message: "User's calendar Id added",
    });
  } catch (err: any) {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

const getCalendarId = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { user_id } = req.params;
    if (!user_id) throw new Error('Please attach the path params');
    const calendarId = await db.CalendarConfig.findOne({
      where: {
        userId: user_id,
      },
    });

    if (!calendarId)
      return res.status(200).json({ status: 200, message: 'No user found' });
    return res
      .status(200)
      .json({ status: 200, message: 'Calendar Id found', data: calendarId });
  } catch (err: any) {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

export { getCalendarId, getAllTokens, getToken, addCalendar, addToken };
