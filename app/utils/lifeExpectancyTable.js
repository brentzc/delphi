const ROWS = {
    AGE: 0,
    YEARS_LEFT: 6,
    IMMINENT_DEATH_CHANCE: 1
};

class LifeExpectancyTableRow {
    constructor(row, meta) {
        this.age = Number(row[ROWS.AGE].split('–')[0]);
        this.years_left = Number(row[ROWS.YEARS_LEFT]);
        this.imminent_death_chance = row[ROWS.IMMINENT_DEATH_CHANCE] * 100;
        this.meta = meta;
    }

    get expected_age() {
        return this.age + this.years_left;
    }
}

export default class LifeExpectancyTable {
    constructor(rows, meta) {
        this.rows = rows.map(row => new LifeExpectancyTableRow(row, meta));
        this.meta = meta;
    }

    rowForAge(age) {
        const index = age > 101 ? 101 : age;
        return this.rows[index];
    }
}