import * as controller from '../controller/commands.controller';
import { Router } from 'express';
const commands = Router();

commands.post('/rooms-available', controller.roomsAvailable);
commands.post('/connect-google-calendar', controller.connectToGoogleCalendar);
commands.post('/my-meetings', controller.my_meetings);
commands.post('/reserved-rooms', controller.getInfoReservedRooms);
commands.post('/meetings-history', controller.getEndMeetingsHistory);

export { commands };
