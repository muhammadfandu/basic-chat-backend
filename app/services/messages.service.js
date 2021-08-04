const { messages } = require('../models');

class MessagesServices {
  /**
   * Get user by email
   * @param {string} email
   */
  static async create(payload) {
    const newMessage = await messages.create(payload);

    return newMessage;
  }
}

module.exports = MessagesServices;
