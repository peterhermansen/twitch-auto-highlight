import React from 'react'

export default class SearchApp extends React.Component {

  constructor() {
    super()
    this.state = {searchValue: ''}

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleNewHash = this.handleNewHash.bind(this)
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.handleNewHash, false)
  }

  onChange(event) {
    this.setState({searchValue: event.target.value})
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) window.location.hash = event.target.value
  }

  handleNewHash() {
    const hash = window.location.hash.slice(1).toLowerCase()
    this.setState({searchValue: hash})
  }

  render() {
    return (
      <div id="search-div">
        <input id="search-box"
          onKeyDown={this.handleKeyDown}
          type="text"
          placeholder="Search Channels"
          value={this.state.searchValue}
          onChange={(value) => this.onChange(value)}
        />
        <img id="search-icon" src="images/search-icon.svg"/>
      </div>
    )
  }

}
