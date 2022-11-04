import { AppStore } from "../../src/store/AppStore"

describe("AppStore", () => {

  var store = new AppStore
  it("fetches dealer name", () => {
    store.setDealerName("Panda")
    expect(store.dealerName).toBe("Panda")
  })

  it("fetches supervisor name", () => {
    store.setSupervisorName("Super Man")
    expect(store.supervisorName).toBe("Super Man")
  })

  it("fetches shoe number", () => {
    store.setShoeNumber(34)
    expect(store.shoeNumber).toBe(34)
  })

  it("fetches gameState", () => {
    store.setGameState("BET_OPEN")
    expect(store.gameState).toBe("BET_OPEN")
  })

})