import {sign, verify} from 'jsonwebtoken'

const SECRET = 'holasdlfkjsdlfkjsdlfkjsldfkjslieurwioeiruwoeriwjoeriwerwierhwerklaksdasdasmdnaasdasd'

let hora = () => Math.floor(new Date().getTime() / 1000);

export let generarToken = (payload) => {
    payload.iat = hora()
    let token = sign(payload, SECRET, {expiresIn: '1000s'})
    return token
}

export let verificarToken = (token) => {
    try {
        let objData = verify(token, SECRET)
        console.log(objData)
        return true
    }
    catch (err) {
        console.log(err)
        return false
    }
}