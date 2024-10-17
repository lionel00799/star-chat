import './Button.css'

const AddFriendButton = (props) => {
    return (
        <button className="add-friend-btn" onClick={props.onClick}>
            <div class="add-friend-plus">+</div>
            <div class="add-friend-text">Add Friend</div>
        </button>
    )
}

export { AddFriendButton }