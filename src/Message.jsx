import './App.css'

const Message = ({ message, isPositive }) => {

    let tyyli = '';

    if (isPositive === true) {
        tyyli = "pos"
    }
    else {
        tyyli = "neg"
    }

    return (
        <div className={tyyli}>
            {message}
        </div>
    )
}

export default Message