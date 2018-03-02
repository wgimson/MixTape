var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var MixTapeController = require('../../controllers/mixtape.controller');


// Map each API to the Controller FUnctions

router.get('/', MixTapeController.getMixTapes)

router.post('/', MixTapeController.createMixTape)

router.put('/', MixTapeController.updateMixTape)

router.delete('/:id', MixTapeController.removeMixTape)


// Export the Router

module.exports = router;