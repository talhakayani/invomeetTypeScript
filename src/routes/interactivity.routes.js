"use strict";
exports.__esModule = true;
exports.interaction = void 0;
var interactivity = require('../controller/interaction.controller');
var interaction = require('express').Router();
exports.interaction = interaction;
interaction.use('/buttons', interactivity.interactions);
