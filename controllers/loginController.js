import session from "express-session";
import userModel from "../lib/userSchema.js";

const loginController = async (req, res) => {

    const { Account, Password } = req.body;

    let p1 = await userModel.findOne({email: Account});
    // let p1 = await userModel.findOne({$or: [{email: Account}, {number: Account}]});
    let p2 = await userModel.findOne({number: Account});

    if(p1 == null && p2 == null){
        res.render("login", {user: session.user, msg: "No User Found"});
        return;
    }

    // return;
    if(p1 != null){
        if(p1['password'] == Password){
            session.user = {
                name: p1['name'],
                email: p1['email'],
                number: p1['number']
            };
            res.redirect("/");
        }else{
            res.render("login", {user: session.user, msg: "Invalid Password"});
        }
    }

    if(p2 != null){
        if(p2['password'] == Password){
            session.user = {
                name: p2['name'],
                email: p2['email'],
                number: p2['number']
            };
            res.redirect("/");
        }else{
            res.render("login", {user: session.user, msg: "Invalid Password"});
        }
    }

};

export default loginController;
