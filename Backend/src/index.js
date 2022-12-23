const express = require('express');
const app = express();
const morgan=require('morgan');

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Nuestro primer WS Get
// app.get('/', (req, res) => {    
//     res.json(
//         {
//             "Title": "Hola mundo"
//         }
//     );
// })

//Routes
app.use('/',require('./routes/index'));
app.use('/cows.json', require('./routes/cows'));


//Iniciando el servidor, escuchando...
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});
