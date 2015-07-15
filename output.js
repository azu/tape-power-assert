// LICENSE : MIT
"use strict";
var createFormatter = require('power-assert-formatter');
var formatter = createFormatter();
// ? https://github.com/power-assert-js/empower/blob/c788718db868e3a5927cf166d08b2ef9336f9d0e/lib/decorate.js
var result = {
    "powerAssertContext": {
        "value": false,
        "events": [
            {
                "value": [
                    1,
                    2,
                    3
                ],
                "espath": "arguments/0/left/callee/object"
            },
            {
                "value": 2,
                "espath": "arguments/0/left/arguments/0"
            },
            {
                "value": 1,
                "espath": "arguments/0/left"
            },
            {
                "value": -1,
                "espath": "arguments/0/right"
            },
            {
                "value": false,
                "espath": "arguments/0"
            }
        ]
    },
    "source": {
        "content": "t.ok(ary.indexOf(two) === minusOne, 'THIS IS AN ASSERTION MESSAGE')",
        "filepath": "test.js",
        "line": 44
    }
};
var context = {
    source: result.source,
    args: [result.powerAssertContext]
};
var text = formatter(context);
console.log(text);