"use strict";

module.exports = {
	name: "conferences",

	settings: {},
	dependencies: [],
	actions: {
		list: {
			rest: {
				method: "GET",
				path: "/list",
			},
			async handler(ctx) {
				const cachedTickets = {
					techtrain: 777,
					heisenbug: 777,
					jpoint: 777,
					cpp: 777,
					mobius: 777,
					holyjs: 777,
				};
				const conferences = await this.broker.call(
					"db-conferences.list",
					ctx.params,
					{ retries: 3 }
				);
				const tickets = await this.broker
					.call("tickets.stats", ctx.params, {
						retries: 1,
						fallbackResponse: () => cachedTickets,
					})
					.catch((err) => cachedTickets);

				return {
					...conferences,
					rows: conferences.rows.map((conference) => ({
						...conference,
						tickets: tickets[conference.slug],
					})),
				};
			},
		},
	},
	events: {},
	methods: {},
	created() {},
	async started() {},
	async stopped() {},
};
