import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | api', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it should be able to read from the actuary csv files', async function(assert) {
    let service = this.owner.lookup('service:api');
    
    const rowCount = 101;

    let rows = await service.readFile('hispanic', 'female');
    assert.equal(rows.length, rowCount);

    rows = await service.readFile('all', 'all');
    assert.equal(rows.length, rowCount);

    rows = await service.readFile('white', 'male');
    assert.equal(rows.length, rowCount);

    rows = await service.readFile('black', 'all');
    assert.equal(rows.length, rowCount);
  });

  test('it should get a single row from a csv file', async function(assert) {
    let service = this.owner.lookup('service:api');

    const meta = {
      age: 25,
      race: 'white',
      gender: 'male'
    };

    const row = await service.getAgeData(meta);
    assert.deepEqual(row.meta, meta);
    assert.ok(row.age);
    assert.ok(row.years_left);
    assert.ok(row.imminent_death_chance);
  });

  test('it should get an entire csv file as a table', async function(assert) {
    let service = this.owner.lookup('service:api');
    const meta = { race: 'all', gender: 'all' };

    const table = await service.getDemographicData(meta);
    assert.deepEqual(table.meta, meta);
    assert.equal(table.rows.length, 101);
  });
});
