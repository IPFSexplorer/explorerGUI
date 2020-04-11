<template>
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

        <v-card-actions>
            <v-btn depressed :to="{ name: 'BlockDetail', params: { blockHeight: block.height } }">See detail</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import Block from "explorer-core/src/models/Block";
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["currency"]),
    },
    props: {
        block: {
            type: Block,
        },
    },
};
</script>

<style></style>
