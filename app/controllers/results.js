import Controller from '@ember/controller';

export default class ResultsController extends Controller {
    queryParams = [ 'race', 'gender' ]
    race = null;
    gender = null;
}
