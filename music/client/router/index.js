import Vue from 'vue';
import Router from 'vue-router';
import questionnaire from '../pages/questionnaire/questionnaire';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    components: {
        questionnaire: questionnaire,
    }
  }]
});
