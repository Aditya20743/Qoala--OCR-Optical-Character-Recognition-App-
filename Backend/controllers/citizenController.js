const asyncHandler = require('express-async-handler')
const Citizen = require('../models/CitizenModel.js')


const createCitizen = asyncHandler(async (req, res) => {
    const citizenExists = await Citizen.findOne({ idNumber: req.body.idNumber });
    const {
      idNumber,
      name,
      last_name,
      date_of_birth,
      date_of_issue,
      date_of_expiry,
    } = req.body;
  
    try {
      if (citizenExists) {
        citizenExists.name = name || citizenExists.name;
        citizenExists.last_name = last_name || citizenExists.last_name;
        citizenExists.date_of_birth = date_of_birth || citizenExists.date_of_birth;
        citizenExists.date_of_issue = date_of_issue || citizenExists.date_of_issue;
        citizenExists.date_of_expiry = date_of_expiry || citizenExists.date_of_expiry;
        await citizenExists.save();
        res.status(200).json(citizenExists); // Status 200 for update
      } else {
        const citizen = await Citizen.create({
          idNumber: idNumber,
          name,
          last_name,
          date_of_birth,
          date_of_issue,
          date_of_expiry,
        });
        res.status(201).json(citizen); // Status 201 for new creation
      }
    } catch (error) {
      res.status(400).json({ message: 'Unable to Save', error: error.message });
    }
  });

const getCitizen = async(req, res) => {
    const citizen = await Citizen.findOne({idNumber: req.body.idNumber})
    if(citizen){
        res.json(citizen)
    } else{
        res.status(404)
        throw new Error('Citizen not found')
    }
}

const deleteCitizen = async (req, res) => {
  try {
    const citizen = await Citizen.findOneAndDelete({ idNumber: req.body.idNumber });

    if (citizen) {
      res.json({ message: 'Citizen removed' });
    } else {
      res.status(404).json({ error: 'Citizen not found' });
    }
  } catch (error) {
    console.error('Error deleting citizen:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {createCitizen, getCitizen, deleteCitizen}