import './App.css'

const CustomerAdd = ({ setLisäystila }) => {
    return (
        <>
            <p>Tähän tulee lisäys formi</p>
            <button onClick={() => setLisäystila(false)}>
                Cancel</button>
        </>
    )


}

export default CustomerAdd