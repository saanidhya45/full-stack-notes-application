const express = require('express');
const {handleNotesPostRoute, handleNotesGetRoute, handleNotesUpdateRoute, handleNotesDeleteRoute} = require('../controller/notes');
const {jwtAuthMiddleware} = require('../auth');
const router = express.Router();

router
.route('/').post(jwtAuthMiddleware,handleNotesPostRoute)
.get(jwtAuthMiddleware, handleNotesGetRoute)


// Update and delete note by id
router
.route('/:id')
  .put(jwtAuthMiddleware, handleNotesUpdateRoute)
  .delete(jwtAuthMiddleware, handleNotesDeleteRoute);
module.exports = router