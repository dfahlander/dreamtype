import { compositePrimKey } from "../attribs/compositePrimKey";
import { CTX } from "../engine/CTX.js";
import { Constructor2Type, Declaration2Type } from "../engine/declaration2Type.js";
import { PrimaryKey, TypeSymbol } from "../engine/symbols.js";
import { TypeData, TypeOptions } from "../engine/TypeConfig.js";
import { array } from "./array";

export function type<T>(
  typeOrValue: T,
  typeOptions?: TypeOptions
): Constructor2Type<T> {
  if (!CTX.declaration) {
    // Runtime mode: Return the declared default:
    if (typeOptions) return typeOptions.default;
    if (!typeOrValue) return typeOrValue as any;
    const typeData = typeOrValue[TypeSymbol];
    if (typeData) return typeData.default;
    if (typeof typeOrValue === "function") {
      switch (typeOrValue as Function) {
        case String:
          return "" as any;
        case Number:
          return 0 as any;
        case Boolean:
          return false as any;
        case BigInt:
          return BigInt(0) as any;
        default:
          return new (typeOrValue as any)();
      }
    }
    return typeOrValue as any;
  }

  // Declaration mode: Adjust

  const typeData: TypeData = {
    typeName: typeOrValue["name"],
    ...(typeOrValue as any)[TypeSymbol],
    ...typeOptions,
  };
  // TODO: Here... Titta på vad vi gjort i Type.ts och parseType.ts i dreambase-types.
  /*if (!_type.hasOwnProperty("default")) {
    _type.default =
      typeof typeOrValue === "function"
        ? new (typeOrValue as any)()
        : typeOrValue;
  }*/
  switch (typeof typeOrValue) {
    case "function":
    // Get weakmap cached freezed default instance or create one, unless there's a default.
    case "object":
      return Object.create((typeOrValue as unknown) as object, {
        _type: { get: () => typeData },
      });
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "symbol":
    case "undefined":
  }
}

class Apa {
  foo: "bar";
}

class Friend {
  id = primKey(Number);
  id2 = compositePrimKey(Number, () => this.name);
  name = type(String);
  age = type(Number);
  obj = type({ foo: String });
  apa = type(Apa);
  tags = array(String);
}

type TEST = Declaration2Type<
  StringConstructor,
  { primKey: true; with: () => [number] }
>;

const friends = (null as unknown) as Collection<Friend>;
friends.where({ age: { above: 3 } });
friends.where({ age: { above: 4 } });
friends.where({ obj: { is: "Array" } });
friends
  .where({ name: { startsWith: "s" } })
  .where({ age: { above: 4 } })
  .where({ NOT: { age: { between: [2, 4] } } })
  .where({
    NOT: {
      age: { OR: [{ between: [2, 4] }, { between: [6, 8] }] },
    },
  });
friends.where({ name: startsWith("s") });
friends.where("name").startsWith("s");
friends.where({
  birthDate: {
    before: "2022-12-03",
  },
});

var n: Operators<number>;
