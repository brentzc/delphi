import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | ui/site-header', function(hooks) {
  setupRenderingTest(hooks);

  test('it should render the site title', async function(assert) {
    await render(hbs`<Ui::SiteHeader />`);

    const link = this.element.querySelector('a');
    assert.equal(link.textContent.trim(), 'Delphi');
  });
});
