import { render, scrollTo } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Modifier | has-scrolled', function (hooks) {
  setupRenderingTest(hooks);

  test('returns start when not scrolled', async function (assert) {
    await render(hbs`
      <div
        id="scroll-container"
        style="height: 10px; overflow-y: scroll;"
        {{has-scrolled "vertical" (fn (mut this.hasScrolled))}}
      >
        <div style="height: 20px">&nbsp;</div>
      </div>`);

    assert.equal(this.hasScrolled, 'start', 'scroll is at the start');
  });

  test('returns middle when scrolled halfway', async function (assert) {
    await render(hbs`
      <div
        id="scroll-container"
        style="height: 10px; overflow-y: scroll;"
        {{has-scrolled "vertical" (fn (mut this.hasScrolled))}}
      >
        <div style="height: 20px">&nbsp;</div>
      </div>`);

    await scrollTo('#scroll-container', 0, 5);

    assert.equal(this.hasScrolled, 'middle', 'scroll is at the middle');
  });

  test('react to vertical scrolling', async function (assert) {
    await render(hbs`
      <div
        id="scroll-container"
        style="height: 10px; overflow-y: scroll;"
        {{has-scrolled "vertical" (fn (mut this.hasScrolled))}}
      >
        <div style="height: 20px">&nbsp;</div>
      </div>`);

    await scrollTo('#scroll-container', 0, 10);

    assert.equal(
      this.hasScrolled,
      'end',
      'scrolling reflected in the variable'
    );
  });

  test('react to horizontal scrolling', async function (assert) {
    await render(hbs`
      <div
        id="scroll-container"
        style="width: 10px; overflow-x: scroll;"
        {{has-scrolled "horizontal" (fn (mut this.hasScrolled))}}
      >
        <div style="width: 20px">&nbsp;</div>
      </div>`);

    await scrollTo('#scroll-container', 10, 0);

    assert.equal(
      this.hasScrolled,
      'end',
      'scrolling reflected in the variable'
    );
  });

  test('react to scrolling container resize', async function (assert) {
    assert.expect(1);
    const done = assert.async();

    await render(hbs`
      <div
        id="scroll-container"
        style="height: 200px; overflow-y: scroll;"
        {{has-scrolled "vertical" (fn (mut this.hasScrolled))}}
      >
        <div style="height: 100px">&nbsp;</div>
        <div id="remove-me" style="height: 300px">&nbsp;</div>
      </div>`);

    await scrollTo('#scroll-container', 0, 200);

    const elementToRemove = document.getElementById('remove-me');
    elementToRemove.remove();

    setTimeout(() => {
      assert.equal(
        this.hasScrolled,
        'none',
        'updates the variable when scrolling container is resized'
      );
      done();
    }, 100);
  });
});
