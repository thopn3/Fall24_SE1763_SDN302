const createHttpError = require("http-errors");
const Db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SignUp action:
async function signUp(req, res, next) {
    try {
        if(req.body){
            const newUser = new Db.Users({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, parseInt(process.env.PASSWORD_KEY)),
                email: req.body.email
            });

            if(req.body.roles){
                // Admin create a new User
                const roles = await Db.Roles.find({name: {$in: req.body.roles}}).exec();
                // Update roles in newUser
                newUser.roles = roles?.map(r => r._id);
                // Save into DB
                await Db.Users.create(newUser).then(addedUser => res.status(201).json({
                    message: "Registered successfully",
                    addedUser: addedUser
                }));
            }else{
                // Visitor registration
                const role = await Db.Roles.findOne({name: "member"}).exec();
                newUser.roles = [role._id];
                await Db.Users.create(newUser).then(addedUser => res.status(201).json({
                    message: "Registered successfully",
                    addedUser: addedUser
                }));
            }
            
        }else{
            throw createHttpError.BadRequest("Request no body");
        }
    } catch (error) {
        next(error);
    }
}

// SignIn action
async function signIn(req, res, next) {
    try {
        if(!req.body.username || !req.body.password)
            throw createHttpError.BadRequest("Username or password is required!");

        const existUser = await Db.Users.findOne({username: req.body.username}).populate("roles").exec();
        if(!existUser)
            throw createHttpError.NotFound("This account not registered!");

        const isMatchPassword = bcrypt.compareSync(req.body.password, existUser.password);
        if(!isMatchPassword)
            throw createHttpError.Unauthorized("Incorrect password");

        const token = jwt.sign({accId: existUser._id}, process.env.ACESS_TOKEN_KEY, {
            algorithm: process.env.ALGORITHM,
            expiresIn: process.env.EXP_IN
        });

        const authorities = [];
        for (let i = 0; i < existUser.roles.length; i++) {
            authorities.push(`ROLE_${existUser.roles[i].name.toUpperCase()}`);
        }

        // return
        res.status(200).json({
            token: token,
            userInfo: {
                username: existUser.username,
                email: existUser.email
            },
            authorities: authorities
        })

    } catch (error) {
        next(error);
    }
}

const AuthController = {
    signUp,
    signIn,
};
module.exports = AuthController;