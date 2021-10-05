import { google } from 'googleapis';
require('dotenv').config('../../.env');
import { sendMessageToSlackUrl } from '../command.services';
import { generateMessageForToken } from '../message.services';
import { getGoogleAuthToken } from '../api.services';
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

export const authorize = async (
  credentials: any,
  channel_id: string,
  user_id: string,
  forResponse: boolean
) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  if (!forResponse) {
    return getAccessToken(oAuth2Client, channel_id, user_id);
  } else {
    const data = await getGoogleAuthToken(user_id);
    if (data) oAuth2Client.setCredentials(data);
  }
  return oAuth2Client;
};

function getAccessToken(
  oAuth2Client: any,
  channel_id: string,
  user_id: string
) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  const message = generateMessageForToken(authUrl);
  sendMessageToSlackUrl(channel_id, 'Google Calendar Authentication', message);
  return oAuth2Client;
}
