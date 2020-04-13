import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import BlockList from "../components/Block/BlockList.vue";
import BlockDetail from "../components/Block/BlockDetail.vue";
import Playground from "../views/Playground.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/currency/:currency",
        name: "Currency",
        component: BlockList,
    },
    {
        path: "/currency/:currency/block/:blockHeight",
        name: "BlockDetail",
        component: BlockDetail,
    },
    {
        path: "/playground",
        name: "Playground",
        component: Playground,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
