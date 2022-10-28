import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Modifier from 'ember-modifier';

const DIRECTIONS = {
  vertical: 'scrollTop',
  horizontal: 'scrollLeft',
};

export default class HasScrolledModifier extends Modifier {
  @service resizeObserver;

  didInstall() {
    this.element.addEventListener('scroll', this.handleScroll);
    this.resizeObserver.observe(this.element, this.handleResize);
  }

  willRemove() {
    this.element.removeEventListener('scroll', this.handleScroll);
    this.resizeObserver.unobserve(this.element, this.handleResize);
  }

  @action
  handleScroll(event) {
    const [direction, callback] = this.args.positional;
    const property = DIRECTIONS[direction];

    callback(event.target[property] > 0);
  }

  @action
  handleResize(entry) {
    const scrollableContainer = entry?.target;

    if (scrollableContainer) {
      scrollableContainer.dispatchEvent(new Event('scroll'));
    }
  }
}
