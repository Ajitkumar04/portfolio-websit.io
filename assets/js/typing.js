/**
 * =================================================================
 * DYNAMIC TYPEWRITER ANIMATION FOR HERO ROLES
 * =================================================================
 */

class TypewriterEffect {
  constructor(element, words = [], speed = 100, delay = 2000) {
    this.element = element;
    this.words = words;
    this.speed = speed;
    this.delay = delay;
    this.wordIndex = 0;
    this.txt = '';
    this.isDeleting = false;
  }

  start() {
    if (!this.element || !this.words.length) return;

    // Create cursor if not existing
    if (!this.element.querySelector('.typewriter-cursor')) {
      this.textNode = document.createElement('span');
      this.cursorNode = document.createElement('span');
      this.cursorNode.className = 'typewriter-cursor';
      this.element.appendChild(this.textNode);
      this.element.appendChild(this.cursorNode);
    }

    this.type();
  }

  type() {
    const currentWord = this.words[this.wordIndex % this.words.length];

    if (this.isDeleting) {
      this.txt = currentWord.substring(0, this.txt.length - 1);
    } else {
      this.txt = currentWord.substring(0, this.txt.length + 1);
    }

    if (this.textNode) {
      this.textNode.textContent = this.txt;
    }

    let typeSpeed = this.speed;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === currentWord) {
      typeSpeed = this.delay;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 400;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

window.TypewriterEffect = TypewriterEffect;
