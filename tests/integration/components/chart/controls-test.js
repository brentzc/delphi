import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | chart/controls', function(hooks) {
  setupRenderingTest(hooks);

  test('it should render two dropdown menus', async function(assert) {
    this.set('result', {
      age: 25,
      imminent_death_change: 0.1123,
      meta: {
        age: 25,
        race: 'hispanic',
        gender: 'female'
      },
      years_left: 54.7
    });

    await render(hbs`<Chart::Controls @result={{this.result}} />`);

    const selects = this.element.querySelectorAll('select');

    assert.equal(selects.length, 2);
  });
});
