import { computed, action, observable, useStrict } from "mobx"

export class ServiceStore {
    @observable
    token

    @observable
    selectedTableName

    constructor() { }

    @computed
    get headers() {
        if (this.token) {
            return this.getHeadersWithToken(this.token)
        } else {
            return {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'dataType': 'json'
            }
        }
    }

    getHeadersWithToken(token) {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'dataType': 'json',
            'Authorization': `Bearer ${token}`
        }
    }

    @action("sets token")
    setToken(token) {
        this.token = token
    }

    @action("sets tableName for graphql")
    setSelectedtableName(value) {
        this.selectedTableName = value
    }

    fetchGet(url) {

        var options = {
            headers: this.headers,
            method: 'GET',
        }

        return fetch(url, options)
            .then(resp => {
                var json = resp.json()
                if (resp.ok || (resp.status == 401)) {
                    if (resp.statusText === 'Unauthorized' || resp.name === 'UnauthorizedError') {
                        localStorage.removeItem("login")
                        json.then(err => { throw err })
                    }
                    return json
                }
                return json.then(err => { throw err })

            })
            .catch(error => {
                throw error
            })
    }

    fetchPost(url, params, otherToken) {
        var fetchHeaders = this.headers
        if (otherToken) {
            fetchHeaders = this.getHeadersWithToken(otherToken)
        }

        var options = {
            headers: fetchHeaders,
            method: 'POST',
            body: JSON.stringify(params)
        }

        return fetch(url, options)
            .then(resp => {
                var json = resp.json()
                if (resp.ok || (resp.status == 401) || (resp.status == 400)) {
                    if (resp.statusText === 'Unauthorized') {
                        localStorage.removeItem("login")
                        json.then(err => { throw err })
                    }

                    return json
                }

                return json.then(err => { throw err })

            })
            .catch(error => {
                throw error
            })
    }

    callApis(query) {
        var url = '/apis/baccarat/graphql'
        var body = { query: query }
        return this.fetchPost(url, body)
            .then(result => {
                if (result.errors) {
                    throw result.errors
                } else {
                    return result
                }
            })
            .catch(error => {
                throw error
            })
    }

    /** graphql calls */
    fetchTables() {
        var query = '{getAllTables{name available dealer shoe{id round{id cards{ banker{first second third} player{first second third}}}}}}'
        return this.callApis(query)
    }

    changeShoe() {
        var queryRequest = `changeShoe(table:{name:"${this.selectedTableName}"})`
        var queryResponse = '{name shoe{ id round{id}}}'
        var query = `mutation{${queryRequest}${queryResponse}}`
        return this.callApis(query)
    }

    changeDealer(dealerName) {
        var queryRequest = `changeDealer(table:{name:"${this.selectedTableName}"}, dealer: {username: "${dealerName}"})`
        var queryResponse = '{name dealer}'
        var query = `mutation{${queryRequest}${queryResponse}}`
        return this.callApis(query)
    }

    nextRound(betDuration) {
        var queryRequest = `startRound(table:{name:"${this.selectedTableName}"}, round:{countdown:${betDuration}})`
        var queryResponse = '{dealer shoe{id round{id}}}'
        var query = `mutation{${queryRequest}${queryResponse}}`
        return this.callApis(query)
    }

    dealCard(value, position) {

        var cardValue = String(value).toUpperCase()

        var queryRequest = `dealCard(table:{name:"${this.selectedTableName}"}, card: {card: "${cardValue}", destination: ${position}})`
        var queryResponse = '{shoe{id round{ cards{ banker{first second third} player{first second third}}}}}'
        var query = `mutation{${queryRequest}${queryResponse}}`
        return this.callApis(query)
    }

    voidHand() {
        var queryRequest = `voidHand(table:{name:"${this.selectedTableName}"})`
        var queryResponse = '{shoe{id}}'
        var query = `mutation{${queryRequest}${queryResponse}}`
        return this.callApis(query)
    }



}

export default ServiceStore