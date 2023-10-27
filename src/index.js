const express = require('express');
const app = express();
const { PORT } = require('./constants');
const expressConfigs = require('./middlewares/expressConfig');
const routes = require('./routes');
const hbsConfig = require('./middlewares/handlebarConfig');
const dbConnect = require('./middlewares/mongodbConnect');


expressConfigs(app);

hbsConfig(app);

dbConnect()
    .then(() => console.log('MongoDB connected!'))
    .catch(err => { console.log('DB error', err.message); });


app.use(routes);


app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));