const User = require("../models/User.js");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
require("dotenv").config();

// const { jwt_secret } = process.env;

const UserController = {
    async create(req, res) {
      
        try {
            const password = bcrypt.hashSync(req.body.password, 10);
            const user = await User.create({
                ...req.body,
                password: password,
            });
        
      
            res.status(201).send({ msg: "New user created", user });
        } catch (error) {
            console.error(error);
      
             res.status(500).send({
                 msg: "There was an issue creatring new user",
             });
        }
    },
};
module.exports = UserController;
