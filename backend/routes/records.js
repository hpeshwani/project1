
const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

router.get('/', async (req, res) => {
    const records = await Record.find();
    res.json(records);
});

router.post('/', async (req, res) => {
    const record = new Record(req.body);
    await record.save();
    res.json(record);
});

router.put('/:id', async (req, res) => {
    const record = await Record.findById(req.params.id);
    if (record) {
        record.auditTrail.push({
            timestamp: new Date(),
            changes: JSON.stringify(req.body)
        });
        Object.assign(record, req.body);
        await record.save();
        res.json(record);
    } else {
        res.status(404).send('Record not found');
    }
});

module.exports = router;
