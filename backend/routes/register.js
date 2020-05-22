var express = require("express");
var router = express.Router();
var db = require("../lib/db.js");

router.get("/", async function(req, res) {
    let rows = await db("tb_register")
        // .innerJoin("tb_img", "tb_register.img_id", "tb_img.img_id")

    .select(
            "tb_register.register_id as register_id",
            "tb_register.gender",
            "tb_register.owner_name",
            "tb_register.phone",
            "tb_register.img_pass as img_pass",
            "tb_register.created_at",

        )
        .orderBy("tb_register.created_at", "desc");
    res.send({
        registers: rows
    });
});


router.post("/create", async function(req, res) {
    let rows = await db("tb_register").insert({
        owner_name: req.body.owner_name,
        gender: req.body.gender,
        phone: req.body.phone,
        img_pass: req.body.img_pass,
        created_at: req.body.created_at,

    });
    return res.send({ ok: true });
});

router.get("/register_id/:register_id", async function(req, res) {
    let row = await db("tb_register")
        // .innerJoin(
        //     "tb_img",
        //     "tb_register.img_id",
        //     "tb_img.img_id")
        .select(

            "tb_register.owner_name",
            "tb_register.gender",
            "tb_register.phone",
            "tb_register.img_pass",
            "tb_register.created_at",

        )
        .where("register_id", "=", req.params.register_id);
    if (row.length === 0) {
        res.send({ status: false });
    }
    res.send({

        registers: row[0]
    });
});

router.put("/update", async function(req, res) {
    await db("tb_register")
        .where({ register_id: req.body.register_id })
        .update({
            register_id: req.body.register_id,
            owner_name: req.body.owner_name,
            gender: req.body.gender,
            phone: req.body.phone,
            img_pass: req.body.img_pass,
            created_at: req.body.created_at,

        });
    res.send({ ok: true });
});

router.delete("/delete/:register_id", async function(req, res) {
    await db("tb_register")
        .where("register_id", req.params.register_id)
        .del()
        .then(function(tb_register) {
            db.select()
                .from("tb_register")
                .then(function(tb_register) {
                    res.send({ status: true, tb_register });
                });
        });
});

module.exports = router;