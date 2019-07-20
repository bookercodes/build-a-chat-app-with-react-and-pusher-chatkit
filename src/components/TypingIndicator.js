import React from "react";

export default function TypingIndicator (props) {
    return(
        props.usersWhoAreTyping.length > 0 ?
         <div>
             {`${props.usersWhoAreTyping
                .slice(0,2)
                .join(" and ")} is typing`}
         </div>
         :
         <div />
    )
}