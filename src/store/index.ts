import { createStore } from 'vuex'
import touristDetail from './touristDetail'
import ticket from './ticket'

export default createStore({
    modules: { touristDetail, ticket },
})
