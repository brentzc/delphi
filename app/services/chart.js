import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import * as d3 from 'd3';

export default class ChartService extends Service {
    @service api;

    @tracked width = 400;
    @tracked height = 300;
    @tracked data = [];

    @tracked result = null;
    @tracked max_results = 30;

    @tracked selectedRace = 'all';
    @tracked selectedGender = 'all';
    @tracked currentAge = 50;

    margin = {top: 30, right: 0, bottom: 30, left: 40};

    // Function for scaling x values of the chart
    get xScale() {
        return d3.scaleBand()
            .domain(d3.range(this.displayData.length))
            .range([this.margin.left, this.width - this.margin.right])
            .padding(0.1);
    }

    // Function for scaling y values of the chart
    get yScale() {
        return d3.scaleLinear()
            .domain([ d3.min(this.displayData, d => d.expected_age), d3.max(this.displayData, d => d.expected_age)])
            .nice()
            .range([ this.height - this.margin.bottom, this.margin.top])
    }

    /**
     * Display a slice of the data surrounding the users current age
     * because displaying all 100 rows doesn't look good
     */
    get displayData() {
        if (this.data.length === 0) { return this.data; }

        const age = this.currentAge;
        const leftIndex = age - 15 < 0 ? 0 : age - 15;
        const rightIndex = age + 15 > this.data.length ? this.data.length - 1 : age + 15;

        return this.data.reduce((displayData, data, index) => {
            const validIndex = index >= leftIndex && index <= rightIndex;
            return [
                ...displayData,
                ...(validIndex ? [ data ] : [])
            ];
        }, []);
    }

    /**
     * Read the life table csvs for data to be displayed in a chart
     */
    @task *loadData() {
        try {
            const table = yield this.api.getDemographicData({
                gender: this.selectedGender,
                race: this.selectedRace
            });
            this.data = table.rows;
        } catch (error) {
            this.data = [];
        }
    }
}
