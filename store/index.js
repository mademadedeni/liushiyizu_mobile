export const state = () => ({
    counter: 0,
    user:{}
})

export const mutations = {
    increment(state) {
        state.counter++
    }
}

export const actions = {
    nuxtServerInit(store) {
        if (store.state.user) {
            api.get("/user/userInfo").then(res =>{
                if(res.data.success){
                    store.commit("setUser",res.data.data);
                }
            })
        }
    },
    getUser() {

    }
}
