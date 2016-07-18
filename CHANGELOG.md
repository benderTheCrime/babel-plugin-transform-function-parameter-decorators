# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [1.2.0] - 2016-07-17
### Added
- Added support for decorators named the same as their associated properties (renamed the param with `path.scope.generateUidIdentifier`)
- Added `.travis.yml` to `.npmignore`
- Added `.editorconfig`

### Changed
- n/a

### Fixed
- Prevent the plugin from mutating the list of params passed to the visitor function
- Prevent the plugin from mutating the list of decorators passed to the param

### Removed
- Removed plugin `transform-decorators-legacy` from root `.babelrc`

## [1.1.1] - 2016-07-16
### Added
- n/a

### Changed
- n/a

### Fixed
- `node_modules` and `src` removed from `.npmignore`

### Removed
- n/a

## [1.1.0] - 2016-07-15
### Added
- `.travis.yml`

### Changed
- Modified syntax
- Updated tests: decoupled test functions from the tests themselves

### Fixed
- n/a

### Removed
- n/a