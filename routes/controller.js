const mongosee = require('mongoose');
const { checkout } = require('../app');
const State = require('../models/states');

const getData = async (req, res) => {
    let status = 'success';
    let data;

    try {
        data = await State.find().select('-_id -c_picture -g_picture');
    } catch(err) {
        status = 'fail';
        data = ['No data found'];
    }   
    
    res.json({
        status,
        data
    });
}

const getDataByS = async (req, res) => {
    const filterByS = { state: req.params.state };
    const filterBySf = { s_code: req.params.state };

    let data = await State.findOne(filterByS).select('-_id name capital governor chief');

    if(data) {
        res.json({'status': 'success', 
                    'data': {
                        'state': data.name,
                        'capital': data.capital,
                        'Governor': data.governor,
                        'Chief-Minister': data.chief
                    }
        });
    } else {
        data = await State.findOne(filterBySf).select('-_id name capital governor chief');
        if(data) {
            res.json({'status': 'success', 
                'data': {
                'state': data.name,
                'capital': data.capital,
                'Governor': data.governor,
                'Chief-Minister': data.chief
                }
            });
        } else {
            res.json({'status': 'fail', 'error': 'No such state found'});
        }
    }

};

const addData = async (req, res) => {
    const { state, s_code, capital, governor, g_picture, chief, c_picture } = req.body;
    
    const StateInfo = {
        state,
        s_code,
        capital,
        governor,
        g_picture,
        chief,
        c_picture
    };
    
    try {
        const data = await State.insertMany(StateInfo);
        res.json({'status': 'success', data});
    } catch(err) {
        console.log(err);
        res.json({
            'status': 'fail',
            'comment': 'Data did not added'
        });
    }
};

const updateData = async (req, res) => {
    let pFound = false;
    const { state, parameter, name } = req.query;
    console.log(state, parameter, name, typeof(parameter));

    try {
        if(parameter == 'chief') { 
            pFound = true;
            await State.findOneAndUpdate({ state }, {$set: { chief: name }});
        }
        else if(parameter == 'c_picture') { 
            pFound = true;
            await State.findOneAndUpdate({ state }, {$set: { c_picture: name }});
        }
        else if(parameter == 'governor') { 
            pFound = true;
            await State.findOneAndUpdate({ state }, {$set: { governor: name }});
        }
        else if(parameter == 'g_picture') {
            pFound = true; 
            await State.findOneAndUpdate({ state }, {$set: { g_picture: name }});
        }
        else {
            res.json({
                'status': 'fail',
                'comment': 'No such property found'
            });
        }

        if(pFound){
            res.json({
                'status': 'sucess',
                'comment': 'Updated seccessfully'
            });
        }
    } catch(err) {
        res.json({
            'status': 'fail',
            'comment': 'Oooops'});
        };
};

const deleteDataByS = async (req, res) => {
    const filterByS = { state: req.params.state };
    const filterBySf = { s_code: req.params.state };

    let data = await State.findOneAndDelete(filterByS).select('state');

    if(data) {
        res.json({
            'status': 'success',
            'deleted': data
        });
    } else {
        data = await State.findOneAndDelete(filterBySf).select('state');
        if(data) {
            res.json({
                'status': 'success',
                'deleted': data
            });
        } else {
            res.json({
                'status': 'fail',
                'message': 'No such state found to delete'
            });
        }
    }
};

const deleteData = async (req, res) => {
    let data = await State.deleteMany({});
    res.status(200).json({
        'status': 'success',
        'comment': 'Deleted all data'
    });
};

module.exports = { getData, addData, getDataByS, deleteData, deleteDataByS , updateData};