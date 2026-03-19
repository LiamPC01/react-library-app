import { useState } from "react"

export default function Header() {

    const [searchSelected, setSearchSelected] = useState(false)
    const [genreSelected, setGenreSelected] = useState(false)
    const [dateSelected, setDateSelected] = useState(false)

    function handleClickGenre() {

        const genreSelectedState = genreSelected;
        const dateSelectedState = dateSelected;

        setGenreSelected(!genreSelectedState)
        dateSelectedState ? setDateSelected(false) : ""
        //if date is selected set false



    }

    function handleClickDate() {
        const genreSelectedState = genreSelected;
        const dateSelectedState = dateSelected;
        // saving the above two values because this is asynchronus
        setDateSelected(!dateSelectedState)
        genreSelectedState ? setGenreSelected(false) : ""

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
                        <button onClick={handleClickGenre} className={genreSelected ? "browse-btn selected" : "browse-btn"}>BROWSE BY GENRE</button>
                        <button onClick={handleClickDate} className={dateSelected ? "browse-btn selected" : "browse-btn"}>BROWSE BY DATE</button>
                    </nav>
                </div>
            </section>
            <section className="searchbar-section">
                <div className="header-section-content">
                    <div className="input-container">
                        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={searchSelected ? "tomato" : "grey"} >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input type="text" className="searchbar" placeholder="Search for a book"
                            onFocus={() => setSearchSelected(true)}
                            onBlur={() => setSearchSelected(false)}
                        />
                    </div>
                </div>
            </section>
            
                <section className={genreSelected ? "browse-section selected" : "browse-section"}>
                    <div className="header-section-content">
                        <div className="browse-btn-container">
                            <button>Genre</button>
                            <button>Genre</button>
                            <button>Genre</button>
                            <button>Genre</button>
                            <button>Genre</button>
                            <button>Genre</button>
                            <button>Genre</button>
                            <button>Genre</button>
                            <button>Genre</button>
                        </div>
                    </div>
                </section>
                <section className={dateSelected ? "browse-section selected" : "browse-section"}>
                    <div className="header-section-content">
                        <div className="browse-btn-container">
                            <button>Date</button>
                            <button>Date</button>
                            <button>Date</button>
                            <button>Date</button>
                            <button>Date</button>
                            <button>Date</button>
                            <button>Date</button>
                            <button>Date</button>
                            <button>Date</button>
                        </div>
                    </div>
                </section>
            
        </header>
    )
}