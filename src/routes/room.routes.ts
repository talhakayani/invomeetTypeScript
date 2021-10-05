import * as controller from '../controller/room.controller';
import { Router } from 'express';
const room = Router();
room.get('/', controller.getAllRooms);
room.get('/ids/:name', controller.getRoomId);
room.post('/add', controller.addRoom);
room.delete('/remove/:name', controller.removeRoom);
room.get('/meetings', controller.getAllRoomsAndMeetings);
room.get('/meetings/:name', controller.getMeetingsByRoom);
room.get('/meetings/user/:reservedBy', controller.getMeetingsByUser);
room.get(
  '/meetings/inProgress/user/:reservedBy',
  controller.getInProgressMeetingsByUser
);
room.get('/find/:name', controller.getRoomInfo);
export { room };
