// tile data class constructor
function tileData(x, y) {
    this.tileData = {
        x: x,
        y: y,

        contents: '',
        entity: '',

        enter: function(thing) {
            this.entity = thing.nameInTile;

            return this;
        },

        leave: function(footPrint) {
            switch (footPrint) {
                case "closed":
                    this.contents = 'WallTile';
                    this.view.color('silver');
                    break;
                case "closed-damaging":
                    this.contents = 'WeakDangerTile';
                    this.view.color('#FF6969') // pink
                    break;
                case "closed-deadly":
                    this.contents = 'StrongDangerTile';
                    this.view.color('red');
                    break;
                default:
                    this.contents = '';
                    break;
            }
            this.entity = '';

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

            return this;
        },

        activate: function() {
            if (this.contents != 'Switch') {
                return this;
            }

            this.isOn = false;
            this.view.color('aqua', 0.5);
            this.switchGate.view.color('purple', 0.5);
            this.switchGate.contents = config('switchGatesAfter').tileType;

            return this;
        },

        setSwitchGate: function() {
            this.view.color('purple');
            this.contents = config('switchGatesBefore').tileType;

            return this;
        },

        setScanTile: function () {
            this.view.color(config('scanTile').firstColor);
            this.contents = config('scanTile').firstEffect;
            this.scanProgress = 0;

            return this;
        },

        setScannedTile: function () {
            this.view.color(config('scanTile').secondColor);
            this.contents = config('scanTile').secondEffect;

            return this;
        }
    };

    return this.tileData;
}
