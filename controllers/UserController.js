const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const UserController = {
    async create(req, res) {
      
        try {
            const password = bcrypt.hashSync(req.body.password, 10);
            const user = await User.create({
                ...req.body,
                password: password,
            });
        
      
            res.status(201).send({ message: "New user created", user });
        } catch (error) {
            console.error(error);
      
             res.status(500).send({
                 msg: "There was an issue creatring new user",
             });
        }
    },
    async login(req, res) {
        try {
          const user = await User.findOne({
            email: req.body.email,
          })
          if (!user) {
            return res.status(400).send("Invalid email or password")
          }
          if (!req.body.password || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send("Invalid email or password")
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET);
          if (user.tokens.length > 4) user.tokens.shift();
          user.tokens.push(token);
          await user.save();
          res.status(200).send({ message: 'Welcome ' + user.email, token });
        } catch (error) {
          console.error(error)
        }
      },
};
module.exports = UserController;
