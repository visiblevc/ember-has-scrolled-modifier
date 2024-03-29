import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Modifier from 'ember-modifier';

const DIRECTION_TO_PROPERTY_NAMES = {
  vertical: {
    currentScroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    clientSize: 'clientHeight',
  },
  horizontal: {
    currentScroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    clientSize: 'clientWidth',
  },
};
const SCROLL_EDGE = 0;

export default class ScrollPositionModifier extends Modifier {
  @service resizeObserver;

  element;
  callback;
  propertyNames;
  scrollPosition;

  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, this.cleanup);
  }

  modify(element, [direction, callback]) {
    this.element = element;
    this.callback = callback;
    this.propertyNames = DIRECTION_TO_PROPERTY_NAMES[direction];

    element.addEventListener('scroll', this.handleScroll);
    this.resizeObserver.observe(element, this.handleResize);
  }

  cleanup = () => {
    this.element.removeEventListener('scroll', this.handleScroll);
    this.resizeObserver.unobserve(this.element, this.handleResize);
  };

  @action
  handleScroll() {
    const scrollPosition = this.#calculateScrollPosition();

    if (this.#isScrollPositionChanged(scrollPosition)) {
      this.scrollPosition = scrollPosition;
      this.callback(scrollPosition);
    }
  }

  @action
  handleResize(entry) {
    const scrollableContainer = entry?.target;

    if (scrollableContainer) {
      scrollableContainer.dispatchEvent(new Event('scroll'));
    }
  }

  #calculateScrollPosition() {
    const hasScrolled = this.#hasScrolled(this.element);
    const isAtScrollEnd = this.#isAtScrollEnd(this.element);
    const hasRemainingScroll = !isAtScrollEnd;

    return {
      hasScrolled,
      hasRemainingScroll,
    };
  }

  #hasScrolled(el) {
    const { currentScroll } = this.propertyNames;
    return el[currentScroll] > SCROLL_EDGE;
  }

  #isAtScrollEnd(el) {
    const { scrollSize, clientSize, currentScroll } = this.propertyNames;
    return el[scrollSize] - el[clientSize] - el[currentScroll] <= SCROLL_EDGE;
  }

  #isScrollPositionChanged({ hasScrolled, hasRemainingScroll }) {
    const { scrollPosition } = this;

    if (!scrollPosition) {
      return true;
    }

    return (
      scrollPosition.hasScrolled !== hasScrolled ||
      scrollPosition.hasRemainingScroll !== hasRemainingScroll
    );
  }
}
