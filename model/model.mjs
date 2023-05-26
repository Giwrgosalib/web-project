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

//give free coaches
export let showFreeCoaches= async (date,time) => {
    let query="SELECT * FROM Coach where id NOT IN (SELECT coach_id FROM Reservation WHERE res_date=\""+date+"\" and (start_time=\""+time+"\" or start_time=time(\""+time+"\",\"+1 hour\")))";
    const stmt = await db.prepare(query);
    const coaches = await stmt.all();
    await stmt.finalize();
    return coaches;
}
//code for log-in 
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
//profile reservation history
export let showReservationHistory= async (userId) => {
    const stmt = await db.prepare("SELECT * FROM Reservation join Court on Reservation.court_id = Court.id WHERE user_id = ? ORDER BY res_date DESC, start_time DESC ");
    const reservations = await stmt.all(userId);
    await stmt.finalize();
    return reservations;
}
//profile change settings
export let updateUser= async (req, res) => {
    const stmt = await db.prepare("UPDATE User SET Address=?,Email=?, Phone=?, Mobile=?,Password=? WHERE id = ?");
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    await stmt.run(req.body.address,req.body.email, req.body.phone, req.body.mobile,hash, req.session.user.id);
    await stmt.finalize();
}
//delete reservation
export let deleteReservation= async (id) => {
    const stmt = await db.prepare("DELETE FROM Reservation WHERE resid = ?");
    await stmt.run(id);
    await stmt.finalize();
}
//show free courts
export let getReservedHours= async (date) => {
    const stmt = await db.prepare("SELECT * FROM Reservation where res_date = ? ORDER BY start_time ASC", date);
    const reservations = await stmt.all();
    await stmt.finalize();
    return reservations;
}
//add reservation into db
export let addReservation= async (date,time,coach,court,usid) => {
    const stmt = await db.prepare("INSERT INTO Reservation(res_date, start_time, coach_id, court_id, user_id,is_past) VALUES(?,?,?,?,?,0)");
    await stmt.run(date,time,coach,court,usid);
    await stmt.finalize();
}

