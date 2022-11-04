import React from "react"
import { inject, observer } from "mobx-react"

export default class Loading extends React.Component {

	render() {
		return (
			<div className='preloader'></div>
		)
	}
}