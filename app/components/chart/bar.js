import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ChartBarComponent extends Component {
    @service chart;

    get id() {
        const { x, y, width, height } = this;
        return `${x}${y}${width}${height}`;
    }

    get x() {
        const { index } = this.args;
        return this.chart.xScale(index);
    }

    get y() {
        const { bar } = this.args;
        return this.chart.yScale(bar.expected_age);
    }

    get height() {
        const { bar } = this.args; 
        const { yScale } = this.chart;
        return yScale(0) - yScale(bar.expected_age);
    }

    get width() {
        return this.chart.xScale.bandwidth();
    }

    get barColor() {
        const { bar: { age } } = this.args;
        const { currentAge } = this.chart;
        return age === currentAge ? 'text-purple-600' : 'text-blue-400';
    }

    @action mouseover() {
        this.args.openTooltip(this.args.bar);
    }

    @action mouseout() {
        this.args.closeTooltip();
    }
}