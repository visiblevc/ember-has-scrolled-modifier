import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Modifier from 'ember-modifier';

const DIRECTIONS = {
  vertical: 'scrollTop',
  horizontal: 'scrollLeft',
};

export default class HasScrolledModifier extends Modifier {
  @service resizeObserver;

  element;
  property;
  callback;

  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, this.cleanup);
  }

  modify(element, [direction, callback]) {
    this.element = element;
    this.property = DIRECTIONS[direction];
    this.callback = callback;

    element.addEventListener('scroll', this.handleScroll);
    this.resizeObserver.observe(element, this.handleResize);
  }

  cleanup = () => {
    this.element.removeEventListener('scroll', this.handleScroll);
    this.resizeObserver.unobserve(this.element, this.handleResize);
  };

  @action
  handleScroll(event) {
    this.callback(event.target[this.property] > 0);
  }

  @action
  handleResize(entry) {
    const scrollableContainer = entry?.target;

    if (scrollableContainer) {
      scrollableContainer.dispatchEvent(new Event('scroll'));
    }
  }
}
