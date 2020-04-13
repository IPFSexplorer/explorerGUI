<template>
    <v-container>
        <h1>Welcome to explorer. Please choose currency in top menu</h1>
        <ipfsInfo />
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import ipfsInfo from "@/components/IpfsInfo.vue";
export default {
    name: "Home",
    components: { ipfsInfo },
    computed: {
        ...mapGetters(["currency"]),
    },
    data() {
        return {};
    },
};
</script>
