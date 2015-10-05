describe("Time formatting", function() {
    it('Can correctly format milliseconds as hours and minutes', function() {
        expect(Formatters['movingTime'](60)).toBe('0:01');
        expect(Formatters['movingTime'](59 * 60)).toBe('0:59');
        expect(Formatters['movingTime'](60 * 60)).toBe('1:00');
        expect(Formatters['movingTime'](61 * 60)).toBe('1:01');
        expect(Formatters['movingTime'](25 * 60 * 60)).toBe('25:00');
    });
});

describe('Meter conversion', function() {
    it('Correctly converts', function() {
        expect(Formatters['distance'](1000)).toBe(1);
    });
});

describe('Speed', function() {
    it('Correctly converts', function() {
        expect(Formatters['speed'](1)).toBe(3.6);
    });
});
