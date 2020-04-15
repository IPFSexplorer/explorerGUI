<template>
    <v-card class="mx-auto my-3" max-width="650" outlined>
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">{{ transaction.txid }}</div>
                <v-list-item-title
                    class="headline mb-1"
                >Value {{ transaction.value / 100000000 }} {{ currency.unit }}</v-list-item-title>
                <div>
                    Mined on
                    {{ transaction.blockTime | moment("dddd, MMMM Do YYYY") }}
                </div>

                <v-list-item-subtitle>
                    Block
                    <router-link
                        :to="{ name: 'BlockDetail', params: { blockHeight: transaction.blockHeight } }"
                    >#{{ transaction.blockHeight }}</router-link>
                </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="40">
                <img :src="currency.icon" alt />
            </v-list-item-avatar>
        </v-list-item>

        <v-divider></v-divider>
        <v-row class="px-2">
            <v-col cols="6" class="border">
                <h3>Inputs</h3>
            </v-col>
            <v-col cols="6">
                <h3>Outputs</h3>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="px-2">
            <v-col cols="6" class="border">
                <v-row v-for="(input, i) in transaction.vin" :key="i">
                    <v-col cols="1" v-if="input.txid">B</v-col>
                    <v-col cols="7" class="overflow">
                        <router-link
                            v-if="input.isAddress"
                            :to="{name: 'Address', params: {address: input.addresses[0]}}"
                        >{{ input.addresses[0] }}</router-link>
                        <template v-else>No address</template>
                    </v-col>
                    <v-col
                        cols="4"
                        v-if="input.value"
                    >{{ input.value / 100000000 }} {{ currency.unit }}</v-col>
                </v-row>
            </v-col>
            <v-col cols="6">
                <v-row v-for="(output, i) in transaction.vout" :key="i">
                    <v-col cols="7" class="overflow">
                        <router-link
                            v-if="output.isAddress"
                            :to="{name: 'Address', params: {address: output.addresses[0]}}"
                        >{{ output.addresses[0] }}</router-link>
                        <template v-else>No address</template>
                    </v-col>
                    <v-col
                        cols="4"
                        v-if="output.value"
                    >{{ output.value / 100000000 }} {{ currency.unit }}</v-col>
                    <v-col cols="1" v-if="output.spentTxId">N</v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import Transaction from "explorer-core/src/models/Transaction";
export default {
    computed: {
        ...mapGetters(["currency"]),
    },
    props: {
        transaction: {
            type: Transaction,
        },
    },
};
</script>

<style>
.border {
    border-right: 1px solid rgba(0, 0, 0, 0.12);
}

.overflow {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>
