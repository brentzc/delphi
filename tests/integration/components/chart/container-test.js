import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | chart/container', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a bar chart from the life data csv', async function(assert) {
    const chart = this.owner.lookup('service:chart');
    this.set('chart', chart);
    this.set('width', chart.width);
    this.set('height', chart.height);

    await chart.loadData.perform();

    await render(hbs`
      <Chart::Container
        @id="chart"
        @width={{this.width}}
        @height={{this.height}}
      >
        {{#each this.chart.displayData as |bar index|}}
          <Chart::Bar
              @bar={{bar}}
              @index={{index}}
          />
        {{/each}}
      </Chart::Container>
    `);

    const svg = this.element.querySelector('svg');
    assert.equal(this.width, svg.getAttribute('width'));
    assert.equal(this.height, svg.getAttribute('height'));

    const bars = this.element.querySelectorAll('rect');
    assert.equal(bars.length, this.chart.displayData.length);
  });
});
