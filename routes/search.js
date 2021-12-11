/*
    Rutas de  búsqueda
    host + /api/search

*/
const { Router } = require("express");

const { quoteSearch, search  } = require("../controllers/search")

const router = Router();

//Search
router.get('/', quoteSearch)



// search by author || genre || book || user
router.get('/:collection/:term', search)

module.exports = router;