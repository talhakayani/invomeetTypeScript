import fs from 'fs';

// this function will save the information for single time
const insertInformation = (fileName: string, data: string, type: string) => {
  let readedJSON: any = {};
  if (!fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, '');
  } else {
    readedJSON = JSON.parse(fs.readFileSync(fileName).toString());
  }
  switch (type) {
    case 'room-selection':
      readedJSON.selected_room = data;
      break;
    case 'meeting-with':
      readedJSON.selected_users = data;
      break;
    case 'meeting-date':
      readedJSON.selected_date = data;
      break;
    case 'meeting-time':
      readedJSON.selected_time = data;
      break;
  }

  fs.writeFileSync(fileName, JSON.stringify(readedJSON));
};

const getInformationFromTheFile = (fileName: string) => {
  // it will return an error when there no tempData.json file is exsits
  if (!fs.existsSync(fileName))
    return {
      error: true,
      message: "You're not providing any meeting related information",
    };
  const data = JSON.parse(fs.readFileSync(fileName).toString());
  // it will return the JSON object when user select the room date and time
  if (
    data.hasOwnProperty('selected_room') &&
    data.hasOwnProperty('selected_date') &&
    data.hasOwnProperty('selected_time')
  ) {
    if (!data.selected_date && !data.selected_room && !data.selected_time)
      return {
        error: true,
        message:
          "please don't forget to select the Rooms Available, Meeting Date and Meeting time. Thank you",
      };
    return data;
  }

  // this will be return if user forget to select the date time and room for meeting
  return {
    error: true,
    message:
      "please don't forget to select the Rooms Available, Meeting Date and Meeting time. Thank you",
  };
};

const generatedTextForUsers = (users: string[]) => {
  if (!users.length) return '';
  if (users.length == 1) return `<@${users[0]}>`;
  let text = 'with ';
  for (let i = 0; i < users.length - 1; i++) {
    text += '<@' + users[i] + '>, ';
  }
  text += `and <@${users[users.length - 1]}>`;
  return text;
};

const sendErrorMessage = (message: string) => {
  return [
    {
      type: 'section',
      text: { type: 'mrkdwn', text: message },
    },
  ];
};

/**
 * Implementation of google calendar event
 */

const TIMEOFFSET = '+05:00';

const dateTimeForCalander = (dateTime: string, hours = 1) => {
  dateTime.replace(/-/g, ' ');
  const event = new Date(dateTime);
  const startDate = event;
  const endDate = new Date(
    new Date(startDate).setHours(startDate.getHours() + hours)
  );
  return {
    start: startDate,
    end: endDate,
  };
};

const eventForGoogleCalendar = (information: any) => {
  let dateTime = dateTimeForCalander(information.dateTime);
  let event = {
    summary: 'InvoMeet Room Reservation',
    location: information.location,
    description: information.message.replace(/\*/g, '').replace('/n', ' '),
    start: {
      dateTime: dateTime['start'],
      timeZone: 'Asia/Karachi',
    },
    end: {
      dateTime: dateTime['end'],
      timeZone: 'Asia/Karachi',
    },
    recurrence: ['RRULE:FREQ=DAILY;COUNT=1'],
    attendees: information.attendees,
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  };
  return event;
};

const getDateFromText = (text: string) => {
  let date = new Date();
  if (text.includes('today')) {
    return (
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  }
  if (text.includes('yesterday')) {
    const yesterday = new Date();
    console.log('yesterday ' + yesterday.setDate(date.getDate() - 1));
    return (
      yesterday.getFullYear() +
      '-' +
      (yesterday.getMonth() + 1) +
      '-' +
      yesterday.getDate()
    );
  }
  const index = text.search(/([1-9])\w+/);
  if (index < 0) return null;

  // date = text.slice(index, index + 10);
  let dateText: string = text.slice(index, index + 10);
  let dateTextArray: string[] = dateText.split(' ')[0].split('-');
  if (dateTextArray.length == 1) return null;
  if (dateTextArray[1].length == 1) dateTextArray[1] = '0' + dateTextArray[1];
  if (dateTextArray[2].length == 1) dateTextArray[2] = '0' + dateTextArray[2];
  return dateTextArray.join('-');
};

const getDateAndTime = dateTimeForCalander;

export {
  getDateAndTime,
  getDateFromText,
  eventForGoogleCalendar,
  generatedTextForUsers,
  getInformationFromTheFile,
  insertInformation,
  sendErrorMessage,
};
