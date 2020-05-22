var express = require('express');
var router = express.Router();

var db = require('../lib/db')


// ====================
//ເມືອງ
router.get('/getAll', async function(req, res) {
        let rows
        if (req.query.province_id) {
            rows = await db('tb_district')
                .where('province_id', '=', req.query.province_id)
        } else {
            rows = await db('tb_district')
        }
        res.send({
            status: true,
            getalldata: rows
        })

    })
    //ບ້ານ
router.get('/all', async function(req, res) {
    let rows
    if (req.query.district_id) {
        rows = await db('tb_village')
            .where('district_id', '=', req.query.district_id)
    } else {
        rows = await db('tb_village')
    }
    res.send({
        status: true,
        getall: rows
    })

})

router.post('/select', async function(req, res) {
    let rows = await db('tb_selecttest')
        .insert({
            village_id: req.body.village_id,
            district_id: req.body.district_id,
            province_id: req.body.province_id
        })
    return res.send({ status: true })
})

router.get('/', async function(req, res, next) {
    let row = await db('tb_district')
        .innerJoin('tb_province', 'tb_district.province_id', 'tb_province.province_id')
        .select('tb_district.district_id as district_id', 'tb_district.name as DName', 'tb_district.status as status', 'tb_district.created_at as created_at', 'tb_province.province_id as province_id', 'tb_province.name as PName')
        .orderBy('created_at', 'desc')
    res.send({
        status: true,
        districts: row
    })
})
router.post('/create', async function(req, res) {
    let rows = await db('tb_district')
        .insert({
            name: req.body.name,
            province_id: req.body.province_id,
            status: req.body.status
        })
    return res.send({ ok: true })
})

router.get('/district_id/:district_id', async function(req, res) {
    let row = await db('tb_district')
        .innerJoin('tb_province', 'tb_district.province_id', 'tb_province.province_id')
        .select('tb_district.district_id as district_id', 'tb_district.name as DName', 'tb_district.status as status', 'tb_district.created_at as created_at', 'tb_province.province_id as province_id', 'tb_province.name as PName')
        .where('district_id', '=', req.params.district_id)
    if (row.length === 0) {
        res.send({ status: false })
    }
    res.send({
        status: true,
        districts: row[0],
    })
})

router.put('/update', async function(req, res) {
    await db('tb_district').where({ district_id: req.body.district_id }).update({
        name: req.body.name,
        province_id: req.body.province_id,
        status: req.body.status
    })
    res.send({ ok: true })
})

router.delete('/delete/:district_id', async function(req, res) {
    await db('tb_district').where('district_id', req.params.district_id)
        .del()
        .then(function(tb_district) {
            db.select().from('tb_district')
                .then(function(tb_district) {
                    res.send({ status: true, tb_district })
                })
        })
})
module.exports = router;