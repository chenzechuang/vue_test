import { loginByUserName, getUserInfo, logout } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    code: "",
    name: "",
    status: "",
    token: getToken(),
    avatar: "",
    introduction: "",
    roles: [],
    setting: {
      articlePlatform: []
    }
  },
  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    }
  },
  actions: {
    LoginByUserName({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginByUserName(username, userInfo.password)
          .then(response => {
            const data = response.data;
            if (data) {
                commit("SET_TOKEN", data.token);
                setToken(data.token);
                resolve();
            } else {
                reject("该账号尚未注册！");
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then(response => {
            if (!response.data) {
              reject("Verification failed, please login again.");
            }
            const data = response.data;
            if (data.roles && data.roles.length) {
              commit("SET_ROLES", data.roles);
            } else {
              reject("getInfo: roles must be a non-null array!");
            }
            commit("SET_NAME", data.name);
            commit("SET_AVATAR", data.avatar);
            commit("SET_INTRODUCTION", data.introduction);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    }
  }
};
export default user;
