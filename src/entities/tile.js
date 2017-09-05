// tile class constructor
function tiledata(x, y) {
    this.tiledata = {
        x: x,
        y: y,

        walkable: true,
        contents: [],

        // check if thing is in contents
        // https://stackoverflow.com/a/18101063
        contains: function(thing) {
            return this.contents.indexOf(thing) > -1;
        },

        containsArray: function(arrayOfThings) {
            for (var i = 0; i < arrayOfThings.length; i++) {
                var thing = arrayOfThings[i];
                if (this.contains(thing)) {
                    return true;
                }
            }
            return false;
        },

        enter: function(thing) {
            this.contents.push(thing);
        },

        leave: function(thing) {
            index = this.contents.indexOf(thing);
            this.contents.splice(index, 1);
        }
    }
    
    return this;
}