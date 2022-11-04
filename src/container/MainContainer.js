import React, { Component } from "react"
import { inject, observer } from "mobx-react"
import ButtonController from "./ButtonController"
import CardDisplay from "./CardDisplay"

@inject('appStore')
@observer
export default class TableContainer extends React.Component {

    render() {
        return (
            <div className="fill-area">
                <ButtonController />
                <CardDisplay />
            </div>
        )
    }
}