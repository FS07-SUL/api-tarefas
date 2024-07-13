const express = require('express');
const app = express();

const tarefaRoutes = require("./src/routes/tarefaRoutes");

app.use(express.json());

app.get('/', (req, res) => {
    res.send('E ai boy!')
});

app.use('/tarefas', tarefaRoutes);

app.listen(8000, () => {
    console.log(`http://localhost:8000`);
});