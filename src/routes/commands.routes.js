"use strict";
exports.__esModule = true;
exports.commands = void 0;
var controller = require("../controller/commands.controller");
var express_1 = require("express");
var commands = (0, express_1.Router)();
exports.commands = commands;
commands.post('/rooms-available', controller.roomsAvailable);
commands.post('/connect-google-calendar', controller.connectToGoogleCalendar);
commands.post('/my-meetings', controller.my_meetings);
commands.post('/reserved-rooms', controller.getInfoReservedRooms);
commands.post('/meetings-history', controller.getEndMeetingsHistory);
