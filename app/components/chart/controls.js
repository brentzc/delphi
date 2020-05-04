import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ChartControlsComponent extends Component {
    @service chart;

    get selectedRace() {
        return this.args.result.meta.race;
    }

    get selectedGender() {
        return this.args.result.meta.gender;
    }

    @action updateRace(race) {
        this.chart.selectedRace = race.toLowerCase();
        this.chart.loadData.perform();
    }

    @action updateGender(gender) {
        this.chart.selectedGender = gender.toLowerCase();
        this.chart.loadData.perform();
    }
}
