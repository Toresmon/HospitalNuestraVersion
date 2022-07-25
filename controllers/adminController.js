const OneModel = require("../models/myModel");
const TwoModel = require("../models/postModel");
const moment = require("moment");
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");

global.isLogin = 0;
global.login = false;

let id = 0;
//respuesta a una petición de tipo post

exports.vista = (req, res) => {
    res.status(200).render("login", { isLogin: isLogin, login: login });
};

//error404
exports.error404 = (req, res) => {
    res.status(200).render("error404");
};

exports.logine = (req, res) => {
    if (req.body.usuario == "Admin1") {
        OneModel.find({ usuario: req.body.usuario }, (err, docs) => {
            bcrypt.compare(
                req.body.contraseña,
                bcrypt.hashSync(docs[0].contraseña, 5),
                (err, resul) => {
                    console.log(docs[0].contraseña);
                    if (err) throw err;
                    if (resul) {
                        res.session = true;
                        login = res.session;
                        isLogin = 1;
                        res.status(200).render("index", { login: login });
                    } else {
                        isLogin = 2;
                        res.status(200).render("login", {
                            isLogin: isLogin,
                            login: login,
                        });
                    }
                }
            );
        });
    } else {
        isLogin = 3;
        res.status(200).render("login", { isLogin: isLogin, login: login });
    }
};

exports.logout = (req, res) => {
    if (login) {
        res.redirect("/");
        req.session.destroy();
        login = false
    } else {
        res.redirect("/");
    }
};


exports.postear = (req, res) => {
    if(login){
        res.status(200).render("postCreator");
    }
    else{
        isLogin = 4
        res.redirect("/"); //Hacer vista o algo con esto
    }
};
exports.postear2 = (req, res) => {
    if(login){
        res.status(200).render("postPrueba", { isLogin: isLogin, login: login });
    }
    else{
        isLogin = 4
        res.redirect("/"); //Hacer vista o algo con esto
    }
};

exports.seccionAdmin = (req, res) => {
    // if(login){
        res.status(200).render("edicionPosteos", {data:TwoModel.find().limit(3)});
    // }
    // else{
    //     isLogin = 4
    //     res.redirect("/"); //Hacer vista o algo con esto
    // }
  
};

exports.config = (req, res) => {
    if(login){
        res.status(200).render("config");
    }
    else{
        isLogin = 4
        res.redirect("/"); //Hacer vista o algo con esto
    }
  
};



exports.subirPost = (req, res) => {
    let fecha= req.body.fecha; 
    let titulo= req.body.titulo;
    let descripcion = req.body.descripcion;
    let imagen = req.body.imagen;
    let enlace = req.body.enlace;
    let tag = req.body.tag;

    let post = new TwoModel({
     fecha: fecha,
     titulo: titulo,
     descripcion: descripcion,
     imagen: imagen,
     enlace: enlace,
     tags: tag,
    });

    post.save((err,db)=>{
     if(err) console.error(err);
     console.log(db);
    })
 

};


