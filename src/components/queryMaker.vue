<template>
    <v-row class="d-flex justify-space-between align-center queryContainer mx-auto my-3 px-3">
        Where
        <v-select
            :items="indexes"
            label="column"
            class="select"
            outlined
            v-model="column"
            :menu-props="{ offsetY: true }"
            hide-details
            dense
            clearable
        ></v-select>is
        <v-select
            clearable
            :items="comparators"
            item-text="name"
            item-value="name"
            label="comparator"
            class="select"
            v-model="comparatorName"
            outlined
            :menu-props="{ offsetY: true }"
            hide-details
            dense
        ></v-select>
        <template v-if="comparator">
            <v-text-field
                class="values"
                hide-details
                dense
                v-for="(prop, i) in comparator.props"
                :key="prop.name"
                v-model="values[i]"
                :label="prop.name"
                outlined
            ></v-text-field>
        </template>
        <div v-else class="placeholder"></div>
        <v-btn outlined :disabled="!valid" @click="execute">Execute</v-btn>
    </v-row>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import Queriable from "explorer-core/src/database/DAL/query/queriable";
import IndexMap from "explorer-core/src/database/DAL/indexMap";
import lessThan from "explorer-core/src/database/DAL/conditions/comparators/lessThan";
import greatherThan from "explorer-core/src/database/DAL/conditions/comparators/greatherThan";
import between from "explorer-core/src/database/DAL/conditions/comparators/between";
import equal from "explorer-core/src/database/DAL/conditions/comparators/equal";
import PropertyCondition from "explorer-core/src/database/DAL/conditions/propertyCondition";
import Database from "explorer-core/src/database/DAL/database/databaseStore";

export default {
    props: {
        entity: {
            type: Queriable,
        },
        defaults: {
            type: Object,
        },
    },
    mounted() {
        this.values = this.defaults.values;
        this.comparatorName = this.defaults.comparator;
        this.column = this.defaults.column;

        this.execute();
    },
    watch: {
        currency() {
            this.execute();
        },
    },
    computed: {
        ...mapGetters(["currency"]),
        valid() {
            return (
                this.comparatorName && this.column && Object.keys(this.values).length >= this.comparator.props.length
            );
        },
        comparator() {
            if (this.comparatorName) return this.comparators.find(c => c.name === this.comparatorName);
            return null;
        },
        indexes() {
            return Object.keys(IndexMap.getIndexes(this.entity).indexes);
        },
        comparators() {
            return [
                {
                    name: "less than",
                    comparator: lessThan,
                    valueMapper: v => eval(v[0]),
                    props: [
                        {
                            name: "max",
                        },
                    ],
                },
                {
                    name: "greather than",
                    comparator: greatherThan,
                    valueMapper: v => eval(v[0]),
                    props: [
                        {
                            name: "min",
                        },
                    ],
                },
                {
                    name: "between",
                    comparator: between,
                    valueMapper: v => {
                        return {
                            min: eval(v[0]),
                            max: eval(v[1]),
                        };
                    },
                    props: [
                        {
                            name: "min",
                        },
                        {
                            name: "max",
                        },
                    ],
                },
                {
                    name: "equal",
                    comparator: equal,
                    valueMapper: v => eval(v[0]),
                    props: [
                        {
                            name: "value",
                        },
                    ],
                },
            ];
        },
    },
    methods: {
        async execute() {
            await Database.use(this.currency.databaseName).execute(async () => {
                const cond = new PropertyCondition(this.column, this.entity.queryPlanner);
                cond.comparator = new this.comparator.comparator(
                    this.column,
                    this.comparator.valueMapper(this.values),
                    this.entity.queryPlanner.entityName,
                );

                this.entity.queryPlanner.addAndCondition(cond);
            });
            this.$emit("change", this.entity);
        },
    },
    data() {
        return {
            values: {},
            comparatorName: null,
            column: null,
        };
    },
};
</script>

<style scoped>
.select {
    max-width: 200px;
}

.values {
    max-width: 100px;
}

.queryContainer {
    max-width: 850px;
}

.placeholder {
    max-width: 100px;
    width: 100%;
}
</style>
