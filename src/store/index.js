import { createStore } from 'vuex'
export default createStore({
    state() {
        return {
            allfights: [],
            nextFights: [],
            isInitialized: false
        };
    },
    mutations: {
    }
});