import IPFSconnector from "explorer-core/src/ipfs/IPFSConnector";
import Protector from "libp2p-pnet";

const plugin = {
    install(Vue, opts = {}) {
        IPFSconnector.setConfig({
            repo: "explorer",
            config: {
                Addresses: {
                    Swarm: [
                        "/ip4/" + window.location.hostname + "/tcp/19090/ws/p2p-websocket-star",
                        "/ip4/" + window.location.hostname + "/tcp/19091/ws/p2p-webrtc-star",
                    ],
                },
            },
            libp2p: {
                modules: {
                    connProtector: new Protector(`/key/swarm/psk/1.0.0/
/base16/
30734f1804abb36a803d0e9f1a31ffe5851b6df1445bf23f96fd3fe8fbc9e793`),
                },
                config: {
                    pubsub: {
                        emitSelf: false,
                    },
                },
            },
        });
        Vue.prototype.$ipfs = IPFSconnector.getInstanceAsync();
    },
};

// Auto-install
if (typeof window !== "undefined" && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;
