const { logar, criar } = require('../controllers/usuarioController');

const router = require('express').Router();

router.post('/login', async (req, res) => {
    res.send(await logar(req.body));
});

router.post('/', async (req, res) => {
    res.send(await criar(req.body));
});



module.exports = router;
