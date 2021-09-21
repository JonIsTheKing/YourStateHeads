const express = require('express');
const helmet = require('helmet');
const app = express();
const Controller = require('./routes/controller');

app.use(express.json());
app.use(helmet());

app.route('/india')
    .get(Controller.getData)
    .post(Controller.addData)
    .patch(Controller.updateData)
    .delete(Controller.deleteData)

app.route('/india/:state')
    .get(Controller.getDataByS)
    .delete(Controller.deleteDataByS)

module.exports = app;