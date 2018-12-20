import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'

class ChatScreen extends Component {
constructor(props) {
  super(props)
  this.state = {
    currentUser: {}
  }
}

componentDidMount () {
  const chatManager = new Chatkit.ChatManager({
    instanceLocator: 'v1:us1:92f6e0ea-dddd-478f-bca6-17bbc528eb78',
    userId: this.props.currentUsername,
    tokenProvider: new Chatkit.TokenProvider({
      url: 'http://localhost:3001/authenticate',
    }),
  })

  chatManager
  .connect()
  .then(currentUser => {
    this.setState({ currentUser })
  })
  .catch(error => console.error('error', error))
}

  render() {
    const styles = {
      container:{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      },
      chatContainer: {
        display: 'flex',
        flex: 1,
      },
      whosOnlineListContainer: {
        width: '300px',
        flex: 'none',
        padding: 20,
        backgroundColor: '#2c303b',
        color: 'white',
      },
      chatListContainer: {
        padding: 20,
        width: '85%',
        display: 'flex',
        flexDirection: 'column',
      },
    }

    return (
      <div style={styles.container}>
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
              <h2>Whos online PLACEHOLDER</h2>
          </aside>
          <section style={styles.chatListContainer}>
              <h2>Chat PLACEHOLDER</h2>
          </section>
        </div>
      </div>
    )
  }
}

export default ChatScreen
