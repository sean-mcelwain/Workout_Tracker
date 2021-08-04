const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(morgan('tiny'));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout", 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
	console.log('Mongoose Connected Successfully');
});

// routes
app.use(require('./routes'));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
