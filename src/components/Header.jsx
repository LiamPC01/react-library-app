export default function Header() {

    function handleClickGenre() {
        console.log("handleClickGenre")
    }
    return (
        <header>

            <section className="navbar-section">
                <div className="header-section-content">
                    <a href="/" className="header-text-container">
                        <h1>Library App</h1>
                        <p>Discover Books With React JS</p>
                    </a>
                    <nav className="navbar">
                        <button onClick={handleClickGenre} className="browse-btn">BROWSE BY GENRE</button>
                        <button className="browse-btn">BROWSE BY DATE</button>
                    </nav>
                </div>
            </section>

            <section className="searchbar-section">
                <div className="header-section-content">
                    <div className="input-container">
                        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input type="text" className="searchbar" placeholder="Search for a book" />
                    </div>
                </div>
            </section>

        </header>

    )
}