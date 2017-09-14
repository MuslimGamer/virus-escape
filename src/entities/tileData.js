// tile data class constructor
function tileData(x, y) {
    this.tileData = {
        x: x,
        y: y,

        contents: '',
        entity: '',

        enter: function(thing) {
            this.entity = thing.nameInTile;
            this.entityView = thing;

            return this;
        },

        leave: function(footPrint, allowFade) {
            switch (footPrint) {
                case "closed":
                    this.contents = 'WallTile';
                    this.view.color('silver');
                    break;
                case "closed-damaging":
                    this.contents = 'WeakDangerTile';
                    this.view.color('#FF6969'); // pink
                    break;
                case "closed-deadly":
                    this.contents = 'StrongDangerTile';
                    this.view.color('red');
                    break;
                default:
                    if (config('allowDisablingWeakDangerTiles')) {
                        this.contents = '';
                        this.view.color('blue')
                    }
                    break;
            }
            this.entity = '';
            if (allowFade) {
                this.footprintFade = 0;
            }

            return this;
        },

        resetTile: function () {
            this.view.color('blue');
            this.contents = '';

            return this;
        },

        setView: function(view) {
            this.view = view;

            return this;
        },

        setWeakDangerTile: function() {
            this.view.color('#FF6969'); // pink
            this.contents = 'WeakDangerTile';

            return this;
        },

        setStrongDangerTile: function() {
            this.view.color('red');
            this.contents = 'StrongDangerTile';

            return this;
        },

        setWinGate: function() {
            this.view.color('green');
            this.contents = 'WinGate';

            return this;
        },

        setSwitch: function(switchGate) {
            this.view.color('aqua');
            this.contents = 'Switch';
            this.isOn = true;
            this.switchGate = switchGate;
            this.numberTag = switchGate.numberTag;
            this.view.addNumberTag(this.numberTag);

            return this;
        },

        activate: function() {
            if (this.contents != 'Switch') {
                return this;
            }

            this.isOn = false;
            this.view.color('aqua', 0.5);
            this.contents = '';
            this.switchGate.view.color('purple', 0.5);
            this.switchGate.contents = config('switchGatesAfter').tileType;

            return this;
        },

        setSwitchGate: function(numberTag) {
            this.view.color('purple');
            this.contents = config('switchGatesBefore').tileType;
            this.numberTag = numberTag;
            this.view.addNumberTag(this.numberTag);

            return this;
        },

        setScanningTile: function (stage) {
            switch (stage) {
                case 1:
                    this.view.color(config('scanTile').firstColor);
                    this.contents = config('scanTile').firstEffect;
                    break;
                case 2:
                    this.view.color(config('scanTile').secondColor);
                    this.contents = config('scanTile').secondEffect;
                    break;
                case 3:
                    this.view.color(config('scanTile').thirdColor);
                    this.contents = config('scanTile').thirdEffect;
                    break;
                case 4:
                    this.view.color('blue');
                    this.contents = '';
                    break;
            }
            this.scanProgress = 0;
            
            return this;
        },

        setWallTile: function() {
            this.view.color('silver');
            this.contents = 'WallTile';

            return this;
        },

        destroyEntity: function() {
            this.entity = '';
            this.entityView.die();

            return this;
        }
    };

    return this.tileData;
}
