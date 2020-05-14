const AuditTrail = require('../models/auditTrail');

const auditTrailList = (req, res) => {
  AuditTrail.find()
    .populate('user')
    .exec()
    .then((auditTrails) => {
      if (auditTrails) {
        return res.status(200).json(auditTrails);
      } else {
        return res.status(404).json({ message: 'auditTrails not found!' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

const auditTrayReadOne = (req, res) => {
  const auditTrailId = req.param.id;
  AuditTrail.findById(auditTrailId)
    .populate('user')
    .exec()
    .then((auditTrail) => {
      if (auditTrail) {
        res.status(200).json({
          auditTrail,
        });
      } else {
        return res.status(404).json({ message: 'auditTrail not found!' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

const auditTrailCreate = (req, res) => {
  AuditTrail
    .create({
      user: user._id,
      activity: req.body.activity,
    })
    .then((auditTrail) => { return res.status(201).json({ data: auditTrail }); })
    .catch((err) => res.status(500).json({ error: err }) );
};

const auditTrailUpdate = (req, res) => {
  const auditTrailid = req.param.id;
  if (!auditTrailid) {
    return res.status(404).json({ message: 'auditTrail not found!' });
  }
  AuditTrail
    .findByIdAndUpdate({
      auditTrailid,
      $set: {
        activity: req.body.activity
      }
    })
    .then((auditTrail) => {
      return res.status(200).json({
        message: 'Updated successfully!',
        data: auditTrail
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

const auditTrailDelete = (req, res) => {
  const auditTrailId = req.param.id;
  if (!auditTrailId) {
    return res.status(404).json({ message: 'auditTrail not found!' });
  }
  AuditTrail
    .findByIdAndRemove(auditTrailId)
    .then(() => {
      return res.status(200).json({ message: 'successfully deleted the auditTrail' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

module.exports = {
  auditTrailList,
  auditTrayReadOne,
  auditTrailCreate,
  auditTrailUpdate,
  auditTrailDelete
};
