const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists
} = require('sequelize-test-helpers');

const MessageModel = require('../../../models/Message');

describe('src/models/Message', () => {
    const Model = MessageModel(sequelize, dataTypes);
    const instance = new Model();
    checkModelName(Model)('Message');
    context('properties', () => {
        ;['senderId',
            'receiverId',
            'dateSent',
            'message'].forEach(checkPropertyExists(instance));
    })
})

