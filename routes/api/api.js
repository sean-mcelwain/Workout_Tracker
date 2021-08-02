const router = require("express").Router();
const Workout = require("../../models/Workout.js");

const aggregate = Workout.aggregate([]);

router.get('/workouts', (req, res) => {
	Workout.find({})
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
        .sort({day: -1})
        .limit(7)
		.then((data) => {
			res.json(data);
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

router.post('/workouts', ({body}, res) => {
	Workout.create(body)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});
module.exports = router;