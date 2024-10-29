const createHttpError = require("http-errors");
const Db = require("../models");
const jwt = require("jsonwebtoken");
// const {TokenExpiredError} = jwt;

// Middleware function custom 
function verifyToken(req, res, next){
    // Lay thong tin trong headers cua request
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(400).json({message: "No token provide"});
    }

    // Xac thuc tinh hop le cua token gui tu request
    jwt.verify(token, process.env.ACESS_TOKEN_KEY, (err, decoded) => {
        if(err){
            return res.status(401).json({message: err.message});
        }
        const userId = decoded.accId;
        // Cap nhat lai doi tuong requet khi xac thuc nguoi dung hop le
        req.userId = userId;
        next();
    })
}

// Kiem tra authorities (quen truy cap cua nguoi dung)
async function isMember(req, res, next){
    try {
        const existedAccount = await Db.Users.findById(req.userId).exec();
        
        if(!existedAccount)
            throw createHttpError.NotFound("This account not exist!");

        const roles = await Db.Roles.find({_id: {$in: existedAccount.roles}}); // Tra ve 1 mang cac doi tuong co kieu {_id, name}
        
        if(!roles)
            throw createHttpError.Unauthorized("Access denied!");

        // Kiem tra role thuc te cua account hien tai
        for (let i = 0; i < roles.length; i++) {
            if(roles[i].name == "member"){
                next();
                return;
            }
        }
        // Truy cap khong dung role cua account hien tai
        throw createHttpError.Forbidden("Fobidden! Not role: Member");

    } catch (error) {
        next(error);
    }
}

async function isManager(req, res, next){
    try {
        const existedAccount = await Db.Users.findById(req.userId).exec();
        
        if(!existedAccount)
            throw createHttpError.NotFound("This account not exist!");

        const roles = await Db.Roles.find({_id: {$in: existedAccount.roles}}); // Tra ve 1 mang cac doi tuong co kieu {_id, name}
        
        if(!roles)
            throw createHttpError.Unauthorized("Access denied!");

        // Kiem tra role thuc te cua account hien tai
        for (let i = 0; i < roles.length; i++) {
            if(roles[i].name === "manager"){
                next();
                return;
            }
        }
        // Truy cap khong dung role cua account hien tai
        throw createHttpError.Forbidden("Fobidden! Not role: Manager");

    } catch (error) {
        next(error);
    }
}

async function isAdmin(req, res, next){
    try {
        const existedAccount = await Db.Users.findById(req.userId).exec();
        
        if(!existedAccount)
            throw createHttpError.NotFound("This account not exist!");

        const roles = await Db.Roles.find({_id: {$in: existedAccount.roles}}); // Tra ve 1 mang cac doi tuong co kieu {_id, name}
        
        if(!roles)
            throw createHttpError.Unauthorized("Access denied!");

        // Kiem tra role thuc te cua account hien tai
        for (let i = 0; i < roles.length; i++) {
            if(roles[i].name == "admin"){
                next();
                return;
            }
        }
        // Truy cap khong dung role cua account hien tai
        throw createHttpError.Forbidden("Fobidden! Not role: Admin");

    } catch (error) {
        next(error);
    }
}

const VerifyAuth = {
    verifyToken,
    isMember,
    isManager,
    isAdmin,
}

module.exports = VerifyAuth;