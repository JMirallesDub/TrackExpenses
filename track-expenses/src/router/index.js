import Vue from "vue";
import Router from "vue-router";
import Auth from "@okta/okta-vue";
import Hello from "@/components/Hello";

Vue.use(Auth, {
  issuer: "https://dev-714888.okta.com/oauth2/default",
  client_id: "0oa1p5tdjddRaYObs357",
  redirect_uri: "http://localhost:8080/implicit/callback",
  scope: "openid profile emal"
});

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Hello",
      component: Hello
    }
  ]
});
