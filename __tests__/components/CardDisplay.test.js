import React, { Component } from "react"
import { Provider } from "mobx-react"
import { mount } from "enzyme"
import AppStore from "../../src/store/AppStore"
import MessageStore from "../../src/store/MessageStore"
import RoundDetails from "../../src/store/RoundDetails"
import ModalStore from "../../src/store/ModalStore"
import CardDisplay from "../../src/container/CardDisplay"

const appStore = new AppStore()
const messageStore = new MessageStore()
const roundDetails = new RoundDetails()
const modalStore = new ModalStore()
const stores = {
	appStore: appStore,
	messageStore: messageStore,
	roundDetails: roundDetails,
	modalStore: modalStore
}

describe("CardDisplay", () => {
	const cardDisplay = mount(
		<Provider {...stores}>
			<CardDisplay />
		</Provider>
	)

	it("should have score holder for banker and player", () => {		
		expect(cardDisplay.find("div.bankerScore > span").text()).toBe("BANKER")
		expect(cardDisplay.find("div.playerScore > span").text()).toBe("PLAYER")

		expect(cardDisplay.find("div.bankerScore span.scoreValue").text().length).toBeGreaterThan(0)
		expect(cardDisplay.find("div.playerScore span.scoreValue").text().length).toBeGreaterThan(0)
	})

	it("should have three card holder for banker and player", () => {
		expect(cardDisplay.find("div.bankerCards div.card-sprite").length).toBe(3)
		expect(cardDisplay.find("div.playerCards div.card-sprite").length).toBe(3)
	})
})