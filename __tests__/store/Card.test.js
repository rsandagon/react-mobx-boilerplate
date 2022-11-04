import { Card } from "../../src/store/Card"

describe("Card", () => {

  it("creates Card", () => {
    var store = new Card('h', '2')
    expect(store.suit).toBe("h")
    expect(store.rank).toBe("2")
    expect(store.score).toBe(2)
    expect(store.toCardString).toBe("h2")
  })

  it("tests utils for card score", () => {
    var store = new Card('h', 'A')
    expect(store.score).toBe(1)

    store.setRank('a')
    expect(store.score).toBe(1)

    store.setRank('J')
    expect(store.score).toBe(0)

    store.setRank('Q')
    expect(store.score).toBe(0)

    store.setRank('K')
    expect(store.score).toBe(0)

    store.setRank('5')
    expect(store.score).toBe(5)

  })


})