import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | ui/input', function(hooks) {
  setupRenderingTest(hooks);

  test('it should render a text input an label', async function(assert) {
    this.set('label', 'Lorem Ipsum');
    await render(hbs`<Ui::Input @label={{this.label}} />`);

    const label = this.element.querySelector('label');
    assert.equal(this.label, label.textContent);

    const input = this.element.querySelector('input');
    assert.ok(input);
  });
});
