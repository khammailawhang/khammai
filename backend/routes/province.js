var express = require("express");
var router = express.Router();

var db = require("../lib/db");
router.get("/", async function(req, res, next) {
    let row = await db("tb_province").orderBy("created_at", "desc");
    res.send({
        status: true,
        provinces: row
    });
});
router.post("/create", async function(req, res) {
    let rows = await db("tb_province").insert({
        name: req.body.name
    });
    return res.send({ ok: true });
});

// router.post("/create", async function(req, res) {
//   let rows = await db("tb_province").insert({
//     name: req.body.name,
//     status: req.body.status
//   });
//   return res.send({ ok: true });
// });

router.get("/province_id/:province_id", async function(req, res) {
    let row = await db("tb_province").where(
        "province_id",
        "=",
        req.params.province_id
    );
    if (row.length === 0) {
        res.send({ status: false });
    }
    res.send({
        status: true,
        provinces: row[0]
    });
});

router.put("/update", async function(req, res) {
    await db("tb_province")
        .where({ province_id: req.body.province_id })
        .update({
            name: req.body.name,
            status: req.body.status
        });
    res.send({ ok: true });
});

router.delete("/delete/:province_id", async function(req, res) {
    await db("tb_province")
        .where("province_id", req.params.province_id)
        .del()
        .then(function(tb_province) {
            db.select()
                .from("tb_province")
                .then(function(tb_province) {
                    res.send({ status: true, tb_province });
                });
        });
});

module.exports = router;