import nodemailer from "nodemailer";

const model=await import("../model/model.mjs");

//render the profile page
export async function showProfile(req, res) {
    try{
        const reservations = await model.showReservationHistory(req.session.user.id);
        res.render("profile", {reservations: reservations , user: req.session.user});
    }
    catch (e) {
        console.log(e);
    }
}

//render the contact us page
export async function showContactUs(req, res) {
    try{
        res.render("contactus", {user: req.session.user});
    }catch (e) {
        console.log(e);
    }
}
//render the home page
export async function showHome(req, res) {
    try{
        res.render("home", {user: req.session.user});
    }catch (e) {
        console.log(e);
    }
}

//render the facilities page
export async function showFacilities(req, res) {
    try{
        res.render("facilities", {user: req.session.user});
    }catch (e) {
        console.log(e);
    }
}

//render the login page
export async function showLogin(req, res) {
    try{
        res.render("login", {user: req.session.user});
    }catch (e) {
        console.log(e);
    }
}

//perform login
export async function login(req, res) {
    try{
        const user = await model.login(req.body.email, req.body.password);

        req.session.user = user;
        res.redirect("/home");
    }catch (e) {
        res.render("login", {error: e});
    }
}

//check if user is signed in
export async function checkAuthentication(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
}
//change user credentials
export async function updateUser(req,res){
    try{
        await model.updateUser(req,res);
        res.redirect("/home");
    }
    catch (e) {
        console.log(e);
    }
}
//delete reservation
export async function deleteReservation(req, res) {
    try{
        await model.deleteReservation(req.params.resid);
        res.redirect("/profile");
    }
    catch (e) {
        console.log(e);
    }
}

//render the reservations page
export async function showResButton(req, res) {
    try{
        res.render("reservations");
    }
    catch (e) {
        console.log(e);
    }
}

//get the reserved hours for a specific date
export async function showReservedHours(req,res) {
    try{
        const reservations = await model.getReservedHours(req.params.date);
        res.json(reservations);
    }catch (e) {
        console.log(e);
    }
}

//add a reservation
export async function addReservation(req, res) {
    try{
        await model.addReservation(req.body.date, req.body.time, req.body.coach, req.body.court, req.session.user.id);
        res.json({success: true, url: "/profile"});
    }
    catch (e) {
        console.log(e);
    }
}

//get the free coaches for a specific date and time
export async function showFreeCoaches(req, res) {
    try{
        const coaches = await model.showFreeCoaches(req.params.date, req.params.time);
        res.json(coaches);
    }
    catch (e) {
        console.log(e);
    }
}

//send an email
export async function sendMail(req, res) {
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: 'gmtennisclub123@gmail.com',
                pass: 'aqgvxorvcawpdvyw'
            }
        });
        const options = {
            from: req.body.email,
            to: 'gmtennisclub123@gmail.com',
            subject: `Message from ${req.body.name}`,
            text: `${req.body.message}`
        };
        await transporter.sendMail(options);
        res.redirect("/home");
    }catch (e) {
        console.log(e);
    }
}
//middleware to update the is_past field
export async function updatePast(req, res, next) {
    try{
        await model.updatePast();
        next();
    }catch (e) {
        console.log(e);
    }
}
