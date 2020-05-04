import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ResultsRoute extends Route {
    queryParams = {
        gender: { refreshModel: true },
        race: { refreshModel: true }
    }

    @service api;

    async model(params) {
        return this.api.getAgeData(params);
    }

    @action error() {
        this.replaceWith('home');
    }
}
