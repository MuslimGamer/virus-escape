// tile data class constructor
function tileData(x, y) {
    this.tileData = {
        x: x,
        y: y,

        contents: '',

        enter: function(thing) {
            this.contents = thing.nameInTile;

            return this;
        },

        leave: function() {
            switch (config('walkedTileSetting')) {
                case "open":
                    this.contents = '';
                    break;
                case "closed":
                    this.contents = 'WallTile';
                    this.view.color('silver');
                    break;
                case "closed-deadly":
                    this.contents = 'WeakDangerTile';
                    this.view.color('silver');
                    break;
            }

            return this;
        },

        setView: function(view) {
            this.view = view;

            return this;
        },

        setWeakDangerTile: function() {
            this.view.color('red');
            this.contents = 'WeakDangerTile';

            return this;
        },

        setStrongDangerTile: function() {
            this.view.color('maroon');
            this.contents = 'StrongDangerTile';
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
        }


    };
    
    return this.tileData;
}
