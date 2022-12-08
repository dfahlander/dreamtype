Under construction

# Examples:

See `test/type-tests.ts`

# Format

See `test/__snapshots__`, or debug the tests.

# What's working

- [x] Basic declaration of entity with primary keys (autoGen or normal), indexes, arrays, primitives and nested objects.
- [x] Runtime initialization of default values when constructing an entity using new().
- [x] Get type data from an entity type by using `getTypeData(Entity)`.
- [x] Support for composite primary keys and indexes

# Todo:

- [ ] Improve how to detect if a type is scalar or object in \_type.ts. Have a constant set of scalar constructors instead of finding it on the global object.
- [ ] Test more explicitely the declaration and type structure for:
  - [ ] indexes
  - [ ] composite indexes
  - [ ] unique indexes
  - [ ] array(index(T))
  - [ ] index(array(T))
- [ ] rollup and dts bundle it. Need this lib to be minimalistic.
- [ ] terser to minify
- [ ] Verify code coverage and fix missing code paths
- [ ] Test with crazy input and typical user errors.
- [ ] Measure performance
- [ ] Check if we need to freeze more default values that are cached in weakmaps.
- [ ] Add test for the union type and fix its typings and runtime behavour.
- [ ] Add an enum type (alias for union but interpret input args as const and only take primitive types)
- [ ] Measure final minified library size
- [ ] Fix this readme with concrete examples.
- [ ] Compare declaration styles with other runtime typing libraries and ORMs.
- [ ] Explain the contract for lib devs: No need to be dependent on this library to get type data from classes,
      just follow the contract in
- [ ] The `optional` attribute
- [ ] The `nullable` attribute
- [ ] A structure / record type? Or are we better off with having to declare classes for that?
