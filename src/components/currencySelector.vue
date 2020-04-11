<template>
    <v-select
        dense
        class="currencySelect"
        hide-details
        clearable
        :items="currencies"
        item-value="unit"
        item-text="name"
        @change="currencySelected"
        label="Currency"
        :menu-props="{ offsetY: true }"
        outlined
    >
        <template v-slot:selection="{ item }">
            <img
                :src="item.iconColor"
                class="mr-3 selectedCurrencyIcon"
            />
            {{ item.name }}
        </template>

        <template v-slot:item="{ item }">
            <v-list-item dense class="">
                <v-list-item-action>
                    <img :src="item.iconColor" />
                </v-list-item-action>
                <v-list-item-content
                    >{{ item.name }}
                </v-list-item-content>
            </v-list-item>
            <v-divider class=""></v-divider>
        </template>
    </v-select>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "CurrencySelector",
    computed: {
        ...mapGetters(["currencies", "findCurrency"]),
    },
    methods: {
        ...mapActions(["addCurrency", "selectCurrency"]),
        currencySelected(curr) {
            this.$store.commit("selectCurrency", curr);
        },
    },
};
</script>

<style scoped>
.selectedCurrencyIcon {
    height: 25px;
}

.currencySelect {
    max-width: 250px;
}
</style>
