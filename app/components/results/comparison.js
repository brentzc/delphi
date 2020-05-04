import Component from '@glimmer/component';

export default class ResultsComparisonComponent extends Component {
    get demographic() {
        let { meta: { race, gender } } = this.args.row;
        gender = gender === 'all' ? 'males and females' : gender + 's';

        return `${race} ${gender}`;
    }

    get diff() {
        const { years_left } = this.args.row;
        const { years_left: original_years_left } = this.args.original;

        return new Number(years_left - original_years_left).toFixed(2);
    }

    get displayDiff() {
        const diff = this.diff;
        return diff > 0 ? `+${diff}` : `${diff}`;
    }
}
