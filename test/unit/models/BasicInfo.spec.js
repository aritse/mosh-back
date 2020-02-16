const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists
} = require('sequelize-test-helpers');

const BasicInfoModel = require('../../../models/BasicInfo');

describe('src/models/BasicInfo', () => {
    const Model = BasicInfoModel(sequelize, dataTypes);
    const instance = new Model();
    checkModelName(Model)('BasicInfo');
    context('properties', () => {
        ;['imageUrl', 'zipcode', 'catchPhrase'].forEach(checkPropertyExists(instance));
    })
})