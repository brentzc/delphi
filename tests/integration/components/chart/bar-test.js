import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | chart/bar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('bar', {
      age: 37,
      imminent_death_chance: 0.174,
      years_left: 43.5,
      meta: {
        race: 'all',
        gender: 'all'
      }
    });
    this.set('index', 1);
    this.set('openTooltip', () => {
      assert.ok(true);
    });
    this.set('closeTooltip', () => {
      assert.ok(true);
    });
    await render(hbs`
      <Chart::Bar
        @bar={{this.bar}}
        @index={{this.index}}
        @openTooltip={{this.openTooltip}}
        @closeTooltip={{this.closeTooltip}}
      />
    `);

    const rect = this.element.querySelector('rect');
    assert.ok(rect);
  });
});
