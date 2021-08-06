const router = require("express").Router();
const {Workout} = require("../../models/");

router.get('/workouts', (req, res) => {
	Workout.aggregate([
        {
        $addFields: {
            totalDuration: { $sum: '$exercises.duration' },   
        },
    },    
    ])
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.get('/workouts/range', (req, res) => {
	Workout.aggregate([
        {
        $addFields: {
            totalDuration: { $sum: '$exercises.duration' },   
        },
    },    
    ])

		.then((data) => {
			res.json(data.slice(0).slice(-7));
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.put('/workouts/:id', (req, res) => {

	Workout.updateOne({ _id: req.params.id },
        {
			$push: {
				exercises: req.body,
			}
		})
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.post('/workouts', (req, res) => {
	Workout.create(req.body)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

router.post('/workouts/range', ({ body }, res) => {
	Workout.insertMany(body)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});


module.exports = router;