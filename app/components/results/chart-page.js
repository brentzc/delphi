import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ResultsChartPageComponent extends Component {
    @service chart;

    @tracked tooltipIsShown = false;
    @tracked tooltip = null;

    get width() {
        return this.chart.width;
    }

    get height() {
        return this.chart.height;
    }

    @action updateChartWidth({ width }) {
        this.chart.width = width;
    }

    @action loadData() {
        const { meta: { age, race, gender } } = this.args.result;

        this.chart.currentAge = age;
        this.chart.selectedRace = race;
        this.chart.selectedGender = gender;
        this.chart.loadData.perform();
    }

    @action openTooltip(tooltip) {
        this.tooltipIsShown = true;
        this.tooltip = tooltip;
    }

    @action closeTooltip() {
        this.tooltipIsShown = false;
    }
}
