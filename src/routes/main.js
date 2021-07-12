const express = require("express");
const router = express.Router();

// landing page
router.get('/', async (req,res) => {
    return res.render('home');
});

// not found page
router.get('/notFound', async (req,res) => {
    return res.render('notFound');
});

module.exports = router;