import React, {useState} from 'react'
import Chat from '../Chat'
import './styles.scss'

const FloatingButton = () => {

    const [open, setOpen] = useState(false)

    return (
        <div className="fab-container">
            <div className="fab fab-holder">
                <i class="fas fa-plus"></i>
            </div>

            <ul className="fab-options">
                <li>
                    <span className="fab-label">Feeedback</span>
                    <div className="fab-holder">
                        <i class="fas fa-comment-alt"></i>
                    </div>
                </li>
                <li>
                    <span className="fab-label">Live Chat</span>
                    <div className="fab-holder">
                        <i class="fas fa-comments"></i>
                    </div>
                </li>
            </ul>
            <Chat setOpen={setOpen} open={open}/>
        </div>
    )
}

export default FloatingButton;