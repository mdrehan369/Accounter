import session from "express-session";
import userModel from "../lib/userSchema.js";

const loginController = async (req, res) => {

    const { Account, Password } = req.body;
    let p1 = await userModel.findOne({email: Account});

    if(p1 == null){
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
            return;
        }else{
            res.render("login", {user: session.user, msg: "Invalid Password"});
            return;
        }
    }

};

export default loginController;
