const task = require('express').Router();

module.exports = function({Task}){

    task.get('/', (req, res) => {
        Task.find({})
            .then((docs) => {
                res.json({
                    'status': 200,
                    'statusText': 'Success',
                    'data': docs
                });
            })
            .catch((err) => {
                console.error(err);
                res.status(400).json({
                    'status': 400,
                    'statusText': 'Smth wrong with DB',
                    'data': null
                });
            });
    });
    
    task.get('/:id', (req, res) => {
                Task.findById(req.params.id)
                .then((doc) => {
                    res.json({
                        'status': 200,
                        'statusText': 'Success',
                        'data': doc
                    });
                })
                .catch((err) => {
                    // console.error(err);
                    res.status(400).json({
                        'status': 400,
                        'statusText': 'Smth wrong with DB',
                        'data': null
                    });
                })
        
        
    })
    
    task.post('/', (req, res) => {
        console.log(req.body.text);
        const task = new Task({
            text: req.body.text,
            status: false
          });
          
        task.save()
          .then((doc) => {
              res.json({
                'status': 200,
                'statusText': 'New task was created',
                'data': doc
              })
          })
          .catch((err) => {
            console.error(err);
            res.status(400).json({
                'status': 400,
                'statusText': 'Smth wrong with DB',
                'data': null
            });
        });
    })

    task.put('/:id', (req, res) => {
        Task.findByIdAndUpdate(req.params.id, req.body,  {new: true})
            .then((doc) => {
                res.json({
                    'status': 200,
                    'statusText': 'Task successfully updated',
                    'data': doc 
                })
            })
            .catch((err) => {
                console.error(err);
                res.status(400).json({
                    'status': 400,
                    'statusText': 'Smth wrong with DB',
                    'data': null
                });
            });
    })
    
    task.delete('/:id', (req, res) => {
        Task.findByIdAndRemove(req.params.id)
            .then((doc) => {
                res.json({
                    'status': 200,
                    'statusText': 'Task successfully deleted',
                    'data': doc
                })
            })
            .catch((err) => {
                console.error(err);
                res.status(400).json({
                    'status': 400,
                    'statusText': 'Smth wrong with DB',
                    'data': null
                });
            });
    })

    return task;
}


