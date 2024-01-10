import { render, scrollTo } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Modifier | has-scrolled', function (hooks) {
  setupRenderingTest(hooks);

  test('when not scrolled', async function (assert) {
    await render(hbs`
      <div
        id="scroll-container"
        style="height: 10px; overflow-y: scroll;"
        {{has-scrolled "vertical" (fn (mut this.scrollPosition))}}
      >
        <div style="height: 20px">&nbsp;</div>
      </div>`);

    await scrollTo('#scroll-container', 0, 0);

    const { hasScrolled, hasRemainingScroll } = this.scrollPosition;

    assert.false(
      hasScrolled,
      'hasScrolled is false when scroll is at the start'
    );
    assert.true(
      hasRemainingScroll,
      'hasRemainingScroll is true when scroll is at the start'
    );
  });

  test('when scrolled halfway', async function (assert) {
    await render(hbs`
      <div
        id="scroll-container"
        style="height: 10px; overflow-y: scroll;"
        {{has-scrolled "vertical" (fn (mut this.scrollPosition))}}
      >
        <div style="height: 20px">&nbsp;</div>
      </div>`);

    await scrollTo('#scroll-container', 0, 5);

    const { hasScrolled, hasRemainingScroll } = this.scrollPosition;

    assert.true(hasScrolled, 'hasScrolled is true when scrolled halfway');
    assert.true(
      hasRemainingScroll,
      'hasRemainingScroll is true when scrolled halfway'
    );
  });

  test('when scrolled to end vertically', async function (assert) {
    await render(hbs`
      <div
        id="scroll-container"
        style="height: 10px; overflow-y: scroll;"
        {{has-scrolled "vertical" (fn (mut this.scrollPosition))}}
      >
        <div style="height: 20px">&nbsp;</div>
      </div>`);

    await scrollTo('#scroll-container', 0, 10);

    const { hasScrolled, hasRemainingScroll } = this.scrollPosition;

    assert.true(hasScrolled, 'hasScrolled is true when scrolled to end');
    assert.false(
      hasRemainingScroll,
      'hasRemainingScroll is false when scrolled to end'
    );
  });

  test('when scrolled to end horizontally', async function (assert) {
    await render(hbs`
      <div
        id="scroll-container"
        style="width: 10px; overflow-x: scroll;"
        {{has-scrolled "horizontal" (fn (mut this.scrollPosition))}}
      >
        <div style="width: 20px">&nbsp;</div>
      </div>`);

    await scrollTo('#scroll-container', 10, 0);

    const { hasScrolled, hasRemainingScroll } = this.scrollPosition;

    assert.true(hasScrolled, 'hasScrolled is true when scrolled to end');
    assert.false(
      hasRemainingScroll,
      'hasRemainingScroll is false when scrolled to end'
    );
  });

  test('react to scrolling container resize', async function (assert) {
    assert.expect(2);
    const done = assert.async();

    await render(hbs`
      <div
        id="scroll-container"
        style="height: 200px; overflow-y: scroll;"
        {{has-scrolled "vertical" (fn (mut this.scrollPosition))}}
      >
        <div style="height: 100px">&nbsp;</div>
        <div id="remove-me" style="height: 300px">&nbsp;</div>
      </div>`);

    await scrollTo('#scroll-container', 0, 200);

    const elementToRemove = document.getElementById('remove-me');
    elementToRemove.remove();

    setTimeout(() => {
      const { hasScrolled, hasRemainingScroll } = this.scrollPosition;

      assert.false(hasScrolled, 'hasScrolled is false when there is no scroll');
      assert.false(
        hasRemainingScroll,
        'hasRemainingScroll is false when there is no scroll'
      );

      done();
    }, 100);
  });
});
