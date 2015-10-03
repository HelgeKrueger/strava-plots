describe("Time formatting", function() {
    it('Can correctly format milliseconds as hours and minutes', function() {
        expect(secondsToFormatHourMinute(60)).toBe('0:01');
        expect(secondsToFormatHourMinute(59 * 60)).toBe('0:59');
        expect(secondsToFormatHourMinute(60 * 60)).toBe('1:00');
        expect(secondsToFormatHourMinute(61 * 60)).toBe('1:01');
        expect(secondsToFormatHourMinute(25 * 60 * 60)).toBe('25:00');
    });
});
