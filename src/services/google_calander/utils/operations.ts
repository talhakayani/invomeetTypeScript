import { google } from 'googleapis';

const addEvent = async (event: any, auth: any) => {
  try {
    const calendar = google.calendar({ version: 'v3', auth });
    const options: any = {
      auth: auth,
      calendarId: 'primary',
      resource: event,
    };
    const res: any = await calendar.events.insert(options);
    if (res.data === '') return null;
    return res.data;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
};

const deleteGoogleCalendarEvent = async (
  eventId: string,
  calendarId: string,
  auth: any
) => {
  try {
    const calendar = google.calendar({ version: 'v3', auth });
    const res = await calendar.events.delete({
      auth: auth,
      calendarId: calendarId,
      eventId: eventId,
    });
    return 'Event Deleted';
    //if (res.data ) return 'Event Deleted';
    //return null;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
};

export { deleteGoogleCalendarEvent, addEvent };
