const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const userSchema = require('../models/User')
const authorize = require('../authentification/auth')
mongoose = require('mongoose')

// Inscription
router.post('/add-user', (req, res, next) => {
    console.log(req.body)

      bcrypt.hash(req.body.mot_pass, 10).then((hash) => {
        const user = new userSchema({
          prenom: req.body.prenom,
          nom: req.body.nom,
          email: req.body.email,
          role: req.body.role,
         mot_pass: hash,
          etat: req.body.etat,
          
        })
        user.save()
          .then((response) => {
            console.log(response);
            res.status(201).json({
              message: 'Inscription réussie !',
              result: response,
            })
          })
          .catch((error) => {
            res.status(409).json({
              error: error.message.split("email:")[1],
            })
          })
      })
  },
)
//modif mdp
/* router.patch('/update1/:id', async(req, res) => {
  try {
        let { actuelPass, newPass } = req.body;
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        let user= userSchema.findById({"_id": req.params.id});
        if(!user){
          return res.status(404);
        };
        if (updatedData.actuelPass){
          user.then(async(e)=> {

                if(await bcrypt.compare(actuelPass, e.mot_pass)){
                    const hash = await bcrypt.hash(newPass, 10);
                      updatedData.password = hash;
                      const result = await userSchema.findByIdAndUpdate(
                      id, updatedData, options
                      );
                    return res.send(result);
                }
                return res.send('no corres');
          });

      }else{
        const result = await userSchema.findByIdAndUpdate(
              id, updatedData, options
          )
          return res.send(result)
      }
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
}) */
router.patch('/updatepass/:id', async (req, res) => {
  const { actuelpassword, newpassword} = req.body;
  console.log(req.body);
try {
const id = req.params.id;
//const updatedData = req.body;
const options = { new: true };
const result = await userSchema.findOne({_id:id})

const passwordMatch = await bcrypt.compare(actuelpassword,result.mot_pass);
console.log(result)

if(!passwordMatch){
  return res.status(400).json({message: 'incorrect password'});
}


const hashedPassword = await bcrypt.hash(newpassword, 10);

result.mot_pass = hashedPassword;

await userSchema.findByIdAndUpdate(id, {mot_pass:hashedPassword}, options )

return res.status(200).json({message: 'modifier avec succes'});

} catch(error) {
   res.status(400).json({message: error.message})
}

})

// Connexion
router.post('/login', async(req, res, next) => {
  // let getUser
  // userSchema
  //   .findOne({
  //     email: req.body.email,
  //   })
  //   // Verifier si l'utilisateur existe
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(401).json({
  //         message: 'Compte non existant !'})
  //     }
  //     getUser = user
  //     return bcrypt.compare(req.body.password, user.password)
  //   })
  //   .then((response) => {
  //     if (!response) {
  //       return res.status(401).json({
  //         message: 'Le mot de passe est incorrect !',
  //       })
  //     }else if(getUser.etat == false){
  //       return res.status(401).json({
  //         message: 'Le compte est désactivé !' ,
  //       })
  //     }
  //     let jwtToken = jwt.sign({
  //         email: getUser.email,
  //         userId: getUser._id,
  //       },
  //       'longer-secret-is-better',{ expiresIn: '6h'
  //     })
  //     res.status(200).json({
  //       token: jwtToken,
  //       expiresIn: 3600,
  //       _id: getUser._id,
  //     })
  //   })
  //   .catch((err) => {
  //     return res.status(401).json({
  //       message: 'Authentication failed',
  //     })
  //   })

  let { email, mot_pass } = req.body; 
console.log(req.body);
    let existingUser;

// Retrouve l'email saisi dans la base de données et stocke ça dans existingUser
    existingUser = await userSchema.findOne({ email: email }); 
    if (!existingUser) 
    { // si l'email ne s'y trouve pas donne le message
      return res.status(200).json({statut:"email",message:"email doesn't exist...!"});
    }
    else{
    const etat = existingUser.etat 
   
    console.log(etat);
    if (!etat) 
    { // si l'email ne s'y trouve pas donne le message
      return res.status(200).json({ statut:"etat",message:"le compte est archivé...!"});
    }
    // On sort de if donc çjsona suppose que l'email existe
    //On vérifie maintenant si le mot de passe est correct ou pas
// Comparaison entre le mot de passe saisi et celui se trouvant dans la base de données
    const isPasswordValid = await bcrypt.compare(mot_pass, existingUser.mot_pass);
    if (!isPasswordValid) { // Le mot de passe n'est pas le bon
      return res.status(200).json({ statut:"mot_pass", message:"mot de passe incorrect"});
    }
else{
    // Maintenant que tout est bon (email et mot de passe correctes), on genere un token

    let token;
    try {  // Essaye de faire ceci ...
      //Creating jwt token
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email }, // id et email de la personne connectée
          "process.env.JWT_SECRET", // cette clé secrète se trouve dans le fichier .env
        { expiresIn: "1h" } // delai d'expiration du token
      );
    
    } 
    catch (err) {  // Informe-moi avec un message s'il y'a problème
      console.log(err);
      const error = new Error("Erreur! Quelque chose s'est mal passée!");
      return next(error);
    }
  
   // Si la tentative de connexion s'est bien déroullée, on envoi une réponse
   // avec les informations (id, email, nom, prenom et un token)
   return res
      .status(200)
      .json({
        success: true,
        data: {
          userId: existingUser.id,
          email: existingUser.email,
          nom: existingUser.nom,
          prenom: existingUser.prenom,
          token: token, 
          role:existingUser.role 
        },
      });
    }
  }

})

// Recuperez tous les utilisateurs
router.route('/').get(/* authorize */(req, res, next) => {
  userSchema.find((error, response)=> {
    if (error) {
      return next(error)
    } else {
      return res.status(200).json(response)
    }
  })
})

// Recuperez un utilisateur
router.route('/read-user/:id').get((req, res) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Recuperez et autoriser la connexion d'un utilisateur
router.route('/user-profile/:id').get(authorize, (req, res, next) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

// Update User
router.route('/update-user/:id').put((req, res, next) => {
  userSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
        console.log('Modification réussie !')
      }
    },
  )
})
/* delete by id method pour supprimer */

router.delete('/delete/:id', async(req, res) => {
  try {
  const id = req.params.id;
  const data = await userSchema.findByIdAndDelete(id)
  res.send(`Le Document avec le nom ${data.prenom} ${data.nom} a été supprimé..`)
  }
  catch (error) {
  res.status(400).json({ message: error.message })
  }
  })


module.exports = router