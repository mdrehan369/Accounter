import accountModel from "../lib/accountSchema.js"
import session from "express-session";

const homeControllerGet = async (req, res) => {
    
    if(session.user == null){
        res.render("home", { msg: "Please Login Or Signup", user: session.user, entries: null, currentBal: 0 });
        return;
    }
    let p = await accountModel.findOne({ number: session.user['number'] });

    if (p == null) {
        res.render("home", { msg: "No Entries", user: session.user, entries: null, currentBal: 0 });
    } else {
        res.render("home", { msg: "", user: session.user, entries: p['entries'], currentBal: p['currentBal'] });
    }

};

const homeControllerPost = async (req, res) => {

    const { Amount, Gained, Message } = req.body;
    let p = await accountModel.findOne({ number: session.user['number'] });

    if(p == null){
        try{
            const acc = new accountModel({
                number: session.user['number'],
                currentBal: Amount,
                entries: [{amount: Amount, gained: Gained, message: Message}]
            })
            await acc.save();
            console.log("new entry created");
        } catch(err) {
            console.log(err);
        }
    }else{
        //filter update options callback
        let prev_entries = p['entries']; 
        prev_entries.push({
            amount: Amount,
            gained: Gained,
            message: Message
        });

        let prev_bal = parseInt(p['currentBal']);
        if(Gained == 1){
            prev_bal = prev_bal + Amount;
        }else{
            prev_bal = prev_bal - Amount;
        }

        try{
            await accountModel.findOneAndUpdate({number: session.user['number']}, {entries: prev_entries, currentBal: prev_bal}, null);
            console.log("updated");
        }catch(err){
            console.log(err);
        }
    }

    res.redirect("/");

};

export {homeControllerGet, homeControllerPost};

