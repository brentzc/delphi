import Component from '@glimmer/component';
import { task } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ResultsExtrasComponent extends Component {
    @service api;

    @tracked extras = [];

    get gender() {
        return this.args.result.meta.gender;
    }
    get race() {
        return this.args.result.meta.race;
    }
    get age() {
        return this.args.result.meta.age;
    }

    get demographic() {
        const raceString = this.race === 'all' ? '' : this.race;
        const genderString = this.gender === 'all' ? 'person' : this.gender;
        return `${raceString} ${genderString}`;
    }

    get expected_age() {
        const { years_left, meta: { age } } = this.args.result;
        return Math.round(years_left) + Number(age);
    }

    // Load the extra needed to fill out the data for this tab
    @task *loadExtraData() {
        try {
            this.extras = yield this.api.loadComparisonData({
                age: this.age,
                race: this.race,
                gender: this.gender
            });

            const newborn_data = yield this.api.getAgeData({ age: 0, race: this.race, gender: this.gender });
            const { years_left, meta: { age } } = newborn_data;
            this.newborn_expected_age = Math.round(years_left) + age;
        } catch (error) {
            console.log(error);
        }
    }
}
