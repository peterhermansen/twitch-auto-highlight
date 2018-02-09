import React from 'react'

export default class SearchApp extends React.Component {

  constructor() {
    super()
    this.state = {searchValue: ''}

    this.handleNewHash = this.handleNewHash.bind(this)
  }

  componentDidMount() {
    this.setState({searchValue: window.location.hash.slice(1)})
    window.addEventListener('hashchange', this.handleNewHash)
  }

  handleNewHash() {
    this.setState({searchValue: window.location.hash.slice(1)})
  }

  onChange(event) {
    this.setState({searchValue: event.target.value})
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) window.location.hash = event.target.value
  }

  render() {
    return (
      <div id="search-div">
        <input id="search-box"
          onKeyDown={this.handleKeyDown}
          value={this.state.searchValue}
          onChange={(value) => this.onChange(value)}
          type="text"
          placeholder="Search Channels"
        />
        <img id="search-icon" src="images/search-icon.svg"/>
      </div>
    )
  }

}
