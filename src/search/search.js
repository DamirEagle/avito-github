import React from "react"

class search extends React.Component {

    constructor() {
        super();
        this.state = {
            search: "",
            timerActivated: false
        }
    }
    async componentDidMount() {
        if (this.state.search !== localStorage.getItem("search")) {
            await this.setState({ ...this.state, search: localStorage.getItem("search") })
            if (!this.state.timerActivated) {
                await this.setState({ ...this.state, timerActivated: true })
                setTimeout(this.inOneSecond, 1500)
            }
        }
    }
    render() {
        return (
            <form>
                <input type="text" onChange={e => { this.onInputChange(e) }} placeholder="search" value={localStorage.getItem("search")}></input>
            </form>
        )
    }

    onInputChange = async (e) => {
        localStorage.setItem("search", e.target.value)
        await this.setState({ ...this.state, search: e.target.value })
        if (!this.state.timerActivated) {
            await this.setState({ ...this.state, timerActivated: true })
            setTimeout(this.inOneSecond, 1000)
        }
    }

    inOneSecond = () => {
        this.props.onInputChange(this.state.search)
        this.setState({ ...this.state, timerActivated: false })
    }
}

export default search