"use strict";

const { MoleculerRetryableError } = require("moleculer").Errors;
const DbMixin = require("../mixins/db.mixin");

/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

/** @type {ServiceSchema} */
module.exports = {
	name: "db-conferences",
	// version: 1
	mixins: [DbMixin("conferences")],
	settings: {
		// Available fields in the responses
		fields: ["_id", "slug", "logo", "title", "description"],
	},
	hooks: {
		before: {
			list(ctx) {
				console.log("db-conferences.retry");

				if (
					ctx.params.dbErrorRate &&
					Math.random() > 1 - parseFloat(ctx.params.dbErrorRate)
				)
					throw new MoleculerRetryableError(
						"DB Error",
						500,
						"ERR_CONF_DB"
					);
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
			await this.adapter.insertMany([
				{
					slug: "techtrain",
					logo: "/techtrain.svg",
					title: "TechTrain 2023 Spring",
					description: "Фестиваль про AI для разработки и жизни",
				},
				{
					slug: "heisenbug",
					logo: "/heisenbug.svg",
					title: "Heisenbug 2023 Spring",
					description:
						"Конференция по тестированию не только для тестировщиков",
				},
				{
					slug: "jpoint",
					logo: "/jpoint.svg",
					title: "JPoint 2023",
					description: "Конференция для опытных Java‑разработчиков",
				},
				{
					slug: "cpp",
					logo: "/cpp_2023.svg",
					title: "C++ Russia 2023",
					description: "Конференция для C++ разработчиков",
				},
				{
					slug: "mobius",
					logo: "/mobius_2023_spring.svg",
					title: "HolyJS 2023 Spring",
					description: "Конференция для мобильных разработчиков",
				},
				{
					slug: "holyjs",
					logo: "/holyjs.svg",
					title: "C++ Russia 2023",
					description: "Конференция для JavaScript‑разработчиков",
				},
			]);
		},
	},

	/**
	 * Fired after database connection establishing.
	 */
	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
	},
};
