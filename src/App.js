import React, { Component } from "react"
import { inject, observer } from "mobx-react"
import MainContainer from "./container/MainContainer"

@inject('appStore')
@observer
export default class App extends React.Component {

	render() {
		return (
			<div className="container">
				<MainContainer />
			</div>
		)
	}
}