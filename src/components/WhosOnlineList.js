import React from "react";

export default function WhosOnlineList(props) {
    if (props.users) {
        return (
            <ul>
                {props.users.map((user, index) => {
                    if (user.id === props.currentUser.id) {
                        return (
                            <WhosOnlineListItem key={index} presenceState="online">
                                {user.name} (You)
                        </WhosOnlineListItem>
                        )
                    }
                    return (
                        <WhosOnlineListItem key={index} presenceState={user.presence.state}>
                            {user.name}
                        </WhosOnlineListItem>
                    )
                })}
            </ul>
        )
    } else {
        return <p>Loading...</p>
    }
}

function WhosOnlineListItem(props) {
    const styles = {
        li: {
            display: 'flex',
            alignItems: 'center',
            marginTop: 5,
            marginBottom: 5,
            paddingTop: 2,
            paddingBottom: 2,
        },
        div: {
            borderRadius: '50%',
            width: 11,
            height: 11,
            marginRight: 10,
        },
    }
    return (
        <li style={styles.li}>
            <div
                style={{
                    ...styles.div,
                    backgroundColor: props.presenceState === 'online' ? '#539eff' : '#414756',
                }}
            />
            {props.children}
        </li>
    )
}
