import React, { Component } from "react"
import { Provider } from "mobx-react"
import { mount } from "enzyme"
import ModalContainer from '../../src/container/ModalContainer'
import ButtonController from '../../src/container/ButtonController'
import AppStore from "../../src/store/AppStore"
import ModalStore from "../../src/store/ModalStore"

const appStore = new AppStore()
const modalStore = new ModalStore()
const stores = {
	appStore: appStore,
	modalStore: modalStore
}

describe("ButtonController", () => {
	const buttonController = mount(
			<Provider {...stores}>				
				<ButtonController />
			</Provider>
		)	

	it("should open the corresponding modal when button is clicked", () => {		
		appStore.setGameState(AppStore.END_ROUND)
		buttonController.find("div.buttonController button").at(0).simulate("click")
		expect(modalStore.modalContent).toBe(ModalStore.DEALER_CHANGE)
		buttonController.find("div.buttonController button").at(1).simulate("click")
		expect(modalStore.modalContent).toBe(ModalStore.CHANGE_SHOE)
		appStore.setGameState(AppStore.DRAGON_DEALT)
		buttonController.find("div.buttonController button").at(2).simulate("click")
		expect(modalStore.modalContent).toBe(ModalStore.ROLLBACK)
	})
})