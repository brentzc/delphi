import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | results/header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('result', {
      age: 25,
      years_left: 54.7,
      imminent_death_chance: 0.11230000000000001,
      meta: {
        age: 25,
        race: 'all',
        gender: 'all'
      }
    })
    await render(hbs`<Results::Header @result={{this.result}} />`);

    assert.equal(this.element.querySelector('h1').textContent, 'The Oracle has spoken!');
    assert.equal(this.element.querySelector('div.font-body').textContent, `You have ~${Math.round(this.result.years_left)} years left to live`)
  });
});
