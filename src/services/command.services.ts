import { app, client } from '../connection/slack.connection';

require('dotenv').config('../../.env');

const sendPrivateMessage = async (
  channel_id: string,
  userid: string,
  text: string,
  message: any
) => {
  try {
    const result = await app.client.chat.postEphemeral({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channel_id,
      user: userid,
      text: text,
      blocks: message,
    });
  } catch (err: any) {
    return err.message;
  }
};

const sendMessageToSlackUrl = async (
  channel_id: string,
  text: string,
  message: any
) => {
  try {
    const result = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channel_id,
      text: text,
      blocks: message,
    });
    return result;
  } catch (err: any) {
    return err.message;
  }
};

const updateMessage = async (
  channel_id: string,
  message_ts: string,
  text: string,
  message: any
) => {
  const result = await app.client.chat.update({
    token: process.env.SLACK_BOT_TOKEN,
    channel: channel_id,
    ts: message_ts,
    text: text,
    blocks: message,
  });
};

const getUsersInformation = async (mentions: string[]) => {
  if (!mentions.length) return [];

  let details = [];
  for (let i = 0; i < mentions.length; i++) {
    const result = await client.users.info({
      user: mentions[i],
    });
    details.push(result);
  }
  return details;
};

export {
  sendPrivateMessage,
  sendMessageToSlackUrl,
  getUsersInformation,
  updateMessage,
};
