
import {Coach as CoachModel, Court as CourtModel, Reservation as ReservationModel, User as UserModel} from "../model/Data.js";

const model=await import("../model/model.mjs");



export async function showProfile(req, res) {
    try{
        const reservations = await model.showReservationHistory(req.session.user.id);
        res.render("profile", {reservations: reservations , user: req.session.user});
    }
    catch (e) {
        res.render("error", {error: e});
    }
}
export async function showContactUs(req, res) {
    try{
        res.render("contactus");
    }catch (e) {
        res.render("error", {error: e});
    }
}

export async function showHome(req, res) {
    try{
        res.render("home");
    }catch (e) {
        res.render("error", {error: e});
    }
}


export async function showFacilities(req, res) {
    try{
        res.render("facilities");
    }catch (e) {
        res.render("error", {error: e});
    }
}

export async function showLogin(req, res) {
    try{
        res.render("login");
    }catch (e) {
        res.render("error", {error: e});
    }
}

export async function login(req, res) {
    try{
        console.log(req.body);
        const user = await model.login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect("/home");
    }catch (e) {
        res.render("login", {error: e});
    }
}

export async function checkAuthentication(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
}

export async function updateUser(req,res){
    try{
        await model.updateUser(req.body.address, req.body.phone, req.body.mobile, req.body.password, req.session.user.id);
        res.redirect("/home");
    }
    catch (e) {
        res.render("error", {error: e});
    }
}

export async function deleteReservation(req, res) {
    try{
        await model.deleteReservation(req.params.id);
        res.redirect("/profile");
    }
    catch (e) {
        res.render("error", {error: e});
    }
}

export async function updateReservation(req,res){
    try{
        res.redirect("/reservation/" + req.params.id);
    }
    catch (e) { 
        res.render("error", {error: e});
    }
}

export async function showReservation(req, res) {
    try{
       res.render("reservation");
    }
    catch (e) {
        res.render("error", {error: e});
    }
}
export async function addReservation(req, res) {
    try{
        const reservation = await model.addReservation(req.body.date, req.body.time,req.body.coach, req.body.court, req.session.user.id);
        res.redirect("/profile");
    }
    catch (e) {
        res.render("error", {error: e});
    }
}