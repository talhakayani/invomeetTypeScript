import { App } from '@slack/bolt';
import { WebClient, ErrorCode } from '@slack/web-api';
require('dotenv').config('../.env');
const client = new WebClient(process.env.SLACK_BOT_TOKEN);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNIN_SECRET,
});

export { app, client };
//module.exports = { app, client };
