export default class Currency {
    unit = "";
    name = "";

    constructor(init?: Partial<Currency>) {
        Object.assign(this, init);
    }

    get icon() {
        return require(`@/assets/crypto/icon/${this.unit.toLowerCase()}.svg`);
    }

    get iconColor() {
        return require(`@/assets/crypto/color/${this.unit.toLowerCase()}.svg`);
    }

    get iconBlack() {
        return require(`@/assets/crypto/black/${this.unit.toLowerCase()}.svg`);
    }

    get iconWhite() {
        return require(`@/assets/crypto/white/${this.unit.toLowerCase()}.svg`);
    }

    get databaseName() {
        return this.unit.toUpperCase() + "_DB";
    }
}
