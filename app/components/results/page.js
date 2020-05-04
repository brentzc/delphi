import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ResultsPageComponent extends Component {
    @tracked selectedTab = null;

    tabs = [ 'Extras', 'Charts' ];

    selectedClasses = 'border-blue-500 bg-blue-500 hover:bg-blue-700 text-white';
    unselectedClasses = 'border-white hover:border-gray-200 text-blue-500 hover:bg-gray-200';

    @action selectTab(tab) {
        this.selectedTab = tab;
    }
}