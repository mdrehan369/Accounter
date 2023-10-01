import express from 'express'
import path from 'path';
import session from 'express-session';
import connect from './lib/connectDb.js';
import cookieParser from 'cookie-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import router from './routes/web.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
const uri = "mongodb://127.0.0.1:27017/Accounter";

app.use(express.static(path.join(__dirname, "/public")));

app.set("views", "templates");
app.set("view engine", "ejs");

app.use(cookieParser());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(session({
    secret: "amarjkytghjtrvgnbjytubkjuylu",
    saveUninitialized: true,
    resave: true
}));

connect(uri);

app.use(router);

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});

