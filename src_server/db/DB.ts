import * as knex from 'knex'

export const DB = knex(require('./knexfile.js'));