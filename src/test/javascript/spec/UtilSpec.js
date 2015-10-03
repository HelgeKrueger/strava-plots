describe("Time formatting", function() {
    it('Can correctly format milliseconds as hours and minutes', function() {
        expect(secondsToFormatHourMinute(60)).toBe('0:01');
        expect(secondsToFormatHourMinute(59 * 60)).toBe('0:59');
        expect(secondsToFormatHourMinute(60 * 60)).toBe('1:00');
        expect(secondsToFormatHourMinute(61 * 60)).toBe('1:01');
        expect(secondsToFormatHourMinute(25 * 60 * 60)).toBe('25:00');
    });
});

describe('Meter conversion', function() {
    it('Correctly converts', function() {
        expect(metersToKilometers(1000)).toBe(1);
    });
});

describe('getValue', function() {
    it('retrieves a simple value', function() {
        expect(getValueForKey('key')({key: 'value'})).toBe('value');
        expect(getValueForKey('key')({key: 1})).toBe(1);
    });
});

describe('min / max of sets', function() {
    it('min of just a set', function() {
        expect(minOfSets([[{a: 0}]], getValueForKey('a'))).toBe(0);
        expect(minOfSets([[{a: 0, b: -12}]], getValueForKey('a'))).toBe(0);
        expect(minOfSets([[{a: 0}, {a: 1}]], getValueForKey('a'))).toBe(0);
        expect(minOfSets([[{a: 0}, {a: 1}, {a: -1}]], getValueForKey('a'))).toBe(-1);
    });

    it('min of just multiple sets', function() {
        expect(minOfSets([[{a: 0}], [{a: 1}]], getValueForKey('a'))).toBe(0);
        expect(minOfSets([[{a: 0}], [{a: -1}]], getValueForKey('a'))).toBe(-1);
    });

    it('max of just a set', function() {
        expect(maxOfSets([[{a: 0}]], getValueForKey('a'))).toBe(0);
        expect(maxOfSets([[{a: 0, b: -12}]], getValueForKey('a'))).toBe(0);
        expect(maxOfSets([[{a: 0}, {a: -1}]], getValueForKey('a'))).toBe(0);
        expect(maxOfSets([[{a: 0}, {a: 1}, {a: -1}]], getValueForKey('a'))).toBe(1);
    });

    it('max of just multiple sets', function() {
        expect(maxOfSets([[{a: 0}], [{a: 1}]], getValueForKey('a'))).toBe(1);
        expect(maxOfSets([[{a: 0}], [{a: -1}]], getValueForKey('a'))).toBe(0);
    });
});
