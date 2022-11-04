import { computed, action, observable } from "mobx"

export class AppStore {
    static START_ROUND = "START_ROUND"
    static BET_OPEN = "BET_OPEN"
    static CARD_DEALT = "CARD_DEALT"
    static END_ROUND = "END_ROUND"

    @observable gameState
    @observable dealerName
    @observable supervisorName
    @observable tableName
    @observable shoeNumber
    @observable roundId
    @observable betDuration = 10000   //todo, bet betDuration in config

    serviceStore

    constructor(serviceStore) {
        this.serviceStore = serviceStore

        //to initialize, remove when state is available already
        this.setGameState(AppStore.END_ROUND)
    }

    @computed
    get isBetOpen() {
        return (this.gameState == AppStore.BET_OPEN)
    }

    @computed
    get isStartRound() {
        return (this.gameState == AppStore.START_ROUND)
    }

    @computed
    get isCardDealt() {
        return (this.gameState == AppStore.CARD_DEALT)
    }

    @computed
    get isEndRound() {
        return (this.gameState == AppStore.END_ROUND)
    }

    @computed
    get isChangeDealerAllowed() {
        return (this.gameState == AppStore.END_ROUND)
    }

    @computed
    get isChangeShoeAllowed() {
        return (this.gameState == AppStore.END_ROUND)
    }

    @computed
    get isRollbackAllowed() {
        //todo: should count card available
        return (this.gameState == AppStore.CARD_DEALT ||
            this.gameState == AppStore.RESULT_SHOWN)
    }

    @computed
    get isVoidHandAllowed() {
        return (this.gameState == AppStore.BET_OPEN ||
            this.gameState == AppStore.CARD_DEALT ||
            this.gameState == AppStore.RESULT_SHOWN)
    }

    @computed
    get newChangeShoeNumber() {
        return this.shoeNumber + 1
    }

    @computed
    get betDurationInSeconds(){
        return this.betDuration/1000
    }

    @action("set dealer name")
    setDealerName(value) {
        this.dealerName = value
    }

    @action("set supervisor name")
    setSupervisorName(value) {
        this.supervisorName = value
    }

    @action("set table name")
    setTableName(value) {
        this.tableName = value

        //for graphql calls
        this.serviceStore.setSelectedtableName(value)
    }

    @action("set game state")
    setGameState(value) {
        this.gameState = value
    }

    @action("set shoe number")
    setShoeNumber(value) {
        this.shoeNumber = value
    }

    @action("set round id")
    setRoundId(value) {
        this.roundId = value
    }

    @action("initializes table")
    initializeTable(selectedTable) {
        this.setTableName(selectedTable.name)
        this.setDealerName(selectedTable.dealer)

        if (selectedTable.shoe) {
            this.setShoeNumber(selectedTable.shoe.id)

            if (selectedTable.shoe.round) {
                this.setRoundId(selectedTable.shoe.round.id)
    
                //existing on-going game
                if(selectedTable.shoe.round.cards){
                    this.setGameState(AppStore.CARD_DEALT)
                }
            }    
        }
    }

    @action("next round")
    nextRound() {
        return this.serviceStore.nextRound(this.betDuration)
            .then(result => {
                //note: some of this already been fetched from table selection
                this.setDealerName(result.data.startRound.dealer)
                this.setShoeNumber(result.data.startRound.shoe.id)
                this.setRoundId(result.data.startRound.shoe.round.id)

                return result
            })
            .catch(error => {
                throw error
            })
    }

    @action("change shoe")
    changeShoe() {
        return this.serviceStore.changeShoe()
            .then(result => {
                this.setShoeNumber(result.data.changeShoe.shoe.id)

                if (result.data.changeShoe.shoe.round) {
                    this.setRoundId(result.data.changeShoe.shoe.round.id)
                } else {
                    this.setRoundId(null)
                }

                return result
            })
            .catch(error => {
                throw error
            })
    }

    @action("change dealer")
    changeDealer(dealerName) {
        return this.serviceStore.changeDealer(dealerName)
            .then(result => {
                this.setDealerName(result.data.changeDealer.dealer)                
                return result
            })
            .catch(error => {
                throw error
            })
    }
   
    @action("void hand")
    voidHand() {
        return this.serviceStore.voidHand()
            .then(result => {
                return result
            })
            .catch(error => {
                throw error
            })
    }

    

    @action("reset")
    reset() {
        this.setGameState(AppStore.END_ROUND)
        this.setDealerName(null)
        this.setSupervisorName(null)
        this.setTableName(null)
        this.setShoeNumber(null)
    }
}

export default AppStore