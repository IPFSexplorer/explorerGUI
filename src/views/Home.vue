<template>
    <h1>Welcome to explorer. Please choose currency in top menu</h1>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "Home",
    components: {},
    computed: {
        ...mapGetters(["currency"]),
    },
    data() {
        return {};
    },
};
</script>
