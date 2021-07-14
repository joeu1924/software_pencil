const express = require('express') 
const bodyParser = require('body-parser') 

const rutas = express.Router()

//multer
const multer = require('multer')
const par = multer()

//parsin de los datos
rutas.use(express.urlencoded({extended:true}))
rutas.use( express.json())
rutas.use( par.array() )

//Llamar al firebase

const firebase = require('firebase')
/*const firebaseConfig = {
    apiKey: "AIzaSyDCNhVZYuYNb38cOSsTgjsdYZDANFrrbok",
    authDomain: "pencilpaper-80295.firebaseapp.com",
    projectId: "pencilpaper-80295",
    storageBucket: "pencilpaper-80295.appspot.com",
    messagingSenderId: "613845206494",
    appId: "1:613845206494:web:d558223a7f75b9c6f494f"    
  };*/

  const firebaseConfig = {
    apiKey: "AIzaSyCeWlkkuOmefCbtuCOI3k4wboGOrljaAIY",
    authDomain: "software-6c212.firebaseapp.com",
    projectId: "software-6c212",
    storageBucket: "software-6c212.appspot.com",
    messagingSenderId: "853891028295",
    appId: "1:853891028295:web:c70d2fb8d2f620830fe862",
    measurementId: "G-SE2YC5MEMR"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

rutas.use(express.urlencoded({extended:true}))


const db = firebase.firestore()


//uso de las rutas
/********************************************/
/********************************************/

//SE LLAMA A ESTE HTML

//nombres diferentes con rutas diferentes 
//para llamar al home
rutas.get('/',(req,res)=> {
    //Con un tag especifico
    //res.send('<p>AEA CAUSA</p>')
    //res.sendFile('/Pantallas/vistas/home.html',{root:__dirname})
    res.render('home')      
})
//para llamar a la vista login
rutas.get('/login',(req,res)=> {
  //res.sendFile('/Pantallas/vistas/login.html',{root:__dirname})
  res.render('login')


  
})
//para llamar a la vista Home
rutas.get('/home',(req,res)=> {
    //res.sendFile('/Pantallas/vistas/home.html',{root:__dirname})
    res.render('home')  
})

//para llamar a la vista about us
rutas.get('/aboutus',(req,res)=> {
    //res.sendFile('/Pantallas/vistas/aboutus.html',{root:__dirname})
    res.render('aboutus') 
})

//para llamar a la vista registro
rutas.get('/registro',(req,res)=> {
    //res.sendFile('/Pantallas/vistas/registro.html',{root:__dirname})
    res.render('registro') 
})




//para agregar usuario
rutas.post('/agregar',(req,res) => {
    const contacto = {
      nombre:req.body.nombre,
      email:req.body.email ,
      Contraseña:req.body.contra ,
      repetirContraseña:req.body.repetirContra,
      telefono:req.body.telefono,
    }   
    console.log(contacto)
    db.collection('agenda_contactos').add(contacto)
    res.redirect('/bienvenidalogin')
  })




//para llamar a la vista bienvenidalogin
rutas.get('/bienvenidalogin',(req,res)=> {
    //res.sendFile('/Pantallas/vistas/registro.html',{root:__dirname})
    res.render('bienvenidalogin') 
  })

  
  //para llamar a la vista bienvenidalogin
  rutas.get('/profilepage',(req,res)=> {
    //res.sendFile('/Pantallas/vistas/registro.html',{root:__dirname})
    res.render('profilepage') 
  })  
   
  //para llamar a la vista bienvenidalogin
  rutas.get('/profileuser',(req,res)=> {
    //res.sendFile('/Pantallas/vistas/registro.html',{root:__dirname})
    res.render('profileuser') 
  })

  rutas.post('/salasadd',(req,res)=>{
    const sala = {
      namesala:req.body.namesala,
      tamsala:req.body.tamsala ,
      temsala:req.body.temsala ,
      tipo:req.body.tipo,
      password: req.body.password1,
    }
    db.collection('salas').add(sala)
    res.redirect('/sala')
  })


  rutas.get('/sala',(req,res)=> {
    //res.sendFile('/Pantallas/vistas/registro.html',{root:__dirname})
    res.render('room') 
  }) 


  //para llamar a la vista bienvenidalogin
rutas.get('/bibliotecageneral',(req,res)=> {
  //res.sendFile('/Pantallas/vistas/registro.html',{root:__dirname})
  res.render('bibliotecageneral') 
})

rutas.get('/biologia',(req,res)=> {
  //res.sendFile('/Pantallas/vistas/registro.html',{root:__dirname})
  res.render('biologia') 
})

rutas.get('/computacion',(req,res)=> {
  //res.sendFile('/Pantallas/vistas/registro.html',{root:__dirname})
  res.render('computacion') 
})

rutas.get('/historia',(req,res)=> {
  //res.sendFile('/Pantallas/vistas/registro.html',{root:__dirname})
  res.render('historia') 
})


rutas.get('/quimica',(req,res)=> {
  //res.sendFile('/Pantallas/vistas/registro.html',{root:__dirname})
  res.render('quimica') 
})


rutas.get('/matematicas',(req,res)=> {
  //res.sendFile('/Pantallas/vistas/registro.html',{root:__dirname})
  res.render('matematicas') 
})

rutas.get('/ingles',(req,res)=> {
  //res.sendFile('/Pantallas/vistas/registro.html',{root:__dirname})
  res.render('ingles') 
})

rutas.get('/contrasena',(req,res)=>{
  res.render('contrasena')
})




 /*
this.db
  .collection('sala')
  .get()
  .toPromise()
  .then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    doc.ref.delete();
  });
});*/


module.exports = rutas

