const test = require('ava');

test('single property', t => {
    foo('foo');

    function foo(@bar baz) {
        expect(baz).toEqual('baz');
    }

    function bar(baz) {
        expect(baz).toEqual('foo');

        return 'baz';
    }
});

// Test no arguments
// Test single dec, single argument
// Test single dec, many arguments
// Test many decorator
// Test many decorators, many arguments
// Test many params with ''