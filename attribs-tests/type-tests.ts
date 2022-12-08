import { describe, expect, test } from "@jest/globals";
import { array } from "../attribs/array.js";
import { compositePrimKey } from "../attribs/compositePrimKey.js";
import { primKey } from "../attribs/primKey.js";
import { tuple } from "../attribs/tuple.js";
import { type } from "../attribs/type.js";
import { union } from "../attribs/union.js";
import { getTypeData } from "../engine/getTypeData.js";
import { TypeData } from "../typings/TypeData.js";

describe("type", () => {
  test("dummy", () => {
    expect(1).toBe(1);
  });
  test("entity types", () => {
    class Apa {
      foo = type(BigInt);
    }

    class Friend {
      id = primKey(Number);
      name = type(String);
      age = type(Number);
      age2 = type(Number, { default: 100 });
      apa = type(Apa);
      tags = array(String);
      tags2 = array(String, { default: ["hej"] });
      //union = union ("hej", "oj")
      nameAndAge = tuple([String, Number]);
      nameAngAge2 = tuple([
        type(String, { default: "Hej" }),
        type(Number, { default: 99 }),
      ]);
    }

    const friend = new Friend();
    expect(friend.id).toBe(0);
    expect(friend.age).toBe(0);
    expect(friend.age2).toBe(100);
    expect(friend.tags).toEqual([]);
    expect(friend.name).toBe("");
    expect(friend.tags2).toEqual(["hej"]);
    expect(friend.nameAndAge).toEqual(["", 0]);

    const friendType = getTypeData(Friend);
    expect(friendType).toMatchSnapshot();
  });

  test("compound", () => {
    class Membership {
      groupId = compositePrimKey(String, () => this.userId);
      userId = type(Number);
    }

    const m = new Membership();
    expect(m.groupId).toBe("");
    expect(m.userId).toBe(0);

    const membershipType = getTypeData(Membership);
    expect(membershipType).toMatchSnapshot();
    expect(membershipType.groupId.getPropPath(membershipType)).toBe("groupId");
    expect(membershipType.groupId.getKeyPaths(membershipType)).toEqual([
      "groupId",
      "userId",
    ]);
  });
});
