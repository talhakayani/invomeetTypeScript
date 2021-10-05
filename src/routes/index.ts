import express from 'express';
const router = express.Router();
import { commands } from './commands.routes';
import { interaction } from './interactivity.routes';

import { room } from './room.routes';
import { calendar } from './calendar.routes';
import { meeting } from './meeting.routes';
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

//API Room, Meeting and Calendar Routes
router.use('/calendar', calendar);
router.use('/meetings', meeting);
router.use('/rooms', room);

//Slack Commands and Interaction Routes
router.use('/slack/slash-command', commands);
router.use('/slack/interactivity', interaction);

export { router };
