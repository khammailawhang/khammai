var express = require('express');
var router = express.Router();
var db = require('../lib/db')

router.get('/', async function(req, res, next) {
    let row = await db('tb_village')
        .innerJoin('tb_district', 'tb_village.district_id', 'tb_district.district_id')
        .select('tb_village.village_id as village_id', 'tb_village.name as VName', 'tb_village.created_at as created_at', 'tb_district.district_id as district_id', 'tb_district.name as DName')
        .orderBy('created_at', 'desc')
    res.json({
        status: true,
        villages: row
    })
})
router.post('/create', async function(req, res) {
    let rows = await db('tb_village')
        .insert({
            district_id: req.body.district_id,
            name: req.body.name
        })
    return res.send({ ok: true })
})

router.get('/village_id/:village_id', async function(req, res) {
    let row = await db('tb_village')
        .innerJoin('tb_district', 'tb_village.district_id', 'tb_district.district_id')
        .select('tb_village.village_id as village_id', 'tb_village.name as VName', 'tb_village.created_at as created_at', 'tb_district.district_id as district_id', 'tb_district.name as DName')
        .where('village_id', '=', req.params.village_id)
    if (row.length === 0) {
        res.send({ status: false })
    }
    res.send({
        status: true,
        villages: row[0],
    })
})

router.put('/update', async function(req, res) {
    await db('tb_village').where({ village_id: req.body.village_id }).update({
        district_id: req.body.district_id,
        name: req.body.name
    })
    res.send({ ok: true })
})

router.delete('/delete/:village_id', async function(req, res) {
    await db('tb_village').where('village_id', req.params.village_id)
        .del()
        .then(function(tb_village) {
            db.select().from('tb_village')
                .then(function(tb_village) {
                    res.send({ status: true, tb_village })
                })
        })
})

module.exports = router;