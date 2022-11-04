import React, { Component } from "react"
import { Provider } from "mobx-react"
import { mount } from "enzyme"
import AppStore from "../../src/store/AppStore"
import ModalStore from "../../src/store/ModalStore"
import TimerStore from '../../src/store/TimerStore'
import MessageStore from "../../src/store/MessageStore"
import SupervisorStore from "../../src/store/SupervisorStore"
import CaptchaStore from "../../src/store/CaptchaStore"
import ServiceStore from "../../src/store/ServiceStore"
import WarningStore from "../../src/store/WarningStore"
import DealerChangeModal from "../../src/container/modal/DealerChangeModal"

//todo: MOCK!
const fetchGet = ()=>{}
const getCaptchaImage = ()=>{}

const serviceStore = {fetchGet : fetchGet}
const appStore = new AppStore(serviceStore)
const modalStore = new ModalStore()
const timerStore = new TimerStore()
const messageStore = new MessageStore()
const supervisorStore = new SupervisorStore(serviceStore)
const captchaStore = new CaptchaStore(serviceStore)
const warningStore =  new WarningStore()

captchaStore.getCaptchaImage = getCaptchaImage

const stores = {
	appStore: appStore,
	modalStore: modalStore,
	timerStore: timerStore,
	messageStore: messageStore,
	supervisorStore: supervisorStore,
	captchaStore: captchaStore,
	serviceStore: serviceStore,
	warningStore: warningStore
}

describe("DealerChangeModal", () => {
	const dealerChange = mount(
			<Provider {...stores}>
				<DealerChangeModal />
			</Provider>
		)

	it("should contain login and dealer input-", () => {
		expect(dealerChange.find("div.form--group input").at(0).text()).toBe("")		
	})

})