"use strict";

const { MoleculerRetryableError } = require("moleculer").Errors;
const DbMixin = require("../mixins/db.mixin");

/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

/** @type {ServiceSchema} */
module.exports = {
	name: "db-tickets",
	// version: 1
	mixins: [DbMixin("tickets")],
	settings: {
		// Available fields in the responses
		fields: ["_id", "slug", "timestamp"],
	},
	hooks: {
		before: {
			list(ctx) {
				// const rand = Math.random();
				// if (rand > 0.3)
				// 	throw new MoleculerRetryableError(
				// 		"DB Error",
				// 		500,
				// 		"ERR_SOMETHING"
				// 	);
			},
			/**
			 * Register a before hook for the `create` action.
			 * It sets a default value for the quantity field.
			 *
			 * @param {Context} ctx
			 */
			create(ctx) {
				ctx.params.quantity = 0;
			},
		},
	},

	/**
	 * Actions
	 */
	actions: {
		/**
		 * The "moleculer-db" mixin registers the following actions:
		 *  - list
		 *  - find
		 *  - count
		 *  - create
		 *  - insert
		 *  - update
		 *  - remove
		 */
	},

	/**
	 * Methods
	 */
	methods: {
		/**
		 * Loading sample data to the collection.
		 * It is called in the DB.mixin after the database
		 * connection establishing & the collection is empty.
		 */
		async seedDB() {
			await this.adapter.insertMany([]);
		},
	},

	/**
	 * Fired after database connection establishing.
	 */
	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
	},
};
