const app = require('./app');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@united.ffmoa.mongodb.net/india?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DB Connected');
    })
    .catch((err) => { console.log('Failed') });


app.listen(PORT, ()=>{
    console.log(`Server on ${PORT}`);
});