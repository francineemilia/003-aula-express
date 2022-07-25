const express = require('express');
const routes = express.Router();
let users = require('../users');

function checkBodyContent(body){
    if (!body.username || !body.email || !body.password){
        return false;    
    }
    return true;
}

routes.post('/',(req,res) =>{
    const content = req.body;
    if (!checkBodyContent(content)){
        return res.status(400).send('Check your request');    
    }
    const newUsers = [...users, content]
    users = newUsers;
    res.status(201).json(content);
})

routes.put('/',(req,res) =>{
    const content = req.body;
    if (!checkBodyContent(content)){
        return res.status(400).send('Check your request');    
    }

    const user = users.find((user) => user.username === content.username || user.username === content.username);

    if (!user) {
        return res.status(400).json({ "message": "User not found" })
    } 
    else if (!(user.password === content.password)){
        return res.status(406).json({ "message": "Wrong Password. This method is not used to change password, but it's required to authorized the change."});
    }
    else if (user.username === content.username && user.email === content.email){
        return res.status(406).json({ "message": "There is an user that already taken this username and e-mail. You can change one of these. This method is not used to change password, but it's required to authorized the change."});
    }

    const updatedUsers = users.map((user) => {
        if (user.username === content.username || user.email === content.email) {
            return content;
        }
        return user;
    })
    users = updatedUsers;
    res.status(200).json(users);
    
})

routes.delete('/',(req,res) =>{
    const content = req.body;
    if (!checkBodyContent(content)){
        return res.status(400).send('Check your request');    
    }

    const user = users.find((user) => user.username === content.username || user.username === content.username);

    if (!user) {
        return res.status(400).json({ "message": "You're trying to delete an unexistent user" })
    } else if (!(user.username === content.username && user.email === content.email)){
        return res.status(406).json({ "message": "You're trying to delete an incorrect user. Verify both username and e-mail. This data are keys to exclude"});
    }

    const withoutDeletedUser = users.filter((user) => user.username !== content.username && user.email !== content.email);

    users = withoutDeletedUser;
    res.status(200).json({"message":"User deleted"});
    
})

routes.get('/',(req,res) =>{
    res.status(200).json(users);
})

routes.patch('/',(req,res) =>{
    const content = req.body;
    if (!checkBodyContent(content)){
        return res.status(400).send('Check your request');    
    }

    const user = users.find((user) => user.username === content.username || user.username === content.username);

    if (!user) {
        return res.status(400).json({ "message": "You're trying to chenge the password of an unexistent user" })
    } else if (!(user.username === content.username && user.email === content.email)){
        return res.status(406).json({ "message": "You're trying to chenge the password of an incorrect user. Verify both username and e-mail. This data are keys to change password"});
    }

    const updatedUsers = users.map((user) => {
        if (user.username === content.username || user.email === content.email) {
            return content;
        }
        return user;
    })
    users = updatedUsers;
    res.status(200).json(content);
    
})

module.exports = routes;