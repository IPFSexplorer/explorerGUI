import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import EnabledCurrencies from "./store/models/EnabledCurrencies";
import IdentityProvider from "orbit-db-identity-provider";
import { browserConfigAsync } from "explorer-core/src/ipfs/ipfsDefaultConfig";

import IPFSconnector from "explorer-core/src/ipfs/IPFSConnector";
import Database from "explorer-core/src/database/DAL/database/databaseStore";
import VueMoment from "vue-moment";

Vue.use(VueMoment);
Vue.config.productionTip = false;

(async () => {
    IPFSconnector.setConfig(browserConfigAsync());
    const node = (await IPFSconnector.getInstanceAsync()).node;

    node.swarm.connect("/ip4/192.168.0.195/tcp/9878/ws/ipfs/QmTyBNkjGjomiJwJoDa2pGifLGsv3yaFu2benSwNGmgaQ4");
    const identity = await IdentityProvider.createIdentity({
        id: (await node.id()).id,
    });

    for (const curr of EnabledCurrencies) {
        console.log("Connect to " + curr.databaseName);
        Database.connect(curr.databaseName, identity);
    }
})();

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount("#app");
