<template>
    <div>
        <template v-for="i in noMoreItems ? lastPageSize : pageSize">
            <slot v-if="!pageitems[i - 1]" name="loader">
                <v-skeleton-loader
                    class="mx-auto my-3"
                    :max-width="maxWidth"
                    outlined
                    height="195"
                    type="article"
                ></v-skeleton-loader>
            </slot>

            <slot v-else v-bind:item="pageitems[i - 1]"> </slot>
        </template>

        <v-card :max-width="maxWidth" class="mx-auto" outlined>
            <v-row class="mx-4 my-2">
                <v-btn outlined :disabled="page <= 1" @click="previousPage">Previous page</v-btn>
                <v-spacer />
                <v-btn outlined :disabled="noMoreItems" @click="nextPage">Next page</v-btn>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Database from "explorer-core/src/database/DAL/database/databaseStore";
import Queriable from "explorer-core/src/database/DAL/query/queriable";
export default {
    computed: {
        pageitems() {
            return this.items.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
        },
        ...mapGetters(["currency"]),
    },
    props: {
        maxWidth: {
            type: Number,
            default: 650,
        },
        pageSize: {
            type: Number,
            default: 10,
        },
        query: {
            type: Queriable,
            default: null,
        },
    },
    watch: {
        async query(newQuery) {
            console.log("new query");
            if (!newQuery) return;
            this.items = [];
            this.page = 1;
            this.noMoreItems = false;
            await Database.use(this.currency.databaseName).execute(async () => {
                console.log("tryng to get iterator");
                this.iterator = (await newQuery.iterate())[Symbol.asyncIterator]();
                console.log("load new query");
                await this.loadData();
            });
        },
    },
    methods: {
        async loadData() {
            const tasks = [];
            for (let i = 0; i < this.pageSize; i++) {
                tasks.push(
                    (async j => {
                        const { value, done } = await this.iterator.next();
                        if (done && !this.noMoreItems) {
                            this.lastPageSize = j;
                            this.noMoreItems = true;
                            return;
                        }
                        this.$set(this.items, (this.page - 1) * this.pageSize + j, await value);
                    })(i),
                );
            }

            await Promise.all(tasks);
        },
        previousPage() {
            this.page--;
            this.noMoreItems = false;
        },
        async nextPage() {
            this.page++;
            await Database.use(this.currency.databaseName).execute(async () => {
                await this.loadData();
            });
        },
    },
    data() {
        return {
            page: 1,
            lastPageSize: 0,
            noMoreItems: false,
            iterator: null,
            items: [],
        };
    },
};
</script>

<style scoped></style>
