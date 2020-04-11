import Currency from "../models/Currency";
import EnabledCurrencies from "../models/EnabledCurrencies";
import router from "../../router";
export default {
    state: {
        currencies: EnabledCurrencies,
        selectedCurrency: null,
    },
    mutations: {
        addCurrency(state, curr: Currency) {
            state.currencies.push(curr);
        },
        selectCurrency(state, curr: string) {
            if (curr) {
                state.selectedCurrency = this.getters.findCurrency(curr);
                router.push({ name: "Currency", params: { currency: state.selectedCurrency.unit } });
            } else {
                router.push({ name: "Home" });
                state.selectedCurrency = null;
            }
        },
    },
    actions: {
        addCurrency(context, curr: Currency) {
            context.commit("addCurrency", curr);
        },
        selectCurrency(context, curr: Currency) {
            context.commit("selectCurrency", curr);
        },
    },
    getters: {
        currencies: state => {
            return state.currencies;
        },
        currency: state => {
            return state.selectedCurrency;
        },
        findCurrency: state => (curr: string) => {
            const currToLower = curr.toLowerCase();
            return state.currencies.find(
                (c: Currency) => c.name.toLowerCase() === currToLower || c.unit.toLowerCase() === currToLower,
            );
        },
    },
};
