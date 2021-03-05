import './App.css'

const Laskuri = ({ luku, setLuku }) => {
    return (
        <>
            <h2>{luku}</h2>

            <button onClick={() => setLuku(luku + 1)}>+ 1</button>

            <button onClick={() => setLuku(luku - 1)}>- 1</button>

            <button onClick={() => setLuku(0)}>Nollaa laskuri</button>
        </>
    )
}

export default Laskuri
