const express = require('express');
const Model = require('../models/users');
const domotique = require('../models/domotique');


const DomoRouter = express.Router()

module.exports =DomoRouter;

//////ROUTE POUR LA SERRE/////


DomoRouter.post('/postdomotique', async (req, res) => {


  const {temp,
    hum,
    sol,
    lum} = req.body;

  const users = [];

  let dateInsertion = new Date();
  const newUser = Serre({
    temp,
    hum,
    sol,
    lum,
    dateInsertion
  });

  try {

    await newUser.save();

    res.status(201).json(newUser);

  } catch (error) {
    res.status(404).json({ message: error.message })
  }

})



domotique.get('/donne_maison', async (req, res) => {
    try {
        const data = await Serre.find();
        res.json(data)
      }
      catch (error) {
        res.status(500).json({ message: error.message })
      }
})


domotique.get('/domo/:id', async (req, res) => {
  try {
    const data = await Serre.findById(req.params.id);
    return res.json(data)
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

//Methode pour la modification d'un utilisateur


  try {

    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options)

     // Comparer l'ancien mot de passe avec le mot de passe haché dans la base de données
    //  const passwordMatch = await bcrypt.compare(oldPassword, result.password);
     if (!result) {
       return res.status(404).json({ message: 'Not found' });
     }
    await result.save();

    return res.status(200).json({ message: 'Insertion reussie' });
  
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
