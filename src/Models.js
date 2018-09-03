export class BlockSpec {
}

export class AmpSpec extends BlockSpec {

    constructor(_block) {
        super(_block);
        this.block = _block;
        this.properties = [];
        for (var attr in _block) {
            this.properties.push({"name":attr,"value":_block[attr]});
        }
    }

    getProperties() {
        return this.properties;
    }

}

export class UnspecifiedBlockSpec extends BlockSpec {
    constructor(_block) {
        super(_block);
        this.name = _block["@model"];
        for (var x in _block) {
            this[x] = _block[x];
        }
    }

}

export class SpecifiedBlockSpec extends BlockSpec {
    constructor(_block, _spec) {
        super(_block);
        this.spec = _spec;
        this.name = _spec.name;
        for (var x in _block) {
            this[x] = _block[x];
        }
    }

}

export class SpecManager {
    createBlock(model) {
        var _spec = this.blockSpecs[model];
        if (_spec) {
            return new SpecifiedBlockSpec(model, _spec);
        } else {
            return new UnspecifiedBlockSpec(model);
        }
    }
    constructor() {
        this.blockSpecs = {
            "HD2_AmpPlacaterDirty" : {
                "name":"Placater Dirty"
            }
        }
    }
}

