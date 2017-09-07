// Tile: the square unit you can walk on
Crafty.c('Tile', {
    init: function() {
        this.requires('Actor')
            .size(config('tileSize'), config('tileSize'));
        this.type = ''
    },

    setType: function(type) {
    	this.type = type
    	switch(this.type)
    	{
    		case '':
    			this.color('Blue');
    		break;
    		case 'warning': 							//Player has stepped on this tile, has gained attention of Anti-Virus. DONT STOP MOVING!
    			this.color('orange');
    				//Player has 3 seconds to escape this tile before it is scanned. 
    			//this.delay(tile.setType('danger'), 3 * 1000, 0);
    			//this.timerEvents.push(tile.setType('danger'));
    		break;
    		case 'danger': 								//This tile has been secured by the anti-virus. Touching is lethal. 
    			this.color('red')
    		break;
    		case 'trigger':                             //Firewall config file. Infect to give self permissions to take down barrier. 
    			this.color('purple')
    		break;
    		case 'trigger-closed':
    			//this.color('')
    		break;
    		case 'gate':                                //Link to next file-structure is admin restricted. Infect the local config files to bring it down.
    			this.color('green')
    		break; 
    	}

    }



});