require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const mainRouts = require('./routes/mainRoutes');
const {toRefreshDbData} = require('./sheduled_jobs/cron_job');

const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json());

toRefreshDbData();

app.use(mainRouts);

try{
    app.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
}catch(e){
    console.log(e);
    throw new Error('An error occured');
}

