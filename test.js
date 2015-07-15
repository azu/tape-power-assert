// LICENSE : MIT
"use strict";
var test = require('tape');
var cap = capturable();
test.Test.prototype._capt = cap._capt;
test.Test.prototype._expr = cap._expr;
var path = require('path');
test.createStream({objectMode: true}).on('data', function (row) {
    console.log(JSON.stringify(row, null, 4))
});
process.argv.slice(2).forEach(function (file) {
    require(path.resolve(file));
});
function capturable() {
    var events = [];

    function _capt(value, espath) {
        events.push({value: value, espath: espath});
        return value;
    }

    function _expr(value, args) {
        var captured = events;
        events = [];
        return {
            powerAssertContext: {
                value: value,
                events: captured
            },
            source: {
                content: args.content,
                filepath: args.filepath,
                line: args.line
            }
        };
    }

    return {
        _capt: _capt,
        _expr: _expr
    };
}
test('timing test', function (t) {
    t.plan(2);

    t.equal(typeof Date.now, 'function');

    var ary = [1, 2, 3];
    var minusOne = -1, two = 2;
    t.ok(ary.indexOf(two) === minusOne, 'THIS IS AN ASSERTION MESSAGE');

    var start = Date.now();
    setTimeout(function () {
        t.equal(Date.now() - start, 100);
    }, 100);
});