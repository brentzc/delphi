import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | ui/drop-down', function(hooks) {
  setupRenderingTest(hooks);

  test('it should render each provided option and a label', async function(assert) {
    this.set('label', 'Lorem Ipsum');
    this.set('options', [ 'Foo', 'Bar', 'Baz' ]);

    await render(hbs`<Ui::DropDown @label={{this.label}} @options={{this.options}} />`);

    const options = this.element.querySelectorAll('option');
    const optionsText = [];

    options.forEach(option => optionsText.push(option.textContent));
    assert.deepEqual(optionsText, this.options);

    const label = this.element.querySelector('label');
    assert.equal(label.textContent.trim(), this.label);
  });
});
