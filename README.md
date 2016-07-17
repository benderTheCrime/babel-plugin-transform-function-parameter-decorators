# Babel Plugin Transform Function Parameter Decorators
This is a plugin for Babel 6 that is used to transform function parameter
decorators into calls to the decorator function within the body of the decorated
function:
```javascript
foo('foo');

function foo(@bar baz) {
    console.log(baz); // 'bar';
}

function bar(@baz qux) {
    console.log(qux); // 'foo';

    return 'bar';
}
```

#### NOTE:
This package depends on `babel-plugin-transform-decorators-legacy`

## Installation & Usage
```bash
npm install babel-plugin-transform-decorators-legacy babel-plugin-transform-function-parameter-decorators
```
Add the following line to your `.babelrc` file:
```json
    {
        "plugins": [
            "transform-decorators-legacy",
            "transform-function-parameter-decorators"
        ]
    }
```

#### NOTE: Order of Plugins Matters!
If you are including your plugins manually and using `transform-decorators-legacy`, make sure that `transform-decorators-legacy` comes *before* `transform-function-parameter-decorators`.

#### NOTE: This will not work with arrow functions!
Nor will any other decorators for that matter. If you need to use function parameter decorators please consider not using an arrow function.

#### NOTE: Name your parameters/decorators intelligently!
Your function parameter cannot be named the same as your decorator or the name of your variable prefixed with an underscore: `_${var}`. This will be fixed in a future version. Let's take a look at the reasoning behind this:
```javascript
// Before
function foo(@bar baz) {
    console.log(baz);
}

// After
function foo(_baz) {
    var baz = bar(_baz);

    console.log(baz);
}
```
If the name of the decorator was `_baz`:
```javascript
// Before
function foo(@_baz baz) {
    console.log(baz);
}

// After
function foo(_baz) {
    var baz = _baz(_baz); // <-- Potential TypeError or circular reference

    console.log(baz);
}
```

## License
MIT (c) 2016