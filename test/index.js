import {
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
} from './lib/index';

const t = require('ava');

// No decorators
t(t => t.is(test('foo'), 'foo'));

// Single decorator, single argument
t(t => t.is(test1('foo'), 'foo1'));

// Single decorator, many arguments
t(t => t.deepEqual(test2('foo', 'bar'), [ 'foo1', 'bar1' ]));

// Many decorators, single argument
t(t => t.is(test3('foo'), 'foo12'));

// Many decorators, many arguments
t(t => t.deepEqual(test4('foo', 'bar'), [ 'foo12', 'bar12' ]));

// Single decorator, single argument, single param
t(t => t.is(test5('foo'), 'foobar3'));

// Single decorator, many arguments, single param
t(t => t.deepEqual(test6('foo', 'bar'), [ 'foobar3', 'barbaz3' ]));

// Single decorator, single argument, many params
t(t => t.deepEqual(test7('foo'), 'foobarbaz4'));

// Single decorator, many arguments, many params
t(t => t.deepEqual(test8('foo', 'baz'), [ 'foobarbaz4', 'bazquxquux4' ]));

// Many decorators, single argument, single param
t(t => t.is(test9('foo'), 'foobaz3bar3'));

// Many decorators, many arguments, single param
t(t => t.deepEqual(test10('foo', 'baz'), [ 'foobaz3bar3', 'bazquux3qux3' ]));

// Many decorators, many arguments, many params
t(t => t.deepEqual(test11('foo', 'foo'), [ 'foobarbaz4foobar4', 'fooquxquux4bazqux4' ]));

// NOTE: This plugin does not work with arrow functions
// test('arrow functions', function(t) {
//     const FOO = (@bar baz) => baz;
//     const BAR = (@bar baz) => { return baz };
//
//     t.is(FOO('foo'), 'bar');
//     t.is(BAR('foo'), 'bar');
//
//     function bar(baz) {
//         return 'bar';
//     }
// });

// Anonymous function
t(t => t.is(test12(), 'foo1'));

// ClassMethod
// Class method, decorator
t(t => t.is(new Test().test0('foo'), 'foo1'));

// Class method, decorator, argument
t(t => t.is(new Test().test('foo'), 'foobar3'));

// Static class method, decorator
t(t => t.is(Test.test0('foo'), 'foo1'));

// Static class method, decorator, argument
t(t => t.is(Test.test('foo'), 'foobar3'));

// Object Method
// Object property, anonymous function, decorator
t(t => t.is(test0.test0('foo'), 'foo1'));

// Object property, anonymous function, decorator, argument
t(t => t.is(test0.test1('foo'), 'foobar3'));

// Object property, named function, decorator
t(t => t.is(test0.test2('foo'), 'foo1'));

// Object property, named function, decorator, argument
t(t => t.is(test0.test3('foo'), 'foobar3'));

// Object property, shorthand, decorator
t(t => t.is(test0.test4('foo'), 'foo1'));

// Object property, shorthand, decorator, argument
t(t => t.is(test0.test5('foo'), 'foobar3'));