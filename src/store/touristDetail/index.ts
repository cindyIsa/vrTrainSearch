import { personType } from '../../assets/files/personType'
export interface personDetail {
    touristValue: personType
    withPet: number
    withBycicle: number
}

export default {
    namespaced: true,
    state: {
        tourists: [
            {
                touristValue: personType.adult,
                withPet: 0,
                withBycicle: 0,
            },
        ],
    },

    actions: {},
    mutations: {
        UPDATE_NEW_PERSON: (
            state: { tourists: personDetail[] },
            value: personDetail[]
        ) => {
            state.tourists = [...value]
        },
    },
    getters: {
        getDetailNumber: (state: { tourists: personDetail[] }) => {
            return state.tourists.length
        },
        getNumberByTag:
            (state: { tourists: personDetail[] }) =>
            (param: 'withPet' | 'withBycicle') => {
                let num = 0
                state.tourists.forEach((d) => {
                    num += d[param]
                })
                return num
            },
    },
}
