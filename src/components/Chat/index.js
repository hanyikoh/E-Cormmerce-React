import React from 'react'
import './styles.scss'

const Chat = () => {
    return (
        <div className="chatWindow">
            <div className="chatSide">
                <ul>
                    <li>
                        Chat 1
                    </li>
                    <li>
                        Chat 2
                    </li>
                </ul>
            </div>
            <div className="chatRoom">
                <div className="chatHead">

                </div>
                <form className="chatInput">
                    <input className="chatInputBox" type="text"/>
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat;

