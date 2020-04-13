<template>
    <v-app>
        <v-app-bar app absolute color="white" elevate-on-scroll scroll-target="#mainContainer" class="mainToolbar">
            <v-toolbar-title
                ><router-link :to="{ name: 'Home' }"> IPFS blockchain explorer</router-link></v-toolbar-title
            >

            <v-spacer></v-spacer>

            <v-btn icon :to="{ name: 'Playground' }">
                <v-icon>mdi-gamepad-variant</v-icon>
            </v-btn>

            <currencySelector />
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <div id="mainContainer" class="overflow-y-auto blue-grey lighten-5">
            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <v-content>
                    <!-- If using vue-router -->
                    <router-view></router-view>
                </v-content>
            </v-container>
        </div>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import currencySelector from "@/components/currencySelector.vue";
export default Vue.extend({
    name: "App",
    components: {
        currencySelector,
    },
});
</script>

<style scoped>
#mainContainer {
    height: 100vh;
}
.mainToolbar {
    border-bottom: 1px solid #eee;
}
</style>
<style>
html {
    overflow-y: auto !important;
}
</style>
