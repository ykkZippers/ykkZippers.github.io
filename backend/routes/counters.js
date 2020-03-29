const router = require('express').Router();
let Counter = require('../models/counter.model.js');

// handle http get requests
router.route('/').get((req, res) => {
    Counter.find()
        .then(counters => res.json(counters))
        .catch(err => res.status(400).json('Error: '));
});

// handle http get requests for particular id
router.route('/:id').get((req, res) => {
    Counter.findById(req.params.id)
        .then(counter => res.json(counter))
        .catch(err => res.status(400).json('Error: ' + err));
});

// handle http post requests to add a new counter
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const count = 0;

    const newCounter = new Counter({
        username,
        count
    });

    newCounter.save()
        .then(() => res.json('Counter Added!'))
        .catch(err => {
            // duplicate username error
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(422).send({
                    message: 'User already exists!'
                });
            } else {
                res.status(400).json('Error ' + err);
            }
        });
});

// handle http delete requests for specific ID
router.route('/:id').delete((req, res) => {
    Counter.findByIdAndDelete(req.params.id)
        .then(counter => res.json("Counter deleted!"))
        .catch(err => res.status(400).json('Error ' + err));
});

// handle http post requests for adding to a specific counter
router.route('/add/:id').post((req, res) => {
    Counter.findById(req.params.id)
        .then(counter => {
            counter.count += 1;

            counter.save()
                .then(() => res.json('Added to Counter!'))
                .catch(err => {
                    res.status(400).json('Error ' + err.name);
                });
        })
        .catch(err => res.status(400).json('Error ' + err));
});

// handle http post requests for adding to a specific counter
router.route('/subtract/:id').post((req, res) => {
    Counter.findById(req.params.id)
        .then(counter => {
            if (counter.count > 0) {
                counter.count -= 1;
            }

            counter.save()
                .then(() => res.json('Subtracted from Counter!'))
                .catch(err => res.status(400).json('Error ' + err));
        })
        .catch(err => res.status(400).json('Error ' + err));
});

// handle http post requests for updating username for a specific counter
router.route('/update/:id').post((req, res) => {
    Counter.findById(req.params.id)
        .then(counter => {
            counter.username = req.body.username;

            counter.save()
                .then(() => res.json('Username updated!'))
                .catch(err => {
                    // duplicate username error
                    if (err.name === 'MongoError' && err.code === 11000) {
                        res.status(422).send({
                            message: 'User already exists!'
                        });
                    } else {
                        res.status(400).json('Error ' + err);
                    }
                })
        })
})

module.exports = router;