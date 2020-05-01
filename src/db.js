const mongoose = require ('mongoose');

const connectToDB = (url = 'mongodb://localhost/done') => {
  return mongoose.connect (url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDB;
