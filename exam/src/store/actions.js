export default {
    addNum({ commit, state }, id) {
        commit('REMBER_ANSWER', id);
        if (state.item < state.itemDetail.length) {
            commit('ADD_ITEMNUM', 1);
        }
    },
    initializeData({ commit }) {
        commit('INITIALIZE_DATA');
    }
}