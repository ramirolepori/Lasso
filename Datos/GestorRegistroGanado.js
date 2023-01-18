const data = require('./registroGanado.json');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el ID de vaca a buscar: ', (idVaca) => {
    console.log(data[idVaca]);
    rl.close();
});
