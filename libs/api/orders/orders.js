const express = require("express");
const connection = require("../../database/connection");
const cookieParser = require('cookie-parser');
const authenticateJWT = require("../jwtCheck/authenticateJWT");
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
router.use(cookieParser('token'));

// add User Cart
const Cart = require("../../models/Cart");

router.post("/sendcart", authenticateJWT, async (req, res) => {
    const { cart } = req.body;
    const { username } = req.user;

    // using mongooDB
    try {
        const cartDocument = new Cart({
            id: uuidv4(),
            email: username,
            cart,
            status: "0"
        });

        await cartDocument.save();
        res.json({
            status: "success",
            text: "Orders successfully created.!"
        });
    } catch (err) {
        console.log(err.message);
        res.json({
            status: "failed",
            text: "Server Error"
        });
    }

    // if using sql
    // connection.query(`INSERT INTO cart (id, email, cart, status) VALUES ('${uuidv4()}', '${username}', '${cart}', '0')`, async (err, results) => {
    //     if (err) throw res.json(
    //         {
    //             status: "failed",
    //             text: "Failed to create orders.!"
    //         }
    //     );
    //     res.json({
    //         status: "success",
    //         text: "Orders successfully created.!"
    //     });
    // });
});

router.get("/totalactiveorders/", authenticateJWT, async (req, res) => {
    const { username } = req.user;

    // using mongooDB
    try {
        // request active
        let cartDocument = await Cart.find({
            $and: [
                { username },
                { 'status': "0" }
            ]
        }).select("-_id -__v");
        const active = cartDocument.length;
        const activeOrders = cartDocument;

        // request success
        cartDocument = await Cart.find({
            $and: [
                { username },
                { 'status': "1" }
            ]
        }).select("-_id -__v");
        const success = cartDocument.length;
        const successOrdersData = cartDocument;


        res.json({
            totalOrders: active,
            successOrders: success,
            data: activeOrders,
            successOrdersData: successOrdersData
        });
    } catch (err) {
        console.log(err.message);
        res.json({
            status: "failed",
            text: "Server Error"
        });
    }

    // if using sql
    // connection.query(`SELECT * FROM cart WHERE email = '${username}' AND status = '0'`, (err, results) => {
    //     if (err) throw res.json(
    //         {
    //             status: "failed",
    //             text: "Failed to create orders.!"
    //         }
    //     );
    //     res.json({
    //         totalOrders: results.length,
    //         data: results
    //     });
    // });
});

router.delete("/deleteorders/:id", authenticateJWT, async (req, res) => {
    const { id } = req.params;

    // using mongooDB
    try {
        const cartDocument = await Cart.findOneAndDelete({ id });
        console.log(cartDocument);
        res.json({
            status: "success",
            text: "Orders successfully deleted.!"
        });
    } catch (err) {
        console.log(err.message);
        res.json({
            status: "failed",
            text: "Server Error"
        });
    }

    // if using sql
    // connection.query(`DELETE FROM cart WHERE id = '${id}'`, (err, results) => {
    //     if (err) throw err;
    //     if (results.affectedRows !== 1) {
    //         res.json({
    //             status: "failed",
    //             text: "Orders failed to delete.!"
    //         });
    //     } else {
    //         res.json({
    //             status: "success",
    //             text: "Orders successfully deleted.!"
    //         });
    //     }
    // });
});

router.put("/purchaseorders/:id", authenticateJWT, async (req, res) => {
    const { id } = req.params;

    // using mongooDB
    try {
        await Cart.updateOne(
            { id },
            {
                $set: { "status": "1" }
            }
        );
        res.json({
            status: "success",
            text: "Orders successfully deleted.!"
        });
    } catch (err) {
        console.log(err.message);
        res.json({
            status: "failed",
            text: "Server Error"
        });
    }

    // if using sql
    // connection.query(`UPDATE cart SET status = '1' WHERE id = '${id}'`, (err, results) => {
    //     if (err) throw err;
    //     if (results.affectedRows !== 1) {
    //         res.json({
    //             status: "failed",
    //             text: "Orders failed to delete.!"
    //         });
    //     } else {
    //         res.json({
    //             status: "success",
    //             text: "Orders successfully deleted.!"
    //         });
    //     }
    // });
});

router.get("/print/:id", authenticateJWT, (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM cart WHERE id = '${id}'`, (err, results) => {
        console.log(results.id);
        if (err) throw err;
        if (results.length === 1) {
            const table = `
            <table>
                ${JSON.parse(results[0].cart).map(val => { val.strCategory }
            )}
            </table>
            `;
            res.send(`
                    <!DOCTYPE html>
                        <html>
                        <body>
                            <h2>Orders ID : ${results[0].id}</h2>
                            <h3>Menu : </h3>
                            ${table}
                            <script>
                                window.print()
                            </script>
                        </body>
                        </html>
                    `);
        } else {
            res.send("Orders Not Found");
        }
    });
});

module.exports = router;