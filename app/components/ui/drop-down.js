import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DropDownComponent extends Component {
    @action select(event) {
        this.args.updateValue(event.target.value);
    }
}