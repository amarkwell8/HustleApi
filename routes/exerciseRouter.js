const express = require('express');
const exercisesController = require('../controllers/exercisesController');

function routes(Exercise) {
    const exerciseRouter = express.Router();
    const controller = exercisesController(Exercise);

    exerciseRouter.route('/exercises')
        .get(controller.get)
        .post(controller.post);
    exerciseRouter.use('/exercises/:exerciseId', (request, response, next) => {
        Exercise.findById(request.params.exerciseId, (error, exercise) =>{
            if(error){
                return response.send(error);
            }
            if(exercise){
                request.exercise = exercise;
                return next();
            }
            return response.sendStatus(404);
        });
    });
    exerciseRouter.route('/exercises/:exerciseId')
        .get((request, response) => {
            response.json(request.exercise);
        })
    return exerciseRouter;
}

module.exports = routes;