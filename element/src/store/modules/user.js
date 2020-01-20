import { loginByUserName } from '@/api/login'
import { setToken } from '@/utils/auth';

const user = {
  state: {
    name: '',
    token: ''
  },
  mutations: {
    SET_TOKEN: function (state, token) {
      state.token = token;
    }
  },
  actions: {
    LoginByUserName({ commit }, userInfo) {
      const username = userInfo.username.trim();
      const captcha = Number(userInfo.captcha);
      return new Promise((resolve, reject) => {
        loginByUserName(username, userInfo.password, captcha)
          .then(response => {
            commit("SET_TOKEN", response.username);
            setToken(response.username);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  }
}
export default user