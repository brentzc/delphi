import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import { action } from '@ember/object';

export default class AgeFormComponent extends Component {
    @service api;
    @service router;

    @tracked age = null;
    @tracked race = null;
    @tracked gender = null;
    @tracked error = null;

    get genders() {
        return [ 'Male', 'Female' ];
    }

    get genderOptions() {
        return [ '', ...this.genders, 'Not Listed' ];
    }

    get races() {
        return [ 'Hispanic', 'Black', 'White' ];
    }

    get raceOptions() {
        return [ '', ...this.races, 'Not Listed' ];
    }

    @action setGender(gender) {
        this.gender = this.genders.includes(gender) ? gender.toLowerCase() : 'all';
    }

    @action setRace(race) {
        this.race = this.races.includes(race) ? race.toLowerCase() : 'all';
    }

    @task *calculateLifeSpan(event) {
        event.preventDefault();
        this.error = null;
        yield timeout(100);
        try {
            if (!this.age) {
                throw new Error('Age is required');
            }
            if (this.age < 0) {
                throw new Error('Invalid Age')
            }

            this.router.transitionTo('results', this.age, {
                queryParams: {
                    race: this.race,
                    gender: this.gender
                }
            });
        } catch (error) {
            this.error = error.message;
        }
    }
}
