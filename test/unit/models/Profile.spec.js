const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists
} = require('sequelize-test-helpers');

const ProfileModel = require('../../../models/Profile');

describe('src/models/Profile', () => {
    const Model = ProfileModel(sequelize, dataTypes);
    const instance = new Model();
    checkModelName(Model)('Profile');
    context('properties', () => {
        ;['firstName',
            'lastName',
            'phoneNumber',
            'age'].forEach(checkPropertyExists(instance));
    })
})
