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
            const age = parseInt(this.age);
            if (Number.isNaN(age)) {
                throw new Error('Invalid Age');
            }

            this.router.transitionTo('results', age, {
                queryParams: {
                    race: this.race || 'all',
                    gender: this.gender || 'all'
                }
            });
        } catch (error) {
            this.error = error.message;
        }
    }
}
