"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
exports["default"] = {
    namespaced: true,
    state: {
        tickets: {}
    },
    actions: {
        get_ticket_from_api: function (_a, data) {
            var commit = _a.commit;
            var base_url = 'https://rata.digitraffic.fi/api/v1/live-trains/station';
            var api = base_url +
                '/' +
                data.from +
                '/' +
                data.to +
                '?departure_date=' +
                data.date;
            axios_1["default"].get(api).then(function (response) {
                var value = response.data;
                if (value.length == undefined) {
                    commit('GET_TICKET_FROM_API', value);
                    return;
                }
                var newValue = value.filter(function (ticket) {
                    return new Date(ticket.timeTableRows[0].scheduledTime).getTime() >= new Date(Date.now()).getTime();
                });
                commit('GET_TICKET_FROM_API', newValue);
            });
        }
    },
    mutations: {
        GET_TICKET_FROM_API: function (state, value) {
            state.tickets = value;
        }
    }
};
