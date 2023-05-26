'use strict';

import { Database } from "sqlite-async";
import bcrypt from 'bcrypt';
let saltRounds = 10;
let db;
try {
    db = await Database.open("./model/tennis.db");
} catch (e) {
    throw new Error("Database could not be opened: " + e);
}



export let showFreeCoaches= async (date,time) => {
    const stmt = await db.prepare("SELECT * FROM Coach where id NOT IN (SELECT coach_id FROM Reservation WHERE res_date= ? and start_time=? )",date,time );
    const coaches = await stmt.all();
    console.log(coaches);
    await stmt.finalize();
    return coaches;
}

export let login= async (email, password) => {
    const stmt = await db.prepare("SELECT * FROM User WHERE Email = ?");
    const user = await stmt.get(email);
    await stmt.finalize();
    if (user === undefined) {
        throw new Error("User does not exist");
    }
    const match = await bcrypt.compare(password, user.Password);
    if (!match) {
        throw new Error("Wrong password");
    }
    return user;
}

export let showReservationHistory= async (userId) => {
    const stmt = await db.prepare("SELECT * FROM Reservation join Court on Reservation.court_id = Court.id WHERE user_id = ? ORDER BY res_date DESC, start_time DESC ");
    const reservations = await stmt.all(userId);
    await stmt.finalize();
    return reservations;
}

export let updateUser= async (req, res) => {
    const stmt = await db.prepare("UPDATE User SET Address=?,Email=?, Phone=?, Mobile=?,Password=? WHERE id = ?");
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    await stmt.run(req.body.address,req.body.email, req.body.phone, req.body.mobile,hash, req.session.user.id);
    await stmt.finalize();
}

export let deleteReservation= async (req) => {
    const stmt = await db.prepare("DELETE FROM Reservation WHERE resid = ?");
    await stmt.run(req.params.id);
    await stmt.finalize();
}

export let updateReservation= async (req) => {
    res.redirect("/reservation/" + req.params.id);
}

export let getReservedHours= async (date) => {
    const stmt = await db.prepare("SELECT * FROM Reservation where res_date = ? ORDER BY start_time ASC", date);
    const reservations = await stmt.all();
    await stmt.finalize();
    return reservations;
}


export let addReservation= async (req, res) => {
    const stmt = await db.prepare("INSERT INTO Reservation(res_date, Hour, CoachId, CourtId, UserId) VALUES(?,?,?,?,?)");
    await stmt.run(req.body.date, req.body.time, req.body.coach, req.body.court, req.session.user.id);
    await stmt.finalize();
    res.redirect("/profile");
}

