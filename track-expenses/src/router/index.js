import Vue from "vue";
import Router from "vue-router";
import Auth from "@okta/okta-vue";
import Hello from "../components/Hello";
import ExpenseRecordsApiService from "../services/ExpenseRecordsApiService";
import ExpenseRecords from "../components/ExpenseRecords.vue";
Vue.use(Auth, {
  issuer: "https://dev-714888.okta.com/oauth2/default",
  client_id: "0oa1p5tdjddRaYObs357",
  redirect_uri: "http://localhost:8080/implicit/callback",
  scope: "openid profile emal"
});

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Hello",
      component: Hello
    },
    {
      path: "/implicit/callback",
      component: Auth.handleCallback()
    },
    {
      path: "/expense-records",
      name: "ExpenseRecords",
      component: ExpenseRecords,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
