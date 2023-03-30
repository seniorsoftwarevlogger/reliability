"use strict";

const { MoleculerRetryableError } = require("moleculer").Errors;

/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

/** @type {ServiceSchema} */
module.exports = {
	name: "tickets",

	settings: {},
	dependencies: [],
	actions: {
		stats: {
			rest: "/stats",

			circuitBreaker: {
				enabled: true, //		Enable feature
				threshold: 0.5, //		Threshold value. 0.5 means that 50% should be failed for tripping.
				minRequestCount: 5, //	Minimum request count. Below it, CB does not trip.
				windowTime: 60, // 		Number of seconds for time window.
				halfOpenTime: 10000, // Number of milliseconds to switch from open to half-open state
				check: (err) => err && err.code >= 500, // A function to check failed requests.
			},

			async handler(ctx) {
				if (
					ctx.params.ticketsErrorRate &&
					Math.random() > 1 - parseFloat(ctx.params.ticketsErrorRate)
				)
					throw new MoleculerRetryableError(
						"Tickets stats service error",
						500,
						"ERR_TICKETS_STATS"
					);

				return {
					techtrain: 500,
					heisenbug: 500,
					jpoint: 500,
					cpp: 500,
					mobius: 500,
					holyjs: 500,
				};
			},
		},
		my: {
			rest: "/my",
			async handler(ctx) {
				return ctx.broker.call("db-tickets.list");
			},
		},
		buy: {
			rest: "/buy",
			method: "POST",
			retryPolicy: {
				enabled: true,
				retries: 3,
				delay: 500,
			},
			async handler(ctx) {
				return ctx.broker
					.call("db-tickets.insert", {
						entity: {
							slug: ctx.params.slug,
							timestamp: Date.now(),
						},
					})
					.then(
						() =>
							new Promise((resolve) => {
								setTimeout(
									() => resolve(null),
									ctx.params.dbTicketsDelay &&
										parseInt(ctx.params.dbTicketsDelay)
								);
							})
					);
			},
		},
	},
	events: {},
	methods: {},
	created() {},
	async started() {},
	async stopped() {},
};
