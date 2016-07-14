const test = require('ava');

test('no decorators', function(t) {
    t.is((function foo(bar) {
        return bar;
    })('baz'), 'baz');
});

test('single decorator, single argument', function(t) {
    t.is(foo('foo'), 'baz');

    function foo(@bar baz) {
        return baz;
    }

    function bar(baz) {
        t.is('foo', baz);

        return 'baz';
    }
});

test('single decorator, many arguments', function(t) {
    t.deepEqual(foo('foo', 'bar'), [ 'baz', 'qux' ]);

    function foo(@bar baz, @bing qux) {
        return [ baz, qux ];
    }

    function bar(baz) {
        t.is('foo', baz);

        return 'baz';
    }

    function bing(qux) {
        t.is('bar', qux);

        return 'qux';
    }
});

test('many decorators, single argument', function(t) {
    t.is(foo('foo'), 'baz');

    function foo(@bar @bing baz) {
        return baz;
    }

    function bar(baz) {
        t.is('qux', baz);

        return 'baz';
    }

    function bing(qux) {
        t.is('foo', qux);

        return 'qux';
    }
});


test('many decorators, many arguments', function(t) {
    t.deepEqual(foo('foo', 'foo'), [ 'baz', 'baz' ]);

    function foo(@bar @bing baz, @bar @bing qux) {
        return [ baz, qux ];
    }

    function bar(baz) {
        t.is('qux', baz);

        return 'baz';
    }

    function bing(qux) {
        t.is('foo', qux);

        return 'qux';
    }
});


test('single decorator, single argument, single param', function(t) {
    t.is(foo('foo'), 'baz');

    function foo(@bar('baz') baz) {
        return baz;
    }

    function bar(baz) {
        return function(qux) {
            t.is('foo', qux);

            return baz;
        }
    }
});

test('single decorator, many arguments, single param', function(t) {
    t.deepEqual(foo('foo', 'bar'), [ 'baz', 'qux' ]);

    function foo(@bar('baz') baz, @bing('qux') qux) {
        return [ baz, qux ];
    }

    function bar(baz) {
        return function(qux) {
            t.is('foo', qux);

            return baz;
        }
    }

    function bing(qux) {
        return function(quux) {
            t.is('bar', quux);

            return qux;
        }
    }
});

test('single decorator, single argument, many params', function(t) {
    t.deepEqual(foo('foo'), [ 'baz', 'qux' ]);

    function foo(@bar('baz', 'qux') baz) {
        return baz;
    }

    function bar(baz, qux) {
        return function(quux) {
            t.is('foo', quux);

            return [ baz, qux ];
        }
    }
});


test('single decorator, many arguments, many params', function(t) {
    t.deepEqual(foo('foo', 'foo'), [ [ 'foo', 'bar' ], [ 'baz', 'qux' ] ]);

    function foo(@bar('foo', 'bar') baz, @bar('baz', 'qux') qux) {
        return [ baz, qux ];
    }

    function bar(baz, qux) {
        return function(quux) {
            t.is('foo', quux);

            return [ baz, qux ];
        }
    }
});

test('many decorators, single argument, single params', function(t) {
    t.is(foo('foo'), 'baz');

    function foo(@bar('baz') @bing('qux') baz) {
        return baz;
    }

    function bar(baz) {
        return function(qux) {
            t.is('qux', qux);

            return baz;
        }
    }

    function bing(qux) {
        return function(quux) {
            t.is('foo', quux);

            return qux;
        }
    }
});

test('many decorators, many arguments, single param', function(t) {
    t.deepEqual(foo('foo', 'foo'), [ 'baz', 'baz' ]);

    function foo(@bar('baz') @bing('qux') baz, @bar('baz') @bing('qux') qux) {
        return [ baz, qux ];
    }

    function bar(baz) {
        return function(qux) {
            t.is('qux', qux);

            return baz;
        }
    }

    function bing(qux) {
        return function(quux) {
            t.is('foo', quux);

            return qux;
        }
    }
});

test('many decorators, many arguments, many params', function(t) {
    t.deepEqual(foo('foo', 'foo'), [ [ 'foo', 'bar' ], [ 'foo', 'bar' ] ]);

    function foo(
        @bar('foo', 'bar') @bing('baz', 'qux') baz,
        @bar('foo', 'bar') @bing('baz', 'qux') qux
    ) {
        return [ baz, qux ];
    }

    function bar(baz, qux) {
        t.deepEqual([ 'foo', 'bar' ], [ baz, qux ]);

        return function(quux) {
            t.deepEqual([ 'baz', 'qux' ], quux);

            return [ baz, qux ];
        }
    }

    function bing(bing, qux) {
        t.deepEqual([ 'baz', 'qux' ], [ bing, qux ]);

        return function(quux) {
            t.is('foo', quux);

            return [ bing, qux ];
        }
    }
});

// test('arrow functions', function(t) {
//     const FOO = (@bar baz) => baz;
//     const BAR = (@bar baz) => baz;
//
//     t.is(FOO('foo'), 'bar');
//     t.is(BAR('foo'), 'bar');
//
//     function bar(baz) {
//         return 'bar';
//     }
// });

// test('anonymous functions', function(t) {
//     t.is((function(@foo bar) {
//         return bar;
//     })('foo'), 'bar');
//
//     function foo(bar) {
//         t.is('foo', bar);
//
//         return 'bar';
//     }
// });

// test('ClassMethod', function(t) {
//     class Foo {
//         bar(@baz qux) {
//             return qux;
//         }
//     }
//
//     t.is(new Foo().bar('foo'), 'baz');
//
//     function baz(qux) {
//         t.is('foo', qux);
//
//         return 'baz';
//     }
// });

// test('static ClassMethod', function(t) {
//     class Foo {
//         static bar(@baz qux) {
//             return qux;
//         }
//     }
//
//     t.is(Foo.bar('foo'), 'baz');
//
//     function baz(qux) {
//         t.is('foo', qux);
//
//         return 'baz';
//     }
// });

test('ObjectMethod', function(t) {
    const OBJ = {
        // foo: function(@qux bar) {
        //     t.is('bar', bar);
        // },
        // bar: function bar(@qux baz) {
        //     t.is('bar', baz);
        // },
        baz(@qux quux) {
            t.is('bar', quux);
        }
    }

    // OBJ.foo('foo');
    // OBJ.bar('foo');
    OBJ.baz('foo');

    function qux(quux) {
        t.is('foo', quux);

        return 'bar';
    }
});