const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists
} = require('sequelize-test-helpers');

const RoleModel = require('../../../models/Role');

describe('src/models/Role', () => {
    const Model = RoleModel(sequelize, dataTypes);
    const instance = new Model();
    checkModelName(Model)('Role');
    context('properties', () => {
        ;['role', 'expertise'].forEach(checkPropertyExists(instance));
    })
})
