var express = require('express');
var router = express.Router();

var db = require('../../db/patient_db');
var medications_db = require('../../db/medication_db');

//Get all patients
router.get('/', function(req, res) {
    return res.status(200).send({
        success: 'true',
        message: 'Patients retrieved successfully.',
        result: db
      });
})

//Get a specific patient
router.get('/:id', function(req, res) {
    db.map(function (pat, i) {
        if (pat.id == req.params.id) {
            return res.status(200).send({
                success: 'true',
                message: 'Patient of id ' + req.params.id + ' retrieved successfully.',
                result: pat
              });
        }
    })

    return res.status(404).send({
        success: 'false',
        message: 'Patient of id ' + req.params.id + ' not found.'
      });
})

//Create a new patient
router.post('/', function(req, res) {
    if (!req.body.full_name) {
        return res.status(400).send({
            success: 'false',
            message: 'full_name is a required field.'
        });
    }

    if (!req.body.insurance) {
        return res.status(400).send({
            success: 'false',
            message: 'insurance is a required field.'
        });
    }

    const medication = req.body.medications ? req.body.medications : [];

    const pat = {
        id: db.length == 0 ? 1 : db[db.length - 1].id + 1,
        full_name: req.body.full_name,
        insurance: req.body.insurance,
        medications: medication
    }

    db.push(pat);

    return res.status(201).send({
        success: 'true',
        message: 'Patient added successfully.',
        result: pat
      });
})

//Add a medication to a patient's list
router.post('/:id/medicine', function(req, res) {
    if (!req.body.med_id) {
        return res.status(400).send({
            success: 'false',
            message: 'Must include med_id field for medicine to add.'
        });
    }

    var medicine = 0;
    medications_db.map(function(med, i) {
        if (med.id == req.body.med_id) {
            medicine = med;
        }
    })

    if (medicine == 0) {
        return res.status(404).send({
            success: 'false',
            message: 'Medicine of id ' + req.body.med_id + ' not found.'
        });
    }

    db.map(function(pat, i) {
        if (pat.id == req.params.id) {
            pat.medications.push(medicine);
            res.status(200).send({
                success: 'true',
                message: 'Patient of id ' + req.params.id + ' successfully added medicine of id ' +
                    req.body.med_id + ' to list of medications.',
                result: pat
            });
        }
    })

    return res.status(404).send({
        success: 'false',
        message: 'Patient of id ' + req.params.id + ' not found.'
    });
})

//Remove a medication from a patients list
router.delete('/:id/medicine/:med_id', function(req, res) {
    db.map(function(pat, i) {
        if (pat.id == req.params.id) {
            pat.medications.map(function(med, j) {
                if (med.id == req.params.med_id) {
                    db[i].medications.splice(j, 1);
                    return res.status(200).send({
                        success: 'true',
                        message: 'Patient of id ' + req.params.id +
                            ' successfully removed medicine of id ' +
                            req.body.med_id + ' from list of medications.'
                    });
                }
            })
            return res.status(404).send({
                success: 'true',
                message: 'Patient of id ' + req.params.id + ' does not have medicine of id ' +
                    req.body.med_id + ' on list of medications.'
            });
        }
    })

    return res.status(404).send({
        success: 'false',
        message: 'Patient of id ' + req.params.id + ' not found.'
    });
})

//Delete a specific patient
router.delete('/:id', function(req, res) {
    db.map(function(pat, i) {
        if (pat.id == req.params.id) {
            db.splice(i, 1);
            return res.status(200).send({
                success: 'true',
                message: 'Patient deleted successfully.'
            });
        }
    })

    return res.status(404).send({
        success: 'false',
        message: 'Patient of id number ' + req.params.id + ' not found.'
    });
})

module.exports = router;