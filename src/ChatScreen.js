import React, { Component } from "react";
import Chatkit from "@pusher/chatkit-client";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import TypingIndicator from "./components/TypingIndicator";
import WhosOnlineList from "./components/WhosOnlineList";

export default class ChatScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: [],
            usersWhoAreTyping: [],
        }
    }

    sendMessage = (text) => {
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id,
        });
    }

    sendTypingEvent = () => {
        this.state.currentUser
            .isTypingIn({ roomId: this.state.currentRoom.id })
            .catch(error => console.error("error", error))
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: "v1:us1:be5b78ce-ac0c-4305-84d9-50a0f286c003",
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: "/authenticate"
                // unlike in the tutorial, 
            })
        })

        chatManager.connect()
            .then(currentUser => {
                this.setState({ currentUser })
                console.log("you connected");
                return currentUser.subscribeToRoom({
                    roomId: "20092046",
                    messageLimit: 100,
                    hooks: {
                        onMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message],
                            });
                        },
                        onUserStartedTyping: user => {
                            this.setState({
                                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
                            });
                        },
                        onUserStoppedTyping: user => {
                            this.setState({
                                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                    username => username !== user.name
                                )
                            });
                        },
                        onPresenceChange: () => this.forceUpdate(),
                    },
                });
            })
            .then(currentRoom => {
                this.setState({ currentRoom });
            })
            .catch(error => console.error("error", error));
    }

    render() {
        const styles = {
            container: {
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
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
                        <WhosOnlineList
                            currentUser={this.state.currentUser}
                            users={this.state.currentRoom.users}
                        />
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