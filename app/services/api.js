import Service from '@ember/service';
import Papa from 'papaparse';
import LifeExpectancyTable from '../utils/lifeExpectancyTable';



export default class ApiService extends Service {
    races = [ 'all', 'black', 'white', 'hispanic' ];
    genders = [ 'all', 'male', 'female' ];

    async getAgeData({ age, race = 'all', gender = 'all' }) {
        const rows = await this.readFile(race, gender);
        const table = new LifeExpectancyTable(rows, { age: Number(age), race, gender });

        return table.rowForAge(age);
    }

    async getDemographicData({ race = 'all', gender = 'all' }) {
        const rows = await this.readFile(race, gender);
        return new LifeExpectancyTable(rows, { race, gender });
    }

    loadComparisonData({ age, race: currentRace, gender: currentGender }) {
        const combinations = [];
        for (let i = 0; i < this.races.length; i++) {
            const race = this.races[i];
            for (let j = 0; j < this.genders.length; j++) {
                const gender = this.genders[j];
                if (currentGender !== gender && currentRace !== race) {
                    combinations.push(`${gender}:${race}`);
                }
            }
        }
        const promises = [];
        for (let i = 0; i < 3; i++) {
            const index = Math.floor(Math.random() * combinations.length);
            const combination = combinations.splice(index, 1)[0];
            const [ gender, race ] = combination.split(':');
            promises.push(this.getAgeData({ age, race, gender }));
        }

        return Promise.all(promises);
    }

    readFile(race, gender) {
        const fileName = `/assets/data/${race}_${gender}_life-expectancy.csv`;
        return new Promise((resolve, reject) => {
            Papa.parse(fileName, {
                download: true,
                complete: results => {
                    const { data, errors } = results;
                    if (errors.length > 0) {
                        reject(new Error('Failed to read data.'));
                    }

                    resolve(data);
                }
            })
        });
    }
}