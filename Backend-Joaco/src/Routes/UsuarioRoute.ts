import validator from "validator";
import Router from "express";
import { insert, query } from "../lib/BDprov";
import { Usuario } from "../interfaces/Usuario";
import sha256 from "sha256";
import { v4 as uuid } from "uuid";
import { generarToken } from "../lib/jwtutils";

let crudUsuario = Router();

crudUsuario.route("/RegistraUsuario").post((req, res) => {
  let contenido: Usuario = req.body;

  let {
    id,
    nombre,
    apellido,
    email,
    contraseña: contraseñaClear,
    empresa,
    puesto,
  } = contenido;

  let salt = [uuid(), uuid()].join("__");

  let contraseña = sha256([contraseñaClear, salt].join(""));

  if (validator.isEmail(email)) {
    let usuGuardar = {
      id,
      nombre,
      apellido,
      email,
      contraseña,
      salt,
      empresa,
      puesto,
    };

    insert("Lasso", "Usuarios", usuGuardar)
      .then(() => {
        res.status(201).end();
      })
      .catch(() => {
        res.status(500).end();
      });
  } else {
    console.error(
      "El email " +
        email +
        " Debe tener formato del tipo 'emailejemplo@ejemplo.com'"
    );
    res.status(500).end();
  }
});

crudUsuario.route("/login").post((req, res) => {
  let contenidoPost = req.body;
  let { email } = contenidoPost;

  if (validator.isEmail(email)) {
    query("Lasso", "Usuarios", { email })
      .then((data) => {
        if (data.length === 0) {
          res.status(401).end();
          return;
        }
        let datum = data[0];

        let { contraseña: contraseñaEncriptada, salt } = datum;

        let reencriptacion = sha256([contenidoPost.contraseña + salt].join(""));

        if (contraseñaEncriptada === reencriptacion) {
          let payload = {
            sub: datum.id,
            name: datum.nombre,
            surname: datum.apellido,
            email: datum.email,
            empresa: datum.empresa,
            role: datum.puesto,
          };
          let token = generarToken(payload);
          res.status(200).send({ token });
          return;
        }

        res.status(401).end();
      })
      .catch(() => {
        res.status(500).end();
      });
  } else {
    res.send(401).end();
  }
});

export default crudUsuario;

//usuario pa ingresar
//{
//"id":"1",
//"email":"jm@ejemplo.com",
//"contraseña":"123456"
//}
