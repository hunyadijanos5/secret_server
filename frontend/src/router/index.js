import Vue from 'vue';
import Router from 'vue-router';
import CreateSecret from '../components/CreateSecret.vue';
import ViewSecret from '../components/ViewSecret.vue';
import ListSecrets from '../components/ListSecrets.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/create',
      name: 'CreateSecret',
      component: CreateSecret,
    },
    {
      path: '/view/:hash',
      name: 'ViewSecret',
      component: ViewSecret,
    },
    {
      path: '/list',
      name: 'ListSecrets',
      component: ListSecrets,
    },
  ],
});
