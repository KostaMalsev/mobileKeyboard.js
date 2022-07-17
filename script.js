// . - most used everywhere (JS, CSS, HTML)

// % - CSS sizes
// # - Markdown, CSS IDs, JS IDs
// @ - CSS animations and media queries, comments (eg. //@@TODO)
// $ - String placement in JS, Python
// ^ - very small quantity in some files. last screen placement

// multiline tab when selection exists
// keyboard changes depending on file

// at this point, it's pretty clear what programming languages can and can't use. so unless you want to revolutionize, the languages and frameworks I've sought out only usually use combinations of these characters.

// most languages use some characters more than others.


const body = document.body;

body.ontouchstart = '';


const textarea = document.querySelector('.textarea');

textarea.addEventListener('click', (e) => {
  //console.log(document.caretRangeFromPoint(e.clientX, e.clientY));
  window.requestAnimationFrame(() => {
    textarea.removeAttribute('readonly');
    textarea.focus();
    keyboard.classList.add('visible');
    
    window.requestAnimationFrame(() => {
      document.documentElement.scrollTo(0.00001, 0.00001);
    });
  });
});

textarea.addEventListener('touchend', (e) => {
  if (textarea !== document.activeElement) {
    keyboard.classList.add('visible');
  }
});

textarea.addEventListener('blur', (e) => {
  textarea.setAttribute('readonly', 'true');
});


const keyboard = document.querySelector('.keyboard');

const footerRow = keyboard.querySelector('.row.footer');

const letterScreen = keyboard.querySelector('.letter-screen');
const charScreen = keyboard.querySelector('.char-screen');

let visibleScreen = keyboard.querySelector('.screen.visible');

let keys = keyboard.querySelectorAll('.key');


keyboard.addEventListener('click', () => {
  textarea.focus();
});

addKeyListeners(keys);


let keyboardRows = keyboard.querySelectorAll('.row');

keyboardRows.forEach(row => {
  row.querySelectorAll('.key').forEach((key, index, keys) => {
    key.style.zIndex = keys.length - index;
  });
});


function addKeyListeners(keys) {

  keys.forEach(key => {

    key.addEventListener('touchstart', () => {

      if (key.classList.contains('icon-key')) {

        if (key.classList.contains('backspace')) {

          deleteCurrentSelection();

        } else if (key.classList.contains('shift')) {

          key.classList.toggle('on');

          if (key.classList.contains('on')) {

            keys.forEach(key => {

              if (key.classList.value === 'key') {

                const letter = key.querySelector('.letter');
                letter.textContent = letter.textContent.toUpperCase();

              }

            });

          } else {

            keys.forEach(key => {

              if (key.classList.value === 'key') {

                const letter = key.querySelector('.letter');
                letter.textContent = letter.textContent.toLowerCase();

              }

            });

          }

        }

      } else if (key.classList.contains('label-key')) {

        if (key.classList.contains('space')) {

          type(' ');

        } else if (key.classList.contains('return')) {

          type('\n');

        } else if (key.classList.contains('screen-switch')) {

          if (visibleScreen === letterScreen) {

            showScreen(charScreen);

          } else {

            showScreen(letterScreen);

          }

        }

      } else {

        const letter = key.querySelector('.letter').textContent;

        type(letter);

      }

    });

    key.addEventListener('touchstart', () => {
      key.classList.add('active');
    });

    key.addEventListener('touchend', () => {
      key.classList.remove('active');
    });

  });

}


function type(text) {

  textarea.focus();

  const startPos = textarea.selectionStart,
        endPos = textarea.selectionEnd;

  if (startPos > endPos) {
    const endPoss = endPos;
    endPos = startPos;
    startPos = endPoss;
  }

  textarea.value = textarea.value.slice(0, startPos) + text + textarea.value.slice(startPos);

  window.requestAnimationFrame(() => {

    textarea.removeAttribute('readonly');
    textarea.focus();
    textarea.setSelectionRange(startPos + text.length, startPos + text.length);

  });
  
}


function deleteCurrentSelection() {

  textarea.focus();

  let startPos = textarea.selectionStart,
        endPos = textarea.selectionEnd;

  if (startPos > endPos) {
    const endPoss = endPos;
    endPos = startPos;
    startPos = endPoss;
  }
  
  if (startPos === endPos) {
    startPos--;
  }
    
  textarea.value = textarea.value.slice(0, startPos) + textarea.value.slice(endPos);

  window.requestAnimationFrame(() => {

    textarea.removeAttribute('readonly');
    textarea.focus();
    textarea.setSelectionRange(startPos, startPos);

  });
  
}


function showScreen(screen) {
  
  visibleScreen.classList.remove('visible');
  screen.classList.add('visible');
  
  visibleScreen = screen;
  
}


/*
function playClickSound() {
  
  const keyboardClickSound = new Audio('https://assets.codepen.io/3537853/keyboard-click-ios.mp3');
  
  keyboardClickSound.currentTime = 0;
  keyboardClickSound.volume = 0.5;
  keyboardClickSound.play();
  
}
*/

