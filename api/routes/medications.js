var express = require('express');
var router = express.Router();

var db = require('../../db/medication_db');

//Get all medications
router.get('/', function(req, res) {
    return res.status(200).send({
        success: 'true',
        message: 'Medicine retrieved successfully.',
        result: db
      });
})

//Get a specific medication
router.get('/:id', function(req, res) {
    db.map(function (med, i) {
        if (med.id == req.params.id) {
            return res.status(200).send({
                success: 'true',
                message: 'Medicine of id ' + req.params.id + ' retrieved successfully.',
                result: med
              });
        }
    })

    return res.status(404).send({
        success: 'false',
        message: 'Medicine of id ' + req.params.id + ' not found.'
      });
})

//Create a new medication
router.post('/', function(req, res) {
    if (!req.body.brand) {
        return res.status(400).send({
            success: 'false',
            message: 'brand is a required field.'
        })
    }

    if (!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is a required field.'
        });
    }

    const med = {
        id: db.length == 0 ? 1 : db[db.length - 1].id + 1,
        brand: req.body.brand,
        description: req.body.description,
    }

    db.push(med);

    return res.status(201).send({
        success: 'true',
        message: 'Medicine added successfully.',
        result: med
      });
})

//Delete a specific medication
router.delete('/:id', function(req, res) {
    db.map(function(med, i) {
        if (med.id == req.params.id) {
            db.splice(i, 1);
            return res.stats(200).send({
                success: 'true',
                message: 'Medicine deleted successfully.'
            });
        }
    })

    return res.status(404).send({
        success: 'false',
        message: 'Medicine of id number ' + req.params.id + ' not found.'
    });
})

module.exports = router;