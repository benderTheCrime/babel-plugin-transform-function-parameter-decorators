const test0 = {

    /* eslint-disable object-shorthand */
    test0: function(@decorator1 foo) {
        return foo;
    },

    test1: function(@decorator3('bar') foo) {
        return foo;
    },

    /* eslint-enable object-shorthand */

    test2: function test2(@decorator1 foo) {
        return foo;
    },
    test3: function test3(@decorator3('bar') foo) {
        return foo;
    },
    test4(@decorator1 foo) {
        return foo;
    },
    test5(@decorator3('bar') foo) {
        return foo;
    }
};

function test(foo) {
    return foo;
}

function test1(@decorator1 foo) {
    return foo;
}

function test2(@decorator1 foo, @decorator1 bar) {
    return [ foo, bar ];
}

function test3(@decorator2 @decorator1 foo) {
    return foo;
}

function test4(@decorator2 @decorator1 foo, @decorator2 @decorator1 bar) {
    return [ foo, bar ];
}

function test5(@decorator3('bar') foo) {
    return foo;
}

function test6(@decorator3('bar') foo, @decorator3('baz') bar) {
    return [ foo, bar ];
}

function test7(@decorator4('bar', 'baz') foo) {
    return foo;
}

function test8(@decorator4('bar', 'baz') foo, @decorator4('qux', 'quux') bar) {
    return [ foo, bar ];
}

function test9(@decorator3('bar') @decorator3('baz') foo) {
    return foo;
}

function test10(
    @decorator3('bar') @decorator3('baz') foo,
    @decorator3('qux') @decorator3('quux') bar
) {
    return [ foo, bar ];
}

function test11(
    @decorator4('foo', 'bar') @decorator4('bar', 'baz') foo,
    @decorator4('baz', 'qux') @decorator4('qux', 'quux') bar
) {
    return [ foo, bar ];
}

function test12() {
    return (function(@decorator1 foo) {
        return foo;
    })('foo');
}

class Test {
    test0(@decorator1 foo) {
        return foo;
    }

    test(@decorator3('bar') foo) {
        return foo;
    }

    static test0(@decorator1 foo) {
        return foo;
    }

    static test(@decorator3('bar') foo) {
        return foo;
    }
}

/* eslint-disable no-unused-vars */
function decorator1(foo) {
    return `${foo}1`;
}

function decorator2(foo) {
    return `${foo}2`;
}

function decorator3(foo) {
    return function(bar) {
        return `${bar}${foo}3`;
    };
}

function decorator4(foo, bar) {
    return function(baz) {

        return [ baz, foo, bar, 4 ].join('');
    };
}

/* eslint-disable no-unused-vars */

export {
    test0,
    test,
    test1,
    test2,
    test3,
    test4,
    test5,
    test6,
    test7,
    test8,
    test9,
    test10,
    test11,
    test12,
    Test
};