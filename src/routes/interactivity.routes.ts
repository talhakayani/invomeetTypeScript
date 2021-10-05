const interactivity = require('../controller/interaction.controller');
const interaction = require('express').Router();

interaction.use('/buttons', interactivity.interactions);

export { interaction };
