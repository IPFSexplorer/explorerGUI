<template>
    <v-progress-circular :size="70" :width="7" indeterminate></v-progress-circular>
</template>
<script lang="ts">
export default {
    name: "loader",
    components: {},
    data() {
        return {
            value: "",
        };
    },
};
</script>
