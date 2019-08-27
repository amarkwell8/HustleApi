function exercisesController(Exercise){
    function post(request, response){
        const exercise = new Exercise(request.body);
        if(!request.body.name){
            response.status(400);
            return response.send('Name is required');
        }
        if(!request.body.muscle){
            response.status(400);
            return response.send('Muscle group is required');
        }
        if(!request.body.level){
            response.status(400);
            return response.send('Exercise Level is required');
        }

        exercise.save();

        response.status(201);
        return response.json(exercise);
    }
    function get(request, response){
        const query = {}; 
        if(request.query.muscle){
            query.muscle = request.query.muscle;
        }
        Exercise.find(query, (error, exercises) => {
            if(error) {
                return response.send(error);
            }
            return response.json(exercises);
        });
    }
    return {post, get};
}

module.exports = exercisesController;