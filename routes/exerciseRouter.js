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
        .put((request, response) => {
            const { exercise } = request;
            exercise.name = request.body.name;
            exercise.muscle = request.body.muscle;
            exercise.level = request.body.level;
            exercise.description = request.body.description;

            request.exercise.save((error) => {
                if(error){
                    return response.send(error);
                }
                return response.status(200).json(exercise);
            });
        })
        .delete((request, response) => {
            request.exercise.remove((error) => {
                if(error){
                    return response.send(error);
                }
                return response.sendStatus(204);
            });
        });
    return exerciseRouter;
}

module.exports = routes;