const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('@pusher/chatkit-server');

const app = express();
const chatkit = new Chatkit.default({
    instanceLocater: 'v1:us1:99549bc7-fd9b-4800-a537-b494c7f5bd54',
    key:"83213ab6-8950-46e3-9b12-9325953c26fc:z30Vg5rLrMXdfI1ymTOhcBrEZ3CulgzQf3s7P4kVl6c="
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.post('/users', (req, res) =>{
    const { username } = req.body
    chatkit
    .createUser({
        id:username,
        name:username
    })
        .then(() => {
            console.log('User Created: ${username}');
            res.sendStatus(201);
    })
    .catch(err =>{
        if(err.error === 'services/chatkit/user_already_exists'){
            console.log('User already exists: ${username}');
            res.sendStatus(200);
        }else{
            res.status(err.status).json(err)
        }
    });
});

app.post('/authenticate',(req,res) => {
    const authData = chatkit.authenticate({userId: req.query.user_id});
    res.status(authData.status).send(authData.body);
});

const port = 3001;
app.listen(port, err =>{
    if (err){
        console.log(err);
    }else{
        console.log(`Running on port ${port}`);
    }
});