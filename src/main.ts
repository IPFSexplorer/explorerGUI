import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueIpfs from "./plugins/ipfs";
import vuetify from "./plugins/vuetify";
import EnabledCurrencies from "./store/models/EnabledCurrencies";
import IdentityProvider from "orbit-db-identity-provider";
import Database from "explorer-core/src/database/DAL/database/databaseStore";
import VueMoment from "vue-moment";
import { DbSyncStrategy } from "explorer-core/src/database/DAL/database/DbConnectOptions";

Vue.use(VueMoment);
Vue.use(VueIpfs);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount("#app");

Vue.prototype.$ipfs.then(async ipfs => {
    const node = ipfs.node;

    const identity = await IdentityProvider.createIdentity({
        id: (await node.id()).id,
    });

    for (const curr of EnabledCurrencies) {
        console.log("Connect to " + curr.databaseName);
        Database.connect(curr.databaseName, identity, { syncStrategy: DbSyncStrategy.replace });
    }
});
