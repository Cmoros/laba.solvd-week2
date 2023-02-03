import { sum } from "../src/sum";

describe("sum", () => {
  it("should work with only 1 number", function sumWith1Number() {
    const sum0 = sum(0);
    expect(sum0.valueOf()).toBe(0);
    expect(sum0.toString()).toBe("0");

    const sum1 = sum(1);
    expect(sum1.valueOf()).toBe(1);
    expect(sum1.toString()).toBe("1");

    const sum9 = sum(9);
    expect(sum9.valueOf()).toBe(9);
    expect(sum9.toString()).toBe("9");

    const sum10 = sum(10);
    expect(sum10.valueOf()).toBe(10);
    expect(sum10.toString()).toBe("10");

    const sum150 = sum(150);
    expect(sum150.valueOf()).toBe(150);
    expect(sum150.toString()).toBe("150");
  });

  it("should work with many numbers", function sumWithManyNumbers() {
    const sum20 = sum(10)(10);
    expect(sum20.valueOf()).toBe(20);
    expect(sum20.toString()).toBe("20");

    const sum6 = sum(1)(2)(3);
    expect(sum6.valueOf()).toBe(6);
    expect(sum6.toString()).toBe("6");

    const sum25 = sum(5)(5)(5)(5)(5);
    expect(sum25.valueOf()).toBe(25);
    expect(sum25.toString()).toBe("25");

    const sum250 = sum(25)(50)(75)(100);
    expect(sum250.valueOf()).toBe(250);
    expect(sum250.toString()).toBe("250");
  });
});
