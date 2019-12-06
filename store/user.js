export const state = () => ({
    user:{}
})

export const mutations = {
    setUser(state, todo) {
        state.user = todo;
    }
}
