<template>
    <v-container>
        <v-skeleton-loader
            v-if="!block"
            class="mx-auto my-3"
            max-width="650"
            outlined
            height="195"
            type="article"
        ></v-skeleton-loader>
        <template v-else>
            <v-row class="mx-4 my-2">
                <v-btn
                    outlined
                    :disabled="block.height === 0"
                    :to="{ name: 'BlockDetail', params: { blockHeight: block.height - 1 } }"
                    >Previous block</v-btn
                >
                <v-spacer />
                <v-btn outlined :to="{ name: 'BlockDetail', params: { blockHeight: block.height + 1 } }"
                    >Next block</v-btn
                >
            </v-row>
            <v-card class="mx-auto my-3" max-width="650" outlined>
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-4">{{ block.hash }}</div>
                        <v-list-item-title class="headline mb-1">Block #{{ block.height }}</v-list-item-title>
                        <div>
                            Mined on
                            {{ block.time | moment("dddd, MMMM Do YYYY") }}
                        </div>

                        <v-list-item-subtitle>Size {{ block.size }} bytes</v-list-item-subtitle>
                        <v-list-item-subtitle>
                            {{ block.txCount }}
                            transactions
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar tile size="40">
                        <img :src="currency.icon" alt />
                    </v-list-item-avatar>
                </v-list-item>
            </v-card>
        </template>
        <v-divider />
        <h1>Transactions:</h1>
        <pagination :query="transactionsQuery">
            <template v-slot:default="slotProps">
                <TransactionListItem :transaction="slotProps.item" />
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
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Database from "explorer-core/src/database/DAL/database/databaseStore";
import Block from "explorer-core/src/models/Block";
import Transaction from "explorer-core/src/models/Transaction";
import pagination from "@/components/pagination";
import TransactionListItem from "@/components/Transaction/TransactionListItem";
export default {
    mounted() {
        this.loadData(this.$route.params.blockHeight);
    },
    components: {
        pagination,
        TransactionListItem,
    },
    computed: {
        ...mapGetters(["currency", "findCurrency"]),
        pageBlocks() {
            return this.blocks.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
        },
    },
    beforeRouteUpdate(to, from, next) {
        this.loadData(to.params.blockHeight);
        next();
    },
    methods: {
        async loadData(height) {
            (this.block = null),
                (this.transactionsQuery = null),
                await Database.use(this.currency.databaseName).execute(async () => {
                    const tx = new Transaction();
                    tx.where("blockHeight").between(height, height);
                    this.transactionsQuery = tx;

                    this.block = await new Block()
                        .where("height")
                        .equal(height)
                        .first();
                });
        },
    },
    data() {
        return {
            block: null,
            transactionsQuery: null,
        };
    },
};
</script>

<style></style>
