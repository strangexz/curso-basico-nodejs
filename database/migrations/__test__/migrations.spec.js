const _ = require('underscore');
const configuration = require('../../../knexfile')['test'];
const knex = require('knex')(configuration);

/** Models */
const AttackTypeModel = require('../../../src/api/models/attackTypes');

let columns;
let columnNames;
let query;
let attributesColumnNames;
let hasUUID;
let hasCreatedAt;
let hasUpdatedAt;
let validateAttributes;

beforeAll(async () => {
  await knex.migrate
    .latest()
    .then(() => {
      return knex.seed.run();
    })
    .then(() => {
      // migrations are finished
      console.info('Seeder finished!');
    });
});

/**
 * Contador de atributos
 *
 * Esta función se encarga de contar la cantidad de atributos de un modelo,
 * validando si este tien ciertos atributos especiales
 *
 * @alias countAttributes
 * @param {Object} attributes - Número de atributos del modelo
 * @param {Boolean} hasUUID - tiene un UUID?
 * @param {Boolean} hasCreatedAt - tiene una fecha de creación?
 * @param {Boolean} hasUpdatedAt - tiene una fecha de actualización?
 * @returns {Object} devuelve un objeto con la cantidad total de atributos y un arreglo con sus llaves
 */
const countAttributes = (attributes, hasUUID, hasCreatedAt, hasUpdatedAt) => {
  let attributesCount = Object.keys(attributes).length;
  let attributesNames = Object.keys(attributes);
  const attributesColumnNames = [];

  for (const key in attributes) {
    if (Object.hasOwnProperty.call(attributes, key)) {
      const element = attributes[key];

      if (_.isUndefined(element.columnName)) {
        attributesNames = _.without(attributesNames, key);
        attributesCount -= 1;
      } else {
        attributesColumnNames.push(element.columnName);
      }
    }
  }

  // si el ID es un UUID ya viene en el conteo de atributos del modelo
  // si no lo es es autoincremental y debe agregarse
  if (hasUUID === false) {
    attributesCount += 1;
    attributesNames.push('id');
    attributesColumnNames.push('id');
  }

  if (hasCreatedAt === true) {
    attributesCount += 1;
    attributesNames.push('created_at');
    attributesColumnNames.push('created_at');
  }

  if (hasUpdatedAt === true) {
    attributesCount += 1;
    attributesNames.push('updated_at');
    attributesColumnNames.push('updated_at');
  }

  return { attributesCount, attributesNames, attributesColumnNames };
};

it('should list all tables', async () => {
  query = `
  SELECT
    name
  FROM
    sqlite_schema
  WHERE
    type ='table' AND
    name NOT LIKE 'sqlite_%';
  `;

  const tableNames = ['knex_migrations', 'knex_migrations_lock'];
  tableNames.push(ActionModel.tableName);
  tableNames.push(CapabilityhModel.tableName);
  tableNames.push(UserModel.tableName);
  tableNames.push(IdentityProviderModel.tableName);
  tableNames.push(UserIdentityModel.tableName);
  tableNames.push(CodeMessagesModel.tableName);
  tableNames.push(CommunicationLogModel.tableName);
  tableNames.push(ApiLogModel.tableName);
  tableNames.push(AuthModel.tableName);
  tableNames.push(EndpointModel.tableName);
  tableNames.push('auth_routes__endpoint_auths');
  tableNames.push('capability_roles__role_capabilities');
  tableNames.push(PasswordRequestModel.tableName);
  tableNames.push(ParamGroupModel.tableName);
  tableNames.push(ParamModel.tableName);
  tableNames.push(ParamLogModel.tableName);
  tableNames.push(RoleModel.tableName);
  tableNames.push(SessionModel.tableName);
  tableNames.push(TransactionModel.tableName);
  tableNames.push(TransactionEventModel.tableName);
  tableNames.push(NaturalClientFormModel.tableName);
  tableNames.push(LegalClientFormModel.tableName);
  tableNames.push(CarInsuranceRequestByNaturalClientModel.tableName);
  tableNames.push(CarInsuranceRequestByLegalClientModel.tableName);

  const tables = await knex.raw(query);

  expect(tables.length).toEqual(tableNames.length);

  tables.forEach((table) => {
    expect(table).toHaveProperty('name');
    expect(_.contains(tableNames, table.name)).toBeTruthy();
  });
});

