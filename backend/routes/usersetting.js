const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const db = require("../lib/dbconn.js");
const userMiddleware = require("../middleware/users.js");
// ແກ້ໄຂຜູ້ໃຊ້ງານ
router.put("/update", (req, res, next) => {
    db.query(
        `UPDATE users SET
    gender = ${db.escape(req.body.gender)},
    name = ${db.escape(req.body.name)},
    phone = ${db.escape(req.body.phone)},
  
    register = ${db.escape(req.body.register)},
    register_create = ${db.escape(req.body.register_create)},
    register_update = ${db.escape(req.body.register_update)},
    register_delete = ${db.escape(req.body.register_delete)},
    register_detail = ${db.escape(req.body.register_detail)},
    register_report = ${db.escape(req.body.register_report)},
    register_export = ${db.escape(req.body.register_export)},
   
    status = ${db.escape(req.body.status)} 
    WHERE users_id = ${db.escape(req.body.users_id)}`,
        (err, result) => {
            if (err) {
                throw err;
                return res.status(400).send({
                    msg: err,
                });
            }
            return res.status(201).send({
                msg: "Update success!",
            });
        }
    );
});

router.put(
    "/updatePassword",
    userMiddleware.validateRegister,
    (req, res, next) => {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).send({
                    msg: err,
                });
            } else {
                // has hashed pw => add to database
                db.query(
                    `UPDATE users SET
            username = ${db.escape(req.body.username)},
            password =${db.escape(hash)}
            WHERE users_id = ${db.escape(req.body.users_id)}`,
                    (err, result) => {
                        if (err) {
                            throw err;
                            return res.status(400).send({
                                msg: err,
                            });
                        }
                        return res.status(201).send({
                            msg: true,
                        });
                    }
                );
            }
        });
    }
);

module.exports = router;