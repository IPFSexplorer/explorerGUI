<template>
    <div>
        <v-card outlined class="queryMaker mx-auto">
            <queryMaker :entity="new BlockEntity()" @change="queryChanged" :defaults="defaultQuery" />
        </v-card>

        <pagination :query="query">
            <template v-slot:default="slotProps">
                <BlockListItem :block="slotProps.item" />
            </template>
            <template v-slot:loader>
                <v-skeleton-loader
                    class="mx-auto my-3"
                    max-width="650"
                    outlined
                    height="195"
                    type="article"
                ></v-skeleton-loader>
            </template>
        </pagination>
    </div>
</template>

<script>
import BlockListItem from "@/components/Block/BlockListItem";
import Block from "explorer-core/src/models/Block";
import queryMaker from "@/components/queryMaker";
import pagination from "@/components/pagination";
export default {
    components: {
        BlockListItem,
        queryMaker,
        pagination,
    },
    methods: {
        queryChanged(query) {
            this.query = query;
            console.log("query changed");
        },
    },
    data() {
        return {
            BlockEntity: Block,
            query: null,
            defaultQuery: {
                values: [Infinity],
                comparator: "less than",
                column: "height",
            },
        };
    },
};
</script>

<style scoped>
.queryMaker {
    max-width: 800px;
}
</style>
