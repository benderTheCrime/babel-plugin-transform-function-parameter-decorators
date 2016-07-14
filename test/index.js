const test = require('ava');


// No decorators
test(function(t) {
    t.is((function foo(bar) {
        return bar;
    })('baz'), 'baz');
});

// Single decorator, single argument
test(function(t) {
    t.is(foo('foo'), 'baz');

    function foo(@bar baz) {
        return baz;
    }

    function bar(baz) {
        t.is('foo', baz);

        return 'baz';
    }
});

// Single Decorator, many arguments
test(function(t) {
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

// Many Decorators, single argument
test(function(t) {
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

// Many Decorators, many arguments
test(function(t) {
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

// Single decorator, single argument, single param
test(function(t) {
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

// Single decorator, many arguments, single param
test(function(t) {
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

// Single decorator, single argument, many params
test(function(t) {
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

// Single decorator, many arguments, many params
test(function(t) {
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

// Many Decorators, single argument, single params
test(function(t) {
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

// Many decorators, many arguments, single param
test(function(t) {
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

// Many decorators, many arguments, many params
test(function(t) {
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

// Arrow functions
// test(function(t) {
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

// Anonymous functions
// test(function(t) {
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

// ClassMethod
// test(function(t) {
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

// static ClassMethod
// test(function(t) {
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


// ObjectMethod s
test(function(t) {
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