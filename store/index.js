import { api } from "~/assets/js/common/axios.js";

export const state = () => ({
    userInfo: {}
})

export const mutations = {
    setUser(state, userInfo) {
        state.userInfo = userInfo;
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }){
        // console.log(commit,req);
    },
    async getUser({ commit }) {
        await api.get("/user/userInfo").then(res => {
            commit('setUser', res.data.data)
        }).catch(err => {

        })
    },
}
