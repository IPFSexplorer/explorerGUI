<template>
    <v-layout column fill-height align-content-start>
        <v-row class="text-center">
            <v-card class="mx-auto width100" max-width="650">
                <v-layout align-content-center justify-center class="my-3">
                    <div class="mx-5">
                        <h3>Conditions:</h3>
                        <ul class="text-left">
                            <li>greatherThan</li>
                            <li>lessThan</li>
                            <li>equal</li>
                            <li>between</li>
                        </ul>
                    </div>
                    <div class="mx-5">
                        <h3>Resolvers:</h3>
                        <ul class="text-left">
                            <li>all</li>
                            <li>first</li>
                            <li>take</li>
                            <li>paginate</li>
                            <li>iterate</li>
                        </ul>
                    </div>
                    <div class="mx-5">
                        <h3>Other:</h3>
                        <ul class="text-left">
                            <li>save</li>
                            <li>skip</li>
                            <li>filter</li>
                            <li>or</li>
                            <li>and</li>
                        </ul>
                    </div>
                </v-layout>
                <div class="code pa-4 width100">
                    <h2>Write query</h2>
                    <prism-editor v-model="code" language="js"></prism-editor>
                    <v-card-actions>
                        <v-btn outlined class="mx-auto" :disabled="loading" @click="runQuery">Execute</v-btn>
                    </v-card-actions>
                </div>
            </v-card>
        </v-row>
        <Loader v-if="loading" class="mx-auto" />
        <v-row class="text-center">
            <div class="code pa-4 width100">
                <v-card class="elevation-3">
                    <code class="result" v-if="result">{{ result }}</code>
                </v-card>
            </div>
        </v-row>
    </v-layout>
</template>

<script lang="ts">
import "prismjs";
import "prismjs/themes/prism.css";
import PrismEditor from "vue-prism-editor";
import Loader from "@/components/Loader.vue";
import Block from "explorer-core/src/models/Block";
import Transaction from "explorer-core/src/models/Transaction";
import InputsOutputs from "explorer-core/src/models/InputsOutputs";

export default {
    components: {
        "prism-editor": PrismEditor,
        Loader,
    },
    data() {
        return {
            loading: false,
            code: `return await new this.Transaction()
                .where("value")
                .greatherThan(5)
                .take(5);`,
            result: "",
        };
    },
    methods: {
        async runQuery() {
            this.loading = true;
            this.result = "";
            try {
                console.log((this.result = await this.evalWithContext(this.$data.code)));
            } catch (error) {
                this.result = error;
                throw error;
            } finally {
                this.loading = false;
            }
        },

        evalWithContext(code) {
            return function(code) {
                return eval("(async () => {" + code + "})()");
            }.call(
                {
                    Block,
                    Transaction,
                    InputsOutputs,
                },
                code,
            );
        },
    },
};
</script>

<style scoped>
.height100 {
    height: 100%;
}

.width100 {
    width: 100%;
}

.result {
    text-align: left;
    white-space: pre;
    width: 100%;
}

.resultsCont {
    height: 100%;
    overflow: auto;
    text-align: left;
}
.code {
    display: block;
    overflow: auto;
    height: 100%;
    width: 100%;
}
</style>

<style>
code {
    box-shadow: none !important;
}
</style>
