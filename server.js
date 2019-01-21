const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


const cacheroute = require('./routes/cacheroute');



var app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
//Connect to db
mongoose.set('useCreateIndex', true)
mongoose.connect(config.database, { useNewUrlParser: true })
    .then(() => console.log('Connected to database ' + config.database))
    .catch(err => console.error('Error in connection' + err));


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/api/cacheroute', cacheroute);

app.listen(port, () => {
    console.log('Server started at port ' + port);
});
