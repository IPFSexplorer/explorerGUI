import IPFSconnector from "explorer-core/src/ipfs/IPFSConnector";
import { browserConfigAsync } from "explorer-core/src/ipfs/ipfsDefaultConfig";

const plugin = {
    install(Vue, opts = {}) {
        IPFSconnector.setConfig(browserConfigAsync());
        Vue.prototype.$ipfs = IPFSconnector.getInstanceAsync();
    },
};

// Auto-install
if (typeof window !== "undefined" && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;
