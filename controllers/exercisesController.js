function exercisesController(Exercise){
    function post(request, response){
        
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