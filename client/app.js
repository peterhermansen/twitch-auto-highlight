import React from 'react'
import NavbarApp from './navbar-app'
import SearchApp from './search-app'

export default class App extends React.Component {

  render() {
    return (
      <div>
        <NavbarApp />
        <SearchApp />
      </div>
    )
  }

}
