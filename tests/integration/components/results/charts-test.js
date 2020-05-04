import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | results/chart-page', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
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

    await render(hbs`<Results::Chart-Page @result={{this.result}} />`);
    assert.equal('Life Expectancy By Age', this.element.querySelector('h2').textContent);
  });
});
