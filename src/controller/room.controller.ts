import { NextFunction, Request, Response } from 'express';
import { db } from '../models';
export const getPost = (req: Request, res: Response, _next: NextFunction) => {
  return res.status(200).json({ status: 200, message: 'Server is connected' });
};

export const addRoom = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const body = req.body;
    if (!body) throw new Error('Please provide the body');
    const result = await db.Room.create(body);
    if (!result) throw new Error('Unable to create user');
    return res
      .status(200)
      .json({ status: 200, message: 'user created', result });
  } catch (err: any) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

export const getAllRooms = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const rooms = await db.Room.findAll();
    let message = 'Rooms Found!';
    if (!rooms.length) message = 'No room found';
    return res.status(200).json({ status: 200, message, rooms });
  } catch (err: any) {
    return res
      .status(400)
      .json({ status: 400, message: err.message, rooms: [] });
  }
};
export const removeRoom = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { name } = req.params;
    if (!name) throw new Error('Please attach the name as path parameter');
    const result = await db.Room.destroy({
      where: {
        name: name,
      },
    });
    let message = 'Room Deleted';
    if (!result) message = 'Room not found, Unable to delete the room';
    return res.status(200).json({ status: 200, message });
  } catch (err: any) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

export const getAllRoomsAndMeetings = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const rooms = await db.Room.findAll({
      include: {
        model: db.Meeting,
        as: 'meetings',
        where: {
          inProgress: 'InProgress',
        },
      },
    });
    let message = 'Rooms Found!';
    if (!rooms.length) message = 'No room found';
    return res.status(200).json({ status: 200, message, rooms });
  } catch (err: any) {
    return res
      .status(400)
      .json({ status: 400, message: err.message, rooms: [] });
  }
};

export const getMeetingsByRoom = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { name } = req.params;
    if (!name) throw new Error('Please attach the name as path params ');
    const rooms = await db.Room.findAll({
      where: {
        name: name,
      },
      include: {
        model: db.Meeting,
        as: 'meetings',
      },
    });
    let message = 'Rooms Found!';
    if (!rooms.length) message = 'No room found';
    return res.status(200).json({ status: 200, message, rooms });
  } catch (err: any) {
    return res
      .status(400)
      .json({ status: 400, message: err.message, rooms: [] });
  }
};

export const getMeetingsByUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { reservedBy } = req.params;
    if (!reservedBy) throw new Error('Please attach the name as path params ');
    const rooms = await db.Room.findAll({
      include: {
        model: db.Meeting,
        as: 'meetings',
        where: {
          reservedBy: reservedBy,
        },
      },
    });
    let message = 'Rooms Found!';
    if (!rooms.length) message = 'No room found';
    return res.status(200).json({ status: 200, message, rooms });
  } catch (err: any) {
    return res
      .status(400)
      .json({ status: 400, message: err.message, rooms: [] });
  }
};

export const getInProgressMeetingsByUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { reservedBy } = req.params;
    if (!reservedBy) throw new Error('Please attach the name as path params ');
    const rooms = await db.Room.findAll({
      include: {
        model: db.Meeting,
        as: 'meetings',
        where: {
          reservedBy: reservedBy,
          inProgress: 'InProgress',
        },
      },
    });
    let message = 'Rooms Found!';
    if (!rooms.length) message = 'No room found';
    return res.status(200).json({ status: 200, message, rooms });
  } catch (err: any) {
    return res
      .status(400)
      .json({ status: 400, message: err.message, rooms: [] });
  }
};

export const getRoomId = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { name } = req.params;
    if (!name) throw new Error('Please attach the name of the room');
    const rooms = await db.Room.findOne({
      where: {
        name: name,
      },
    });
    let message = 'Room Found!';
    if (!rooms) message = 'No room found';
    return res.status(200).json({ status: 200, message, rooms });
  } catch (err: any) {
    return res
      .status(400)
      .json({ status: 400, message: err.message, rooms: [] });
  }
};

export const getRoomInfo = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { name } = req.params;
    if (!name) throw new Error('Please provide the name of the room');
    const rooms = await db.Room.findOne({
      where: {
        name: name,
      },
    });
    let message = 'Rooms Found!';
    if (!rooms) message = 'No room found';
    return res.status(200).json({ status: 200, message, rooms });
  } catch (err: any) {
    return res
      .status(400)
      .json({ status: 400, message: err.message, rooms: {} });
  }
};
