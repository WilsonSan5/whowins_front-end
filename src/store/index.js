import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
    state() {
        return {
            // Default URL
            //defaultURL: 'https://127.0.0.1:8000',

            defaultURL: 'https://intranet.whowins.fun',
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

            //Ranking
            ranking: null
        };
    },
    mutations: {
        async getRanking() {
            try {
                const response = await axios({
                    method: 'GET',
                    url: '/api/ranking'
                })
                console.log(response)
                this.state.ranking = response.data
            } catch (error) {
                console.log(error)
            }
        }
    }
});
