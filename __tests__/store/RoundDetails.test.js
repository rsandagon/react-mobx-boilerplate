import { RoundDetails } from "../../src/store/RoundDetails"
import { Card } from "../../src/store/Card"

describe("RoundDetails", () => {

  var store = new RoundDetails
  it("gets blank", () => {
    expect(store.getPlayer1stCard).toBe('blank')
  })
})