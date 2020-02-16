const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists
} = require('sequelize-test-helpers');

const SwipeModel = require('../../../models/Swipe');

describe('src/models/Swipe', () => {
    const Model = SwipeModel(sequelize, dataTypes);
    const instance = new Model();
    checkModelName(Model)('Swipe');
    context('properties', () => {
        ;['swiperId', 'swipeeId', 'liked'].forEach(checkPropertyExists(instance));
    })
})
