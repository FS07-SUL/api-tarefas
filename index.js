const express = require('express');
const app = express();

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const tarefaRoutes = require("./src/routes/tarefaRoutes");
const { verificarToken } = require('./src/utils');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('E ai boy!')
});

app.use('/usuarios', usuarioRoutes);
app.use('/tarefas', verificarToken, tarefaRoutes);

app.listen(8000, () => {
    console.log(`http://localhost:8000`);
});