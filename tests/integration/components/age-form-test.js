import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | age-form', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a number input and two select inputs', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<AgeForm />`);

    const dropDowns = this.element.querySelectorAll('select');
    assert.equal(dropDowns.length, 2);

    const input = this.element.querySelectorAll('input');
    assert.equal(input.length, 1);
  });

  test('it should throw an error if the user has not entered an age', async function(assert) {
    await render(hbs`<AgeForm />`);

    await click('#submit-button');

    const error = this.element.querySelector('#form-error');
    assert.ok(error);
    assert.equal(error.textContent, 'Invalid Age');
  });

  test('it should throw an error if the user doesnt enter a number', async function(assert) {
    await render(hbs`<AgeForm />`);

    await fillIn('.text-input', 'aaa');
    await click('#submit-button');

    const error = this.element.querySelector('#form-error');
    assert.ok(error);
    assert.equal(error.textContent, 'Invalid Age');
  });
});
