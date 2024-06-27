import { Block } from "scratch-blocks";

(function (Scratch) {
  "use strict";

let enabled = false;

const audioEngine = Scratch.vm.runtime.audioEngine;
const winIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAA0GVYSWZJSSoACAAAAAoAAAEEAAEAAABAAAAAAQEEAAEAAABAAAAAAgEDAAMAAACGAAAAEgEDAAEAAAABAAAAGgEFAAEAAACMAAAAGwEFAAEAAACUAAAAKAEDAAEAAAACAAAAMQECAA0AAACcAAAAMgECABQAAACqAAAAaYcEAAEAAAC+AAAAAAAAAAgACAAIAEgAAAABAAAASAAAAAEAAABHSU1QIDIuMTAuMzQAADIwMjM6MDg6MTUgMjI6MjU6MTcAAQABoAMAAQAAAAEAAAAAAAAA+Kkp0wAAAYRpQ0NQSUNDIHByb2ZpbGUAAHicfZE9SMNAHMVfW6VFKgp2KOKQoTpZKCriqFUoQoVQK7TqYHLpFzRpSFJcHAXXgoMfi1UHF2ddHVwFQfADxNXFSdFFSvxfUmgR48FxP97de9y9A/zNKlPNngSgapaRSSWFXH5VCL4ihEEEEEVCYqY+J4ppeI6ve/j4ehfnWd7n/hz9SsFkgE8gnmW6YRFvEE9vWjrnfeIIK0sK8TnxuEEXJH7kuuzyG+eSw36eGTGymXniCLFQ6mK5i1nZUImniGOKqlG+P+eywnmLs1qts/Y9+QvDBW1lmes0R5DCIpYgQoCMOiqowkKcVo0UExnaT3r4hx2/SC6ZXBUwciygBhWS4wf/g9/dmsXJCTcpnAR6X2z7YxQI7gKthm1/H9t26wQIPANXWsdfawIzn6Q3OlrsCBjYBi6uO5q8B1zuANEnXTIkRwrQ9BeLwPsZfVMeGLoF+tbc3tr7OH0AstRV+gY4OATGSpS97vHuUHdv/55p9/cDaOdyoyaJtEEAAA14aVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOmVkNmVmMzUwLWVjZDAtNGIwZC1iZjVlLTUxOTVkZjI4YzRhYiIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmN2Y5ODViOC0yMjg3LTQxNmQtOTFjMC0zNTY3ZmQ1ZjhmMjAiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplMzk3YTJiMC0zNDJjLTQ3MWMtYmQzNi0wNjExMTI2MDQwZmEiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJMaW51eCIKICAgR0lNUDpUaW1lU3RhbXA9IjE2OTIxNTYzMTc3MjY0NjciCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zNCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjM6MDg6MTVUMjI6MjU6MTctMDU6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDIzOjA4OjE1VDIyOjI1OjE3LTA1OjAwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MzlmYmE1ZjAtZmE4OC00M2ZjLTgyMjQtMGIwYjlhMGRkZDkyIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKExpbnV4KSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMy0wOC0xNVQyMjoyNToxNy0wNTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz45jkSCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wgQAxkRVAqqdwAAAchQTFRFAAAAGn+yG4CyHICzHX2yHYC1GoC0Gn+yGn+zGoCzG3+zG3+0G4CzHICzHIC0HIGzG3+zG4CzG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zG3+zHIC0HIC0G3+zHIC0G3+zG3+zHoK2IIS5IYW5I4e8JIi9JYm+Jou/JovAJ4zBKpDFLJLHLpXKMJjNMZnOMZnPMpnPM5vQM5vRNJzSNJ3TNZ7UNp/UN5/UOJ/UOZ/VO6DVPqHVQ6HVRqLWR6PWSKPWSaPWX6rYbK/abq/ab7DadrPbd7Pce7Tcgbfdgbjdgrjdhrrfh7rfibvfirzfi7zfjLzfjLzgjb3gjr3gjr7gj77gkL7gkb/glMDhnMTjncTjoMfkosfko8jkpMjlpcnlsc/ns9HotNHoutXqvtbrv9frwNfswNjsxNrtzN/vzd/vzeDvzeDwzuDwzuHw0eLw0uPx1uXy2Oby2Ofy2efz2+jz3ur04u324+725O727vT57/X68Pb68fb68vb78vf78/f68/f79vn8+fv9+/z+/P3+/f7+////xM3NqwAAADF0Uk5TAAEBAQEBAgMDAwMDAwMDAwgIEBEcJjlUXV5panOEhY2Qra6vt8bO2Nri4+zx9PT8/cI6cjwAAAABYktHRJfmbhuvAAAC10lEQVRYw7WX51/TUBSGr4KIiIoILaMT6LDL7pG2oSPHDW4FBwpO3CiCigP3QgUB77/rbdOkCaTkpsH3Qz7c5Dy/JPeec96DUA11GM12p8cfDPo9TrvZ2IG0aIvB6grFmQxb4AC4Apth4iGX1bCNMrzd5I4wLKwRy0TcpnaK8H0WXzILisomfRY1xM4ebyoPNZVPeXubNorvdEQHYUMNRh2dteO7AmlQVTrQXSN8ty2cAwrlwrZmpfi2vlgRqFSM9bcpxA8kOKAUlxhYR2juS4AGJfpb1wBsMQ6G7r94S6FX904AF7PJ47vDRZj4hSn1cxyK4S7Z/gdyML6CqbUyDrmA5Dy0OtIwtIDx6vyTx6qaml/FeGEI0o7qZvZEAe6S+DG6P3iFECYBor1i/njJ+Z3B+B3tHnzAeJqcaq+QWZYUlAEzABc+vxk+/vzLJbjz7emhmgD+WUhZKvnvy4uLnzB+dAvjr0e+Y3xODZD38a9gSlYXn+G/l8+u4JcHP+I/p9QAkDSV4re6s9XFw9fOA5y5eQxO3j4NqoCsu5EADBHZIo3EZyMGArAywuLsUUrNCgDGSgAuVgAsL1a0xF/lEm8uLS4LANZF6n9IfC0tqnxuqAMZ43oAcSMyMyJg7uIo0QjRqIJGqpoTAYwZ2TNQ/y5Axo6crB4A60Segh5AwYP8nB4A50dB0AOAA3oBQf2foPsn6t5G3QdJcpTrAJCjLEmmOgAkmSTpXAeApLOkoGgHlAqKpKRpB5RLmu6i2igt69oAfFmXNRZtAL6xyFqbJoDQ2qTNVRNAaK58e5/G+H297b1sMCbpDcbVtQYDNYsWZ4rS4vwoWZwmucma0GKyxuQmi7d516lt3u8bxOZ1rzeaww+pjObrBwpGE+3QanW3b7bZ1mb3+/YqDQwt9ANHi76Rp+v/DV0I7VId+3r2qM2t+gbPTRh9S2pQHr4bNE3w1fF//4bj/z8IjCsoNvb7bgAAAABJRU5ErkJggg==";

/**
 * This method assumes that the caller has already requested permission to fetch the URL.
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
const fetchAsArrayBufferWithTimeout = (url) =>
  new Promise((resolve, reject) => {
    // Permission is checked in playSound()
    // eslint-disable-next-line no-restricted-syntax
    const xhr = new XMLHttpRequest();
    let timeout = setTimeout(() => {
      xhr.abort();
      reject(new Error("Timed out"));
    }, 5000);
    xhr.onload = () => {
      clearTimeout(timeout);
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error(`HTTP error ${xhr.status} while fetching ${url}`));
      }
    };
    xhr.onerror = () => {
      clearTimeout(timeout);
      reject(new Error(`Failed to request ${url}`));
    };
    xhr.responseType = "arraybuffer";
    xhr.open("GET", url);
    xhr.send();
  });

/**
 * @type {Map<string, {sound: AudioEngine.SoundPlayer | null, error: unknown}>}
 */
const soundPlayerCache = new Map();

/**
 * @param {string} url
 * @returns {Promise<AudioEngine.SoundPlayer>}
 */
const decodeSoundPlayer = async (url) => {
  const cached = soundPlayerCache.get(url);
  if (cached) {
    if (cached.sound) {
      return cached.sound;
    }
    throw cached.error;
  }

  try {
    const arrayBuffer = await fetchAsArrayBufferWithTimeout(url);
    const soundPlayer = await audioEngine.decodeSoundPlayer({
      data: {
        buffer: arrayBuffer,
      },
    });
    soundPlayerCache.set(url, {
      sound: soundPlayer,
      error: null,
    });
    return soundPlayer;
  } catch (e) {
    soundPlayerCache.set(url, {
      sound: null,
      error: e,
    });
    throw e;
  }
};

/**
 * @param {string} url
 * @param {VM.Target} target
 * @returns {Promise<boolean>} true if the sound could be played, false if the sound could not be decoded
 */
const playWithAudioEngine = async (url, target) => {
  const soundBank = target.sprite.soundBank;

  /** @type {AudioEngine.SoundPlayer} */
  let soundPlayer;
  try {
    const originalSoundPlayer = await decodeSoundPlayer(url);
    soundPlayer = originalSoundPlayer.take();
  } catch (e) {
    console.warn(
      "Could not fetch audio; falling back to primitive approach",
      e
    );
    return false;
  }

  soundBank.addSoundPlayer(soundPlayer);
  await soundBank.playSound(target, soundPlayer.id);

  delete soundBank.soundPlayers[soundPlayer.id];
  soundBank.playerTargets.delete(soundPlayer.id);
  soundBank.soundEffects.delete(soundPlayer.id);

  return true;
};

/**
 * This method assumes that the caller has already requested permission to fetch the URL.
 * @param {string} url
 * @param {VM.Target} target
 * @returns {Promise<void>}
 */
const playWithAudioElement = (url, target) =>
  new Promise((resolve, reject) => {
    // Unfortunately, we can't play all sounds with the audio engine.
    // For these sounds, fall back to a primitive <audio>-based solution that will work for all
    // sounds, even those without CORS.
    // Permission is checked in playSound()
    // eslint-disable-next-line no-restricted-syntax
    const mediaElement = new Audio(url);

    // Make a minimal effort to simulate Scratch's sound effects.
    // We can get pretty close for volumes <100%.
    // playbackRate does not have enough range for simulating pitch.
    // There is no way for us to pan left or right.
    mediaElement.volume = target.volume / 100;

    mediaElement.onended = () => {
      resolve();
    };
    mediaElement
      .play()
      .then(() => {
        // Wait for onended
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * @param {string} url
 * @param {VM.Target} target
 * @returns {Promise<void>}
 */
const playSound = async (url, target) => {
  try {
    if (!(await Scratch.canFetch(url))) {
      throw new Error(`Permission to fetch ${url} denied`);
    }

    const success = await playWithAudioEngine(url, target);
    if (!success) {
      return await playWithAudioElement(url, target);
    }
  } catch (e) {
    console.warn(`All attempts to play ${url} failed`, e);
  }
};

window.addEventListener("beforeunload", (e) => {
  if (enabled) {
    e.preventDefault();
  }
});

class camilleone {
  getInfo() {
    return {
      id: "cov",
      name: Scratch.translate("Ask Before Closing Tab"),
      blocks: [
        {
          opcode: "windowscontrols",
          blockType: Scratch.BlockType.LABEL,
          Text: "windows controls",
        },
        {
          opcode: "promptsetControl",
          blockType:  Scratch.BlockType.REPORTER,
          text: 'prompt[CAMILLE]',
          blockIconURI: winIcon,
          arguments: {
            CAMILLE: {
            type: Scratch.ArgumentType.STRING,
            defaultvalue: 'apple'
            },
          }
        },
        {
          opcode: "alertsetControl",
          blockType:  Scratch.BlockType.COMMAND,
          text: 'alert[CAMILLE]',
          blockIconURI: winIcon,
          arguments: {
            CAMILLE: {
            type: Scratch.ArgumentType.STRING,
            defaultvalue: 'apple'
            },
          }
        },
        {
          opcode: "yesnosetControl",
          blockType:  Scratch.BlockType.BOOLEAN,
          text: 'comfirm[CAMILLE]',
          blockIconURI: winIcon,
          arguments: {
            CAMILLE: {
            type: Scratch.ArgumentType.STRING,
            defaultvalue: 'apple'
            },
          }
        },
        '---',
        {
          opcode: "setControl",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate("set ask before closing tab to [OPTION]"),
          blockIconURI: winIcon,
          arguments: {
            OPTION: {
              type: Scratch.ArgumentType.STRING,
              menu: "option",
            },
          },
        },
        {
          opcode: "getControl",
          blockType: Scratch.BlockType.BOOLEAN,
          text: Scratch.translate("ask before closing tab enabled?"),
          blockIconURI: winIcon,
        },
        '---',
        {
          opcode: "Sound",
          blockType: Scratch.BlockType.LABEL,
          Text: "Sound",
        },
        '---',
        {
          opcode: "playsou",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate("start sound from url: [path]"),
          arguments: {
            path: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "https://extensions.turbowarp.org/meow.mp3",
            },
          },
        },
        {
          opcode: "playsouUntilDone",
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate("play sound from url: [path] until done"),
          arguments: {
            path: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "https://extensions.turbowarp.org/meow.mp3",
            },
          },
        },
      ],
      menus: {
        option: {
          acceptReporters: true,
          items: [
            {
              text: Scratch.translate("enabled"),
              value: "true",
            },
            {
              text: Scratch.translate("disabled"),
              value: "false",
            },
          ],
        },
      },
    };
  }

  setControl({ OPTION }) {
    enabled = Scratch.Cast.toBoolean(OPTION);
  }

  getControl() {
    return enabled;
  }
  playsou({ path }, util) {
    playSound(path, util.target);
  }

  playsouUntilDone({ path }, util) {
    return playSound(path, util.target);
  }
  promptsetControl(args){
    return prompt(args.CAMILLE)
  }
  alertsetControl(args){
    alert(args.CAMILLE)
  }
  yesnosetControl(args){
  return confirm(args.CAMILLE)
  }
}

Scratch.extensions.register(new (camilleone));
})(Scratch);