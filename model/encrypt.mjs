import { Database } from "sqlite-async";
import bcrypt from 'bcrypt';

let db;
try {
    db = await Database.open("./model/tennis.db");
} catch (e) {
    throw new Error("Database could not be opened: " + e);
}
//hash all the passwords
const saltRounds = 10;
const stmt = await db.prepare("SELECT * FROM User");
const users = await stmt.all();
for (let user of users) {
    const hash = await bcrypt.hash(user.Password, saltRounds);
    await db.run("UPDATE User SET Password = ? WHERE id = ?", hash, user.id);
}
await stmt.finalize();
