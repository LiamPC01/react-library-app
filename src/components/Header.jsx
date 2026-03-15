export default function Header() {

    function handleClickGenre() {
        console.log("handleClickGenre")
    }
    return (
        <header>
            <section>
                <a href="/" className="header-text-container">
                    <h1>Library App</h1>
                    <p>Discover Books With React JS</p>
                </a>
                <nav className="navbar">
                    <button onClick={handleClickGenre} className="browse-btn">BROWSE BY GENRE</button>
                    <button className="browse-btn">BROWSE BY DATE</button>
                </nav>
            </section>
        </header>

    )
}