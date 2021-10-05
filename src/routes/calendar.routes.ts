import * as controller from '../controller/google-calendar.controller';
import { Router } from 'express';
const calendar = Router();

calendar.post('/token/add', controller.addToken);
calendar.get('/token/:user_id', controller.getToken);
calendar.get('/token', controller.getAllTokens);
calendar.put('/add/:user_id', controller.addCalendar);
calendar.get('/find/:user_id', controller.getCalendarId);
export { calendar };
