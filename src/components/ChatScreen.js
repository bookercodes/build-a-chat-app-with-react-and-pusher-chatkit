import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import TypingIndicator from './TypingIndicator'

class ChatScreen extends Component {
constructor(props) {
  super(props)
  this.state = {
    currentUser: {},
    currentRoom: {},
    messages: [],
    usersWhoAreTyping: [],
  }
  this.sendMessage = this.sendMessage.bind(this)
  this.sendTypingEvent = this.sendTypingEvent.bind(this)
}

sendTypingEvent() {
  this.state.currentUser
  .isTypingIn({ roomId: this.state.currentRoom.id })
  .catch(error => console.error('error', error))
}

sendMessage(text) {
  this.state.currentUser.sendMessage({
    text,
    roomId: this.state.currentRoom.id,
  })
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
    return currentUser.subscribeToRoom({
      roomId: "19392820",
      messageLimit: 100,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message],
          })
        },
        onUserStartedTyping: user => {
          this.setState({
            userWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
          })
        }
      },
      onUserStoppedTyping: user => {
        this.setState({
          usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
            username => username !== user.name
          ),
        })
      },
    })
  })
  .then(currentRoom => {
    this.setState({ currentRoom })
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
              <MessageList
              messages={this.state.messages}
              style={styles.chatList}
              />
              <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
              <SendMessageForm
              onSubmit={this.sendMessage}
              onChange={this.sendTypingEvent}
              />
          </section>
        </div>
      </div>
    )
  }
}

export default ChatScreen
