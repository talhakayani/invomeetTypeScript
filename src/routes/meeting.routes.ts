import * as controller from '../controller/meeting.controller';
const meeting = require('express').Router();

meeting.get('/', controller.getMeetings);
meeting.post('/add', controller.addMeeting);
meeting.put('/update/:id', controller.updateMeetingById);
meeting.get('/inProgress', controller.inProgressMeetings);
meeting.get('/history/:reservedBy', controller.getMeetingsHistory);
meeting.get('/inProgress/:reservedBy', controller.inProgressMeetingsByUser);
meeting.get('/info/:googleCalendarEventId', controller.getInformationByEventId);
meeting.delete('/history/remove/:reservedBy', controller.removeHistory);
meeting.get(
  '/history/:reservedBy/:reservedFrom',
  controller.getMeetingsHistoryByDate
);
export { meeting };
