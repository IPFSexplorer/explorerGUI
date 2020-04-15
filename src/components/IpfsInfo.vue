<template>
    <div class="ipfs-info">
        <h1>{{ status }}</h1>
        <h2>ID: {{ id }}</h2>
        <h2>Agent version: {{ agentVersion }}</h2>
        <h3>Peers:</h3>
        <ul class="text-left">
            <li v-for="peer in peers" :key="peer">{{ peer }}</li>
        </ul>
    </div>
</template>

<script>
import PubSub from "explorer-core/src/ipfs/PubSub";
import { mapGetters } from "vuex";
import EnabledCurrencies from "../store/models/EnabledCurrencies";
import { delay } from "explorer-core/src/common";
export default {
    name: "IpfsInfo",
    computed: {
        ...mapGetters(["currency"]),
    },
    data: function() {
        return {
            status: "Connecting to IPFS...",
            id: "",
            agentVersion: "",
            peers: [],
        };
    },
    mounted: function() {
        this.getIpfsNodeInfo();
    },
    methods: {
        async getIpfsNodeInfo() {
            try {
                // Await for ipfs node instance.
                const ipfs = (await this.$ipfs).node;
                // Call ipfs `id` method.
                // Returns the identity of the Peer.
                const { agentVersion, id } = await ipfs.id();
                this.agentVersion = agentVersion;
                this.id = id;

                // Set successful status text.
                this.status = "Connected to IPFS! 🎉";
                this.updatePeers();
            } catch (err) {
                // Set error status text.
                this.status = `Error: ${err}`;
            }
        },
        async updatePeers() {
            // eslint-disable-next-line no-constant-condition
            while (true) {
                this.peers = (await (await this.$ipfs).node.swarm.peers()).map(p => p.addr.toString());

                await delay(2000);
            }
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
