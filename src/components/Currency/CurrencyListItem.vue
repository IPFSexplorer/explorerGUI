<template>
    <v-card class="mx-auto my-3" max-width="650" outlined @click="click">
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">
                    <template v-if="size > 0">Blocks {{size}}</template>
                    <template v-else>Connecting</template>
                </div>
                <v-list-item-title class="headline mb-1">{{ currency.name }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar tile size="40">
                <img :src="currency.icon" alt />
            </v-list-item-avatar>
        </v-list-item>
    </v-card>
</template>

<script lang="ts">
import Currency from "../../store/models/Currency";
import IndexMap from "explorer-core/src/database/DAL/indexMap";
import Block from "explorer-core/src/models/Block";
import Database from "explorer-core/src/database/DAL/database/databaseStore";
import { delay } from "explorer-core/src/common";
import DatabaseInstance from "explorer-core/src/database/DAL/database/databaseInstance";
export default {
    computed: {},
    props: {
        currency: {
            type: Currency,
        },
    },
    mounted() {
        this.cycle();
    },
    methods: {
        async cycle() {
            // eslint-disable-next-line no-constant-condition
            while (true) {
                await this.getBlocksCount();
                await delay(3000);
            }
        },
        async getBlocksCount() {
            if (Database.databaseByName(this.currency.databaseName))
                await Database.use(this.currency.databaseName).execute(async (db: DatabaseInstance) => {
                    const table = db.getTableByEntity(new Block());
                    if (table) this.size = db.getTableByEntity(new Block()).getPrimaryIndex().size;
                });
        },
        click() {
            this.$store.commit("selectCurrency", this.currency.unit);
        },
    },
    data() {
        return {
            size: -1,
        };
    },
};
</script>

<style></style>
