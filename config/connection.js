const { connect, connection } = require('mongoose');

connect('mongodb://localhost/userThoughts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;