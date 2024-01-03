export abstract class GenericElement {
    isFav: boolean

    constructor() {
        this.isFav = false
    }

    markAsFav(): boolean {
        if (!this.isFav) {
            this.isFav = true;
            return true;
        } else return false;
    }

    unmarkAsFav(): boolean {
        if (this.isFav) {
            this.isFav = false;
            return true;
        } else return false;
    }

    toJSON(): Object {
        return {
            isFav: this.isFav
        }
    }
}