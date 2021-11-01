const express = require('express')
const next = require('next')
const dotenv = require("dotenv");

dotenv.config();

const dev = process.env.PORT !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();
const cookieParser = require('cookie-parser');
const jwtCheck = require("./libs/api/jwtCheck/jwtCheck");
const connectMongo = require("./libs/database/connectMongo");

app.prepare()
    .then(() => {
        const server = express();
        server.use(express.json({
            extended: false
        }));
        server.use(cookieParser('token'));
        connectMongo();

        // configurating api start
        server.use("/users", require("./libs/api/user/user"));
        server.use("/orders", require("./libs/api/orders/orders"));
        // configurating api end

        // configurating view start
        server.get("/SignUp", (req, res) => {
            jwtCheck(req.signedCookies.token, req, res);
            return app.render(req, res, '/containers/SignUp');
        });
        server.get("/dashboard", (req, res) => {
            jwtCheck(req.signedCookies.token, req, res);
            return app.render(req, res, '/containers/Dashboard');
        });
        // configurating view end
        
        server.get("/test", (req, res) => {
            return res.json({ a: "aaa" });
        });

        server.get('*', (req, res) => {
            return handle(req, res)
        });

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        });
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })