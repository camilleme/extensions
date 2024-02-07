(function(Scratch) {
  'use strict';
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This Turbo Mode example must run unsandboxed');
  }
  const vm = Scratch.vm;
  const icon = "data:image/png;base64,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class HelloWorld {";
  const opérateur = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMjUuMzU0OCIgaGVpZ2h0PSIyMjUuMzU0OCIgdmlld0JveD0iMCwwLDIyNS4zNTQ4LDIyNS4zNTQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA3LjMyMjgsLTY3LjMyMjYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMDcuMzIyODEsMTgwYzAsLTYyLjIzMDAxIDUwLjQ0NzM5LC0xMTIuNjc3NCAxMTIuNjc3NCwtMTEyLjY3NzRjNjIuMjMwMDEsMCAxMTIuNjc3NCw1MC40NDczOSAxMTIuNjc3NCwxMTIuNjc3NGMwLDYyLjIzMDAxIC01MC40NDczOSwxMTIuNjc3NCAtMTEyLjY3NzQsMTEyLjY3NzRjLTYyLjIzMDAxLDAgLTExMi42Nzc0LC01MC40NDczOSAtMTEyLjY3NzQsLTExMi42Nzc0eiIgZmlsbD0iIzU5YzA1OSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMzk0LjEzMDk3LDEzMi41MDkyN2wtMzUuMjQ3NTIsLTAuMDQ5MjNjLTAuOTQyMDgsNDEuNDQ4ODkgLTIxLjE1OTAxLDk0LjU5NzU0IDcuNDYwMzgsOTQuMjEzMzljMTAuNTAwMTgsLTAuNDQ4MTggMTEuMDYzNDgsLTE2LjA2MTEgMTAuODI1NjgsLTI2LjMwNTE4bDE5LjIyODE0LDEzLjM2NjY3YzAsMTIuNDIwOTQgLTEwLjE0MTgxLDM0Ljg1MjU0IC0zNS4xMTE3NCwzNC4wMjAyYy0xNS4xNzQwMywtMC4xMjgwNSAtMjkuNDQ4NjIsLTExLjI0NDA4IC0yOS44MzI3OCwtMzAuMTk1NjJjMC41MTIyLC0yOC40OTEzMyA2LjMwODAyLC01Ni4zMDg4OSA3Ljk3MjY3LC04NS4zNzY0NWwtMjYuMDA4NDUsLTAuNTY0MjhjLTcuNTU1LDgyLjQ2NDggLTEwLjI2NjU3LDExNS40OTYxIC0zNC41MzIyMiwxMTYuMzI4NDNjLTcuNjgzMDYsLTAuMzIwMTIgLTE0Ljc4OTg4LC01LjgyNjMyIC0xNS41NTgxOSwtMTQuNzg5ODhjLTIuMTEyODQsLTE1LjgxNDI5IDMwLjY5MjYxLC0yNS4xNTk4MSAzMS44NDUwNiwtMTAyLjI0NjQ3Yy0zMS42OTI2MSwtMy41MjE0IC0zMS44MDU0NSwxNS42ODQwMyAtMzcuMTgzNTgsMjEuNzY2NDVsLTE0LjM4NjA2LC0xLjU4NDE1YzE4Ljc2NTU4LC00NC45NDMyNiA5LjQ1ODI5LC0zOS4xMTU4NCAxNTAuNzY1MTIsLTM4LjQzMTM1eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNTljMDU5IiBzdHJva2Utd2lkdGg9IjIuNSIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjExMi42NzcxOTQ5OTk5OTk5ODoxMTIuNjc3NDA1LS0+';
  const file = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyOC40NjI1IiBoZWlnaHQ9IjI3LjciIHZpZXdCb3g9IjAsMCwyOC40NjI1LDI3LjciPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMjYuMDE5NTMsLTE2NC4xMTg3NSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbD0iIzk5NjZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9IlNhbnMgU2VyaWYiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIGZvbnQtc2l6ZT0iNDAiIHRleHQtYW5jaG9yPSJzdGFydCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjx0ZXh0IHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyNi4yNjk1MywxODUuNzY4NzUpIHNjYWxlKDAuNSwwLjUpIiBmb250LXNpemU9IjQwIiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsPSIjOTk2NmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0iU2FucyBTZXJpZiIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgdGV4dC1hbmNob3I9InN0YXJ0IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHRzcGFuIHg9IjAiIGR5PSIwIj7wn5OBPC90c3Bhbj48L3RleHQ+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTMuOTgwNDY4NzU6MTUuODgxMjQ5MjM3MDYwNTMtLT4=';

  // Credit to skyhigh173 for the idea of this
  const label = (name, hidden) => ({
    blockType: Scratch.BlockType.LABEL,
    text: name,
    hideFromPalette: hidden
  });

  let hideLegacyBlocks = true;

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This extension must run unsandboxed');
  }

class camille {
    constructor(runtime) {
      this.runtime = runtime;
    }
  getInfo() {
    return {
      // THIS MUST NEVER CHANGE
      id: 'camille',
      name: 'Camille éxtention',
        color1: '#fcb1e3',
        color2: '#ff0000',
        color3: '#ce8bb8',
        menuIconURI: icon,
        docsURI: 'https://scratch.mit.edu/studios/33543423',
      blocks: [
        // THIS MUST NEVER BE DELETED

          label('général', false),

        {
            // THESE MUST NEVER CHANGE
          // THE ARGUMENT ID "INPUT" MUST NEVER BE CHANGED OR REMOVED
            opcode: 'quandBooleanHat',
            blockType: Scratch.BlockType.HAT,
            text: 'quand [INPUT]',
            isEdgeActivated: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: 'false'
              }
            }
          },
          '---',
          {
          // THESE MUST NEVER CHANGE
          opcode: 'Camille',
          blockType: Scratch.BlockType.REPORTER,
          text: 'syteme'
          },
          {
            // THESE MUST NEVER CHANGE
            opcode: 'currentMillisecond',
            blockType: Scratch.BlockType.REPORTER,
            text: 'milliseconde actuelle'
          },
          '---',

          label('opérateur+', false),

          {
            // THESE MUST NEVER CHANGE
            opcode: 'PI',
            blockType: Scratch.BlockType.REPORTER,
            text: 'PI',
            blockIconURI: opérateur,
            disableMonitor: true
          },
          {
            // THESE MUST NEVER CHANGE
            opcode: 'e',
            blockType: Scratch.BlockType.REPORTER,
            text: 'e',
            blockIconURI: opérateur,
            disableMonitor: true
          },
          '---',
          {
            // THESE MUST NEVER CHANGE
            // THE ARGUMENT ID "INPUT" MUST NEVER BE CHANGED OR REMOVED
            opcode: 'exponent',
            blockType: Scratch.BlockType.REPORTER,
            text: '[A] ^ [B]',
            blockIconURI: opérateur,
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER
              },
              B: {
                type: Scratch.ArgumentType.NUMBER
              }
            }
          },
          {
            // THESE MUST NEVER CHANGE
            // THE ARGUMENT ID "INPUT" MUST NEVER BE CHANGED OR REMOVED
            opcode: 'equalNegative',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] =- [b]',
            blockIconURI: opérateur,
            arguments: {
              a: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '5'
              },
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '-5'
              },
            }
          },
          {
            // THESE MUST NEVER CHANGE
            // THE ARGUMENT ID "INPUT" MUST NEVER BE CHANGED OR REMOVED
            opcode: 'notEqual',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] ≠ [b]',
            blockIconURI: opérateur,
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '\n'
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '50'
              },
            }
          },
          {
            // THESE MUST NEVER CHANGE
            // THE ARGUMENT ID "INPUT" MUST NEVER BE CHANGED OR REMOVED
            opcode: 'Equal',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] = [b]',
            blockIconURI: opérateur,
            disableMonitor: true,
               hideFromPalette: hideLegacyBlocks,
            arguments: {
              a: {
                type: Scratch.ArgumentType.MATRIX,
                defaultValue: '1010101010100001010101111111111111111111'
              },
              b: {
                type: Scratch.ArgumentType.MATRIX,
                defaultValue: '1010101010100001010101'
              },
            }
          },
          {
            // THESE MUST NEVER CHANGE
            // THE ARGUMENT ID "INPUT" MUST NEVER BE CHANGED OR REMOVED
            opcode: 'ne',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] ≠ [b]',
            blockIconURI: opérateur,
            disableMonitor: true,
               hideFromPalette: hideLegacyBlocks,
            arguments: {
              a: {
                type: Scratch.ArgumentType.MATRIX,
                defaultValue: '1010101010100001010101111111111111111111'
              },
              b: {
                type: Scratch.ArgumentType.MATRIX,
                defaultValue: '1010101010100001010101111111111111111111'
              },
            }

          },
          '---',

          label('fichier', false),

          {
            // THESE MUST NEVER CHANGE
            // THE ARGUMENT ID "INPUT" MUST NEVER BE CHANGED OR REMOVED
            opcode: 'fetchFrom',
            blockType: Scratch.BlockType.REPORTER,
            text: 'lire texte de url [URL]',
                blockIconURI: file,
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://extensions.turbowarp.org/CamilleMelin-Julien/DATA CAMILLE/texte/.txt/CAMILLE.txt'
              }
            }
          },
          '---',

          label('true ou false(vrai ou faux)', false),

          {
          // THESE MUST NEVER CHANGE
          opcode: 'true',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'true'
          },
          {
          // THESE MUST NEVER CHANGE
          opcode: 'false',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'false'
          },

          label('texte+', false),

          {
            // THESE MUST NEVER CHANGE
            // THE ARGUMENT ID "INPUT" MUST NEVER BE CHANGED OR REMOVED
            opcode: 'ifString',
            blockType: Scratch.BlockType.REPORTER,
            text: 'si [BOOL] alor afficher texte [TEXT]',
            arguments: {
              BOOL: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: 'true'
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Camille'
              }
            }
          },
          {
            // THESE MUST NEVER CHANGE
            // THE ARGUMENT ID "INPUT" MUST NEVER BE CHANGED OR REMOVED
            opcode: 'boolean',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[STRING]',
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'true'
              },
            }
          },
          {
            // THESE MUST NEVER CHANGE
            // THE ARGUMENT ID "INPUT" MUST NEVER BE CHANGED OR REMOVED
            opcode: 'string',
            blockType: Scratch.BlockType.REPORTER,
            text: '[ROND]',
            arguments: {
              ROND: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
            }
          },
          {
            // THESE MUST NEVER CHANGE
            // THE ARGUMENT ID "INPUT" MUST NEVER BE CHANGED OR REMOVED
            opcode: 'bost',
            blockType: Scratch.BlockType.REPORTER,
            text: '[POITE]',
            disableMonitor: true,
               hideFromPalette: hideLegacyBlocks,
            arguments: {
              POITE: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: ''
              },
            }
          },
          {
            // THESE MUST NEVER CHANGE
            // THE ARGUMENT ID "INPUT" MUST NEVER BE CHANGED OR REMOVED
            opcode: 'booleanToInt',
            blockType: Scratch.BlockType.REPORTER,
            text: '[a]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            }
          },
          '---',

          label('avertisements', false),

          {
            // THESE MUST NEVER CHANGE
            // THE ARGUMENT ID "INPUT" MUST NEVER BE CHANGED OR REMOVED
            opcode: 'inputPromptBlock',
            blockType: Scratch.BlockType.REPORTER,
            text: 'demander [STRING]',
            disableMonitor: true,
               hideFromPalette: hideLegacyBlocks,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'The code is 1, 1, 1.. err... 1!'
              }
            }
          },
          {
            // THESE MUST NEVER CHANGE
            // THE ARGUMENT ID "INPUT" MUST NEVER BE CHANGED OR REMOVED
            opcode: 'confirmationBlock',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'confirmer [STRING]',
            disableMonitor: true,
               hideFromPalette: hideLegacyBlocks,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Are you the red spy?'
              }
            }
          },
          {
            // THESE MUST NEVER CHANGE
            // THE ARGUMENT ID "INPUT" MUST NEVER BE CHANGED OR REMOVED
            opcode: 'alertBlock',
            blockType: Scratch.BlockType.COMMAND,
            text: 'alerter [STRING]',
            disableMonitor: true,
            hideFromPalette: hideLegacyBlocks,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'A red spy is in the base!'
              }
            }
          },
          {
            // THESE MUST NEVER CHANGE
            func: 'showLegacyBlocks',
            blockType: Scratch.BlockType.BUTTON,
            text: 'plus de block',
            hideFromPalette: !hideLegacyBlocks
          },
          '---',
          {
            // THESE MUST NEVER CHANGE
            func: 'hideLegacyBlocks',
            blockType: Scratch.BlockType.BUTTON,
            text: 'moin de block',
            hideFromPalette: hideLegacyBlocks
        },
      ]
    };
    }
    // THESE MUST NEVER CHANGE
    showLegacyBlocks() {
      if (confirm('êtes vous vraiment sure de montrer plus de block')) {
        hideLegacyBlocks = false;
        Scratch.vm.extensionManager.refreshBlocks();
      } else {
        //
      }
    }

    hideLegacyBlocks() {
      hideLegacyBlocks = true;
      Scratch.vm.extensionManager.refreshBlocks();
  }
    quandBooleanHat(args) {
      return args.INPUT;

  }

    Camille () {
      const userAgent = navigator.userAgent;
      if (userAgent.includes('Windows')) {
        return 'Windows';
      } else if (userAgent.includes('Android')) {
        return 'Android';
      } else if (userAgent.includes('iPhone') || userAgent.includes('iPod') || userAgent.includes('iPad')) {
        return 'iOS';
      } else if (userAgent.includes('Linux')) {
        return 'Linux';
      } else if (userAgent.includes('CrOS')) {
        return 'ChromeOS';
      } else if (userAgent.includes('Mac OS')) {
        return 'macOS';
      }
      return 'Other';
    }

    currentMillisecond() {
      return Date.now() % 1000;
    }
  PI() {
    return '3.14';
    }
  e() {
    return '2,71';
    }
  true() {
    return 'true';
    }
  false() {
    return 'false';
    }
    ifString(args) {
      if (args.BOOL) {
        return args.TEXT;
      } else {
        return "";
      }
    }
    exponent({A, B}) {

      return Math.pow(A, B);
    }
    equalNegative(args) {
      if (isNaN(args.a) || isNaN(args.b)){
        return false;
      } else {
        return (args.a == (0 - args.b));
      }
    }
    notEqual(args){
      return (args.a != args.b);
    }
    Equal(args){
      return (args.a === args.b);
    }
    ne(args){
      return (args.a != args.b);
    }
    fetchFrom({URL}) {
      return fetch(URL).then(res => res.text())
        .catch(err => '');
    }
    boolean({STRING}){
      return STRING;
    }
    string({ROND}){
      return ROND;
    }
    bost({POITE}){
      return POITE;
    }
    booleanToInt(args){
      if (Scratch.Cast.toBoolean(args.a)) {
        return 1;
      }
      return 0;
    }

    inputPromptBlock(args) {
      return prompt(args.STRING);
      // no-op
    }

    confirmationBlock(args) {
      if (confirm(args.STRING)) {
        return true;
      } else {
        return false;
      }
      // no-op
    }

    alertBlock(args) {
      alert(args.STRING);
  }
}

Scratch.extensions.register(new camille());
})(Scratch);
