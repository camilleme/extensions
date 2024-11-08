(function(Scratch) {
    'use strict';
    var variriablemonitor;
    document.createElement("style");
class stcont {
    getInfo() {
      return {
        id: 'stage_controls_variables',
        name: 'It works!',
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'styles'
          },
          {
            opcode: 'setstyles',
            blockType: Scratch.BlockType.COMMAND,
            text: 'styles'
          },
        ],
        menus: {
            COLOR_MENU: {
              acceptReporters: false,
              items: [
                'variable',
                'variable value',
                'variable text',
                'variable value text',
                'efggjh',
              ]
            }
          }    
      };
    }
  
    setstyles() {
      
    }
  }
  
  Scratch.extensions.register(new stcont());
  })(Scratch);