import { createStore } from 'vuex'
export default createStore({
    state() {
        return {
            // Default URL
            defaultURL: 'https://127.0.0.1:8000',

            //defaultURL: 'https://intranet.whowins.fun',
            // Home
            // Don't fetch if already fetched
            allfights: [],
            nextFights: [],
            isInitialized: false,
            // Keep the same Fighter cards at the same place
            currentKey: 0,
            isInversed: false,
            // Menu
            isMenuActive: false,
        };
    },
    mutations: {
    }
});
