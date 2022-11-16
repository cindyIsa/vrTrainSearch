import { Commit } from 'vuex'
import axios from 'axios'

export default {
    namespaced: true,
    state: {
        tickets: {},
    },
    actions: {
        get_ticket_from_api: (
            { commit }: { commit: Commit },
            data: { from: string; to: string; date: string }
        ) => {
            const base_url =
                'https://rata.digitraffic.fi/api/v1/live-trains/station'
            const api =
                base_url +
                '/' +
                data.from +
                '/' +
                data.to +
                '?departure_date=' +
                data.date
            axios.get(api).then((response) => {
                const value = response.data
                if (value.length == undefined) {
                    commit('GET_TICKET_FROM_API', value)
                    return
                }
                const newValue = value.filter(
                    (ticket: any) =>
                        new Date(
                            ticket.timeTableRows[0].scheduledTime
                        ).getTime() >= new Date(Date.now()).getTime()
                )
                commit('GET_TICKET_FROM_API', newValue)
            })
        },
    },
    mutations: {
        GET_TICKET_FROM_API: (state: { tickets: any }, value: any) => {
            state.tickets = value
        },
    },
}
