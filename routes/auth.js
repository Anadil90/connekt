const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('user authentication route');
})

module.exports = router;