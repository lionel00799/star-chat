import './MyMessageInput.css'
const MyMessageInput = (props) => {

    return (
        <div className="my-message-input">
            <textarea 
            placeholder="Type something here…" 
            cols={150} rows={6} 
            aria-label="Message">

            </textarea>
        </div>
    )
}

export default MyMessageInput