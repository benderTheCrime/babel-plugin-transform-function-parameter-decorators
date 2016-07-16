// function test(foo) {
//     return foo;
// }

function test1(@decorator1 foo) {
    console.log(foo);
    return foo;
}

function decorator1(baz) {
    console.log(baz);
    console.assert(baz, 'foo');

    return 'baz';
}

// export { test };
export { test1 };