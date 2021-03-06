const Business = require('../models/business');

const businessList = (req, res) => {
  Business.find()
    .populate('investId')
    .exec()
    .then((businesses) => {
      if (!businesses) {
        return res.status(404).json({ message: 'businesss not found!' });
      }
      return res.status(200).json(businesses);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

const businessReadOne = (req, res) => {
  const businessid = req.param.id;
  Business
    .findById(businessid)
    .populate('investId')
    .exec()
    .then((business) => {
      if (business) {
        return res.status(200).json(business);
      }
      return res.status(404).json({ message: 'business not found! ' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

const businessCreate = (req, res) => {
  Business
    .create({
      // investid: investeeId._id,
      businessTitle: req.body.businessTitle,
      description: req.body.businessDescription,
      category: req.body.businessCategory,
      location: req.body.preferredLocation,
      amount: req.body.requiredAmount,
      media: req.body.mediaURLs.split(''),
      video: req.body.videoURL,
      status: req.body.status,
      goal: req.body.goal,
      deadline: req.body.deadline,
      validated: req.body.validated
    })
    .then((business) => res.status(201).json({ message: 'Created successfully', data: business }))
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

const businessUpdate = (req, res) => {
  const businessid = req.param.id;
  if (!businessid) {
    return res.status(404).json({ message: 'Business not found!' });
  }
  return Business
    .findByIdAndUpdate({
      businessid,
      $set: {
        businessTitle: req.body.businessTitle,
        description: req.body.businessDescription,
        category: req.body.businessCategory,
        location: req.body.preferredLocation,
        amount: req.body.requiredAmount,
        media: req.body.mediaURLs,
        video: req.body.videoURL,
        status: req.body.status,
        goal: req.body.goal,
        deadline: req.body.deadline,
        validated: req.body.validated
      }
    })
    .then((business) => res.status(200).json({ message: 'Update successfully', data: business }))
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

const businessDelete = (req, res) => {
  const businessid = req.param.id;
  Business
    .findByIdAndRemove(businessid)
    .then(() => res.status(200).json({ message: 'successfully deleted the business' }))
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

module.exports = {
  businessList,
  businessReadOne,
  businessCreate,
  businessUpdate,
  businessDelete
};
