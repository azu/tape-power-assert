// LICENSE : MIT
"use strict";
var test = require('tape');
var empower = require('empower');
var formatter = require('power-assert-formatter');
var empowerConfig = {
    destructive: true,
    modifyMessageOnRethrow: false,
    saveContextOnRethrow: false,
    patterns: [
        "t.ok(value, [message])",
        "t.equal(actual, expected, [message])",
        "t.notEqual(actual, expected, [message])",
        "t.strictEqual(actual, expected, [message])",
        "t.notStrictEqual(actual, expected, [message])",
        "t.deepEqual(actual, expected, [message])",
        "t.notDeepEqual(actual, expected, [message])",
        "t.deepStrictEqual(actual, expected, [message])",
        "t.notDeepStrictEqual(actual, expected, [message])"
    ]
};
// empower(test.Test.prototype, formatter(), empowerConfig);
var path = require('path');
test.createStream({objectMode: true}).on('data', function (row) {
    console.log(JSON.stringify(row, null, 4))
});
process.argv.slice(2).forEach(function (file) {
    require(path.resolve(file));
});

test('timing test', function (t) {
    empower(t, formatter(), empowerConfig);
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
