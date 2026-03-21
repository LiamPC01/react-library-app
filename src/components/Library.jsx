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

    const [SearchResultsData, setSearchResultsDataDataDataData] = useState([]) //store x amount of books from api to be rendered if searchquery is not empty


    useEffect(() => {
        if (!searchQuery) {
            setSearchResultsDataDataDataData([])
            return
        }
        const searchFormatted = searchQuery.split(" ").join("+")
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchFormatted}&key=AIzaSyAFh3jqb7IGPoTrh4q8q1WrVOuFmQsvdis`)
            .then(res => res.json())
            .then(data => {
                if (!data.items) {
                    setSearchResultsDataDataDataData([])
                    return
                }
                const books = data.items.map(item => ({
                    id: item.id,
                    title: item.volumeInfo.title,
                    author: item.volumeInfo.authors?.[0] || "Unknown Author",
                    subtitle: item.volumeInfo.subtitle || "",
                    thumbnail: item.volumeInfo.imageLinks?.thumbnail
                }))
                setSearchResultsDataDataDataData(books)
            })
        console.log(SearchResultsData)

    }, [searchQuery])

    const defaultBooks = defaultBooksData.map(book => (
        <div className="book-card" key={book.id}>
            <img src={book.thumbnail}></img>
            <div className="book-card-text">
                <h2>{book.title}</h2>
                <p className="author">{book.author}</p>
                <p>{book.subtitle}</p>
            </div>


        </div>
    ))

    const searchResults = SearchResultsData.map(book => (
        <div className="book-card" key={book.id}>
            <img src={book.thumbnail}></img>
            <div className="book-card-text">
                <h2>{book.title}</h2>
                <p className="author">{book.author}</p>
                <p>{book.subtitle}</p>
            </div>
        </div>
    ))
    // render an array of books called editors picks if there is no input within the search bar
    // if there is data in the search bar then the title should change to (search result for "search") and the books rendered should be some of the items returned from the api
    //editors picks does not need to be in state as it does not change?
    //search results array that contains say 10 results
    return (
        <>
            {!searchQuery && <div>
                <h1> Editors Picks</h1>
                <section className="books-card-container">
                    {defaultBooks}
                </section>
            </div>}
            {searchResults && <div>
                <h1> Search Results</h1>
                <section className="books-card-container">
                    {searchResults}
                </section>
            </div>}
        </>



    )
}
