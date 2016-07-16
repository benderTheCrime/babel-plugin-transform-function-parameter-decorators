// function test(foo) {
//     return foo;
// }

function test1(@decorator1 foo) {
    return foo;
}

function decorator1(baz) {
    return 'baz';
}

// export { test };
export { test1 };