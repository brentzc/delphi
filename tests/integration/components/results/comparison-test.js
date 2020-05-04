import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | results/comparison', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a text div comparing the users results with another demographic', async function(assert) {
    this.set('original', {
      age: 25,
      years_left: 54.7,
      meta: {
        age: 25,
        race: 'all',
        gender: 'all'
      }
    });

    this.set('row', {
      age: 25,
      years_left: 60.1,
      imminent_death_chance: 0.0413,
      meta: {
        age: 25,
        race: 'hispanic',
        gender: 'female'
      }
    });

    await render(hbs`<Results::Comparison @original={{this.original}} @row={{this.row}} />`);
    assert.equal(this.element.textContent.trim(), 'hispanic females +5.40 years');
  });
});
