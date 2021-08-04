module.exports = (app) => {
  const messages = require('../controllers/messages.controller.js');

  var router = require('express').Router();

  // Create a new User
  router.post('/', messages.create);

  // Retrieve all Users
  router.get('/', messages.findAll);

  // Retrieve all published Users
  router.get('/published', messages.findAllPublished);

  // Retrieve a single User with id
  router.get('/:id', messages.findOne);

  // Update a User with id
  router.put('/:id', messages.update);

  // Delete a User with id
  router.delete('/:id', messages.delete);

  // Delete all Users
  router.delete('/', messages.deleteAll);

  app.use('/api/messages', router);
};
