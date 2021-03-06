let express = require('express');
let bodyParser = require('body-parser');
let ddos = require('ddos-express');
let cors = require('cors');
let { Pokemon, Team } = require('./db');

let app = express();

app.use(ddos({
    maxWeight: 10
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/team', (rq, rs) => {
    try {
        let team = new Team(rq.body);
        
        team.save((err) => {
           if(err) {
               console.log(err);
               rs.json({ status: 'error', type: 'INVALID_TEAM' });
           } else {
               rs.json({ status: 'success', id: team._id });
           }
        });
    } catch (exc) {
        rs.json({
            status: 'error',
            type: 'INVALID_TEAM'
        });
    }
});

app.post('/getTeam', (rq, rs) => {
    Team.find({ _id: rq.body.id }, (err, data) => {
        if(err) rs.json({ status: "error", type: "DATABASE_ERROR" });
        else rs.json(data);
    }).select('-pass');
});

app.post('/updateTeam', (rq, rs) => {
    let { pass, team } = rq.body;
    let { _id } = team;
    
    Team.update({ _id, pass }, { $set: team }, (err, data) => {
        if(err) return rs.json({ status: "error", type: "DATABASE_ERROR" });
        if(data.n === 0) return rs.json({ status: "error", type: "INVALID_PASSWORD" });
        
        rs.json({ status: "success" });
    });

});

app.listen('60000', () => console.log('Api running at port: 60000'));