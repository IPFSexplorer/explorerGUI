<template>
    <v-container>
        <v-row>
            <CurrencyListItem
                v-for="currency in currencies"
                :currency="currency"
                :key="currency.unit"
            />
        </v-row>
        <ipfsInfo />
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import CurrencyListItem from "@/components/Currency/CurrencyListItem.vue";
import ipfsInfo from "@/components/IpfsInfo.vue";
export default {
    name: "Home",
    components: { ipfsInfo, CurrencyListItem },
    computed: {
        ...mapGetters(["currency", "currencies"]),
    },
    data() {
        return {};
    },
};
</script>