it('should get list columns of the table params groups', async () => {
  hasUUID = false;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${ParamGroupModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(ParamGroupModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table params', async () => {
  hasUUID = false;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${ParamModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(ParamModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table params logs', async () => {
  hasUUID = false;
  hasCreatedAt = true;
  hasUpdatedAt = false;

  query = `
    pragma table_info(${ParamLogModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(ParamLogModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table actions', async () => {
  hasUUID = false;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${ActionModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(ActionModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table roles', async () => {
  hasUUID = true;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${RoleModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(RoleModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table capabilities', async () => {
  hasUUID = true;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${CapabilityhModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(CapabilityhModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table users', async () => {
  hasUUID = true;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${UserModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(UserModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table identity providers', async () => {
  hasUUID = true;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${IdentityProviderModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(IdentityProviderModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table users identities', async () => {
  hasUUID = false;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${UserIdentityModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(UserIdentityModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table code messages', async () => {
  hasUUID = true;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${CodeMessagesModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(CodeMessagesModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table communication logs', async () => {
  hasUUID = false;
  hasCreatedAt = true;
  hasUpdatedAt = false;

  query = `
    pragma table_info(${CommunicationLogModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(CommunicationLogModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table api logs', async () => {
  hasUUID = false;
  hasCreatedAt = true;
  hasUpdatedAt = false;

  query = `
    pragma table_info(${ApiLogModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(ApiLogModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table auths', async () => {
  hasUUID = false;
  hasCreatedAt = true;
  hasUpdatedAt = false;

  query = `
    pragma table_info(${AuthModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(AuthModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table capability_roles__role_capabilities', async () => {
  hasUUID = false;
  hasCreatedAt = true;
  hasUpdatedAt = false;

  query = `
    pragma table_info(${capabilitiesRolesJson.table_name})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);

  attributesLength = capabilitiesRolesJson.fields.length;
  attributesColumnNames = capabilitiesRolesJson.fields;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table password requests', async () => {
  hasUUID = false;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${PasswordRequestModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(PasswordRequestModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table transactions', async () => {
  hasUUID = true;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${TransactionModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(TransactionModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table transactions events', async () => {
  hasUUID = false;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${TransactionEventModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(TransactionEventModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table natural clients forms', async () => {
  hasUUID = true;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${NaturalClientFormModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(NaturalClientFormModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table car_insurance_requests_by_natural_clients', async () => {
  hasUUID = true;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${CarInsuranceRequestByNaturalClientModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(
    CarInsuranceRequestByNaturalClientModel.attributes,
    hasUUID,
    hasCreatedAt,
    hasUpdatedAt
  );

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table endpoints', async () => {
  hasUUID = false;
  hasCreatedAt = true;
  hasUpdatedAt = false;

  query = `
    pragma table_info(${EndpointModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(EndpointModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table sessions', async () => {
  hasUUID = true;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${SessionModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(SessionModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table auth_routes__endpoint_auths', async () => {
  hasUUID = false;
  hasCreatedAt = true;
  hasUpdatedAt = false;

  query = `
    pragma table_info(${authsRoutesJson.table_name})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);

  attributesLength = authsRoutesJson.fields.length;
  attributesColumnNames = authsRoutesJson.fields;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table car_insurance_requests_by_legal_clients', async () => {
  hasUUID = true;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${CarInsuranceRequestByLegalClientModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(
    CarInsuranceRequestByLegalClientModel.attributes,
    hasUUID,
    hasCreatedAt,
    hasUpdatedAt
  );

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});

it('should get list columns of the table legal_client_form', async () => {
  hasUUID = true;
  hasCreatedAt = true;
  hasUpdatedAt = true;

  query = `
    pragma table_info(${LegalClientFormModel.tableName})
  `;

  columns = await knex.raw(query);

  columnNames = columns.map((column) => column.name);
  validateAttributes = countAttributes(LegalClientFormModel.attributes, hasUUID, hasCreatedAt, hasUpdatedAt);

  attributesLength = validateAttributes.attributesCount;
  attributesColumnNames = validateAttributes.attributesColumnNames;

  for (const columnName of attributesColumnNames) {
    if (!_.contains(columnNames, columnName)) {
      console.info('columnName: ', columnName);
    }
  }
  expect(columns).toHaveLength(attributesLength);
  expect(columnNames).toEqual(expect.arrayContaining(attributesColumnNames));
});
