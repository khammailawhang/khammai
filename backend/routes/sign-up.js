const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../lib/dbconn.js');
const userMiddleware = require('../middleware/users.js');

// ເພີມຜູ້ໃຊ້ງານ ບັນທຶກ
router.post('/', userMiddleware.validateRegister, (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
        req.body.username
      )});`,
        (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    msg: 'This username is already in use!'
                });
            } else {
                // username is available
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            msg: err
                        });
                    } else {


                        // ເພີມຜູ້ໃຊ້ງານ ບັນທຶກ
                        db.query(
                            `INSERT INTO users (
                  id,
                  gender,
                  name,
                  phone,
                  email,
                  username,
                  password,
                 
                  registered) VALUES ('
                  ${uuid.v4()}', 
                  ${db.escape(req.body.gender,)}, 
                  ${db.escape(req.body.name,)}, 
                  ${db.escape(req.body.phone,)}, 
                  ${db.escape(req.body.email,)}, 
                  ${db.escape(req.body.username,)}, 
                  
                  ${db.escape(req.body.register)},
                  ${db.escape(req.body.register_create)},
                  ${db.escape(req.body.register_update)},
                  ${db.escape(req.body.register_delete)},
                  ${db.escape(req.body.register_detail)},
                  ${db.escape(req.body.register_report)},
                  ${db.escape(req.body.register_export)},
                
                  ${db.escape(req.body.status)},
                  now())`,
                            (err, result) => {
                                if (err) {
                                    throw err;
                                    return res.status(400).send({
                                        msg: err
                                    });
                                }
                                return res.status(201).send({
                                    msg: 'Registered!'
                                });
                            }
                        );
                    }
                });
            }
        }
    );
});
module.exports = router;