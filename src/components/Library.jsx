import { useState, useEffect } from "react"

export default function Library({ searchQuery }) {

    const [defaultBooksData, setdefaultBooksData] = useState([
        {
            title: "Deep Work",
            author: "Cal Newport",
            subtitle: "Rules for Focused Success in a Distracted World",
            thumbnail: "https://books.google.com/books/content?id=lZpFCgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            id: "001"


        },
        {
            title: "After The Ice",
            author: "Steven Mithen",
            subtitle: "A Global Human History, 20,000-5000 BC",
            thumbnail: "http://books.google.com/books/content?id=fBJ9AAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            id: "002"
        },
        {
            title: "Tarzan of the Apes",
            author: "Edgar Rice Burroughs",
            subtitle: "tarzan Description blah blah blah",
            thumbnail: "https://books.google.com/books/content?id=2NRFq7hw4f0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            id: "003"
        },
        {
            title: "The Inheritors",
            author: "William Golding",
            subtitle: "Inheritors description blah blah blah",
            thumbnail: "https://books.google.com/books/content?id=Ok-DaBj7GqMC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            id: "004"
        }
    ])

    const [SearchResultsData, setSearchResultsData] = useState([])

    const [pageIndex, setPageIndex] = useState(0)

    // Clear books shown if searchquery changes and input is empty or whitespace
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResultsData([])
            return
        }
        setPageIndex(0)
        setSearchResultsData([])


    }, [searchQuery])



    useEffect(() => {
        if (!searchQuery) {
            setSearchResultsData([])
            return
        }
        const searchFormatted = searchQuery.split(" ").join("+")
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchFormatted}&key=AIzaSyAFh3jqb7IGPoTrh4q8q1WrVOuFmQsvdis&maxResults=10&startIndex=${pageIndex}`)
            .then(res => res.json())
            .then(data => {
                if (!data.items) {
                    setSearchResultsData([])
                    return
                }
                const books = data.items.map(item => ({
                    id: item.id,
                    title: item.volumeInfo.title,
                    author: item.volumeInfo.authors?.[0] || "Unknown Author",
                    subtitle: item.volumeInfo.subtitle || "",
                    thumbnail: item.volumeInfo.imageLinks?.thumbnail
                }))
                setSearchResultsData(prev => [...prev, ...books])
            })

    }, [searchQuery, pageIndex])

    const defaultBooks = defaultBooksData.map(book => (
        <div className="book-card" key={book.id}>
            <img src={book.thumbnail}></img>
            <div className="book-card-text">
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
                <p>{book.subtitle}</p>
            </div>


        </div>
    ))

    const searchResults = SearchResultsData.map(book => (
        <div className="book-card" key={book.id}>
            <img src={book.thumbnail}></img>
            <div className="book-card-text">
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
                <p>{book.subtitle}</p>
            </div>
        </div>
    ))


    function handleLoadBooks() {
        setPageIndex(prev => prev + 10)
    }
    return (
        <>
            {!searchQuery && <div className="book-card-parent-container">
                <h1>Editors Picks</h1>
                <section className="books-card-container">
                    {defaultBooks}
                </section>
                <button className="load-btn">Load More Books</button>
            </div>}

            {searchQuery && <div className="book-card-parent-container">
                <h1>Search Results</h1>
                <section className="books-card-container">
                    {searchResults}
                </section>
                <button onClick={handleLoadBooks} className="load-btn">LOAD MORE BOOKS</button>
            </div>}
        </>



    )
}
