<template>
    <v-container>
        <h1>Address {{$route.params.address}} transactions:</h1>
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
import pagination from "@/components/pagination";
import TransactionListItem from "@/components/Transaction/TransactionListItem";
import Transaction from "explorer-core/src/models/Transaction";
export default {
    mounted() {
        this.loadData(this.$route.params.address);
    },
    components: {
        pagination,
        TransactionListItem,
    },
    computed: {
        ...mapGetters(["currency", "findCurrency"]),
    },
    beforeRouteUpdate(to, from, next) {
        this.loadData(to.params.address);
        next();
    },
    methods: {
        async loadData(address) {
            (this.address = null),
                (this.transactionsQuery = null),
                await Database.use(this.currency.databaseName).execute(async () => {
                    const tx = new Transaction();
                    tx.where("address").between(address, address);
                    this.transactionsQuery = tx;
                });
        },
    },
    data() {
        return {
            transactionsQuery: null,
        };
    },
};
</script>

<style></style>
