const express = require('express');
const exercisesController = require('../controllers/exercisesController');

function routes(Exercise) {
    const exerciseRouter = express.Router();
    const controller = exercisesController(Exercise);

    exerciseRouter.route('/exercises')
        .get(controller.get);

    return exerciseRouter;
}

module.exports = routes;