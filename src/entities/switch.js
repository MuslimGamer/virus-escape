// contains both the switch gate tile and the switch tile.
// SwitchGate: the de-activatable DangerTile
Crafty.c('SwitchGate', {
    init: function() {
        this.requires('TileEntity')
            .color('maroon');

        this.nameInTile = 'SwitchGate';
    },

    // i.e: will kill you
    isOn: true
})
// Switch: the de-activator
Crafty.c('Switch', {
    init: function() {
        this.requires('TileEntity')
            .color('yellow');

        this.nameInTile = 'Switch';
    },

    // i.e: activatable
    isOn: true,

    addSwitchGate: function(SwitchGate) {
        this.SwitchGate = SwitchGate;
    },

    activate: function() {
        this.SwitchGate.isOn = false;
        this.SwitchGate.color('maroon', 0.5)
        this.isOn = false;
        this.color('yellow', 0.5)
    }
}) 