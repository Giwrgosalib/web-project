import express from "express";
import {engine} from "express-handlebars";
import router from "./routes/router.mjs";
import session from "express-session";




const app = new express();
const port=process.env.PORT || 3000;

app.use(express.urlencoded({extended: false})); // Parse URL-encoded bodies
app.use(express.static("public"));
//session management

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 3600000}
}));

app.engine(".hbs", engine({extname: ".hbs"}));
app.set("view engine", ".hbs"); // Set default view engine

app.use("/", router);

app.listen(3000, () => console.log("Server is running on port 3000"));
