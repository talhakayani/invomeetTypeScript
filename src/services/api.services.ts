import axios from 'axios';

const DOMAIN = 'http://localhost:3000';
/**
 *  Rooms api Services
 */

const getAllRooms = async () => {
  try {
    const { data } = await axios.get(DOMAIN + '/rooms');
    return data.rooms;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getRoomInfoByName = async (name: string) => {
  try {
    const { data } = await axios.get(DOMAIN + `/rooms/find/${name}`);
    if (!data) return null;
    return data.rooms;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getAllRoomsWithAllMeetingsInProgress = async () => {
  try {
    const { data } = await axios.get(DOMAIN + '/rooms/meetings');
    return data.rooms;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getRoomIdByRoomName = async (roomName: string) => {
  try {
    const { data } = await axios.get(DOMAIN + `/rooms/ids/${roomName}`);
    if (!data.rooms.hasOwnProperty('id')) return null;
    return data.rooms.id;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getInProgressMeetingsByRooms = async (roomName: string) => {
  try {
    const { data } = await axios.get(DOMAIN + `/rooms/meetings/${roomName}`);
    if (!data) throw new Error('Something went wrong');
    return data.rooms;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getInProgressMeetingsByUser = async (reservedBy: string) => {
  try {
    const { data } = await axios.get(
      DOMAIN + `/rooms/meetings/inProgress/user/${reservedBy}`
    );
    if (!data) return [];
    return data.rooms;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getAllMeetingsByUser = async (reservedBy: string) => {
  try {
    const { data } = await axios.get(
      DOMAIN + `/rooms/meetings/user/${reservedBy}`
    );
    if (!data) return [];
    return data.rooms;
  } catch (err) {
    console.log(err);
    return [];
  }
};

/**
 * Google Calendar Configrations
 */
const addGoogleAuthToken = async (
  userId: string,
  token: any,
  calendarId: string
) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: DOMAIN + '/calendar/token/add',
      data: { userId, token, calendarId },
      headers: { 'Content-Type': 'application/json' },
    });
    if (!data) return null;
    return data;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
};

const getGoogleAuthToken = async (user_id: string) => {
  try {
    const { data } = await axios.get(DOMAIN + `/calendar/find/${user_id}`);
    if (!data.hasOwnProperty('data')) return null;
    return JSON.parse(data.data.token);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const addGoogleCalendar = async (user_id: string, { calendarId }: any) => {
  try {
    const { data } = await axios.put(DOMAIN + `/calendar/add/${user_id}`, {
      calendarId,
    });
    if (!data) return null;
    return data.message;
  } catch (err) {
    console.log(err);
    return null;
  }
};
const getGoogleCalendarId = async (user_id: string) => {
  try {
    const { data } = await axios.get(DOMAIN + `/calendar/find/${user_id}`);
    if (!data) return null;
    return data.data.calendarId;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 *  Meeting API
 */

const addInvoMeeting = async (
  reservedBy: string,
  reservedWith: string,
  reservedFrom: Date,
  reservedTo: Date,
  inProgress = 'InProgress',
  roomId: number,
  googleCalendarEventId: string
) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: DOMAIN + '/meetings/add',
      data: {
        reservedBy,
        reservedWith,
        reservedFrom,
        reservedTo,
        inProgress,
        roomId,
        googleCalendarEventId,
      },
      headers: { 'Content-Type': 'application/json' },
    });

    if (!data) throw new Error('No data found');
    return { data: true, meeting: data };
  } catch (err: any) {
    return {
      data: false,
      message: err.response.data.message.replace('Validation error:', ''),
    };
  }
};

const updateMeetingStatus = async (meetingId: number) => {
  try {
    console.log(meetingId);
    const { data } = await axios.put(DOMAIN + `/meetings/update/${meetingId}`);
    if (!data) return null;
    return data.message;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getMeetingHistory = async (reservedBy: string) => {
  try {
    const { data } = await axios.get(
      DOMAIN + `/meetings/history/${reservedBy}`
    );
    if (!data) return null;
    return data.meetings;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getInformationByMeetingId = async (googleCalendarMeetingId: string) => {
  try {
    const { data } = await axios.get(
      DOMAIN + `/meetings/info/${googleCalendarMeetingId}`
    );
    if (!data) return null;
    return data.meeting;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const removeHistory = async (userId: string) => {
  try {
    const { data } = await axios.delete(
      DOMAIN + `/meetings/history/remove/${userId}`
    );
    if (!data) return null;
    return data.message;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getMeetingHistoryByDate = async (userId: string, date: string) => {
  try {
    const { data } = await axios.get(
      DOMAIN + `/meetings/history/${userId}/${date}`
    );
    if (!data) return null;
    return data.meetings;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export {
  getMeetingHistoryByDate,
  getMeetingHistory,
  removeHistory,
  getInformationByMeetingId,
  updateMeetingStatus,
  addInvoMeeting,
  getGoogleCalendarId,
  getAllRooms,
  getAllMeetingsByUser,
  getRoomIdByRoomName,
  getGoogleAuthToken,
  getRoomInfoByName,
  getAllRoomsWithAllMeetingsInProgress,
  getInProgressMeetingsByRooms,
  getInProgressMeetingsByUser,
  addGoogleAuthToken,
  addGoogleCalendar,
};
