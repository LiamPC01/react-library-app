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



    let startIndex = 0
    const target = 20
    const delay = ms => new Promise(res => setTimeout(res, ms));


    async function fetchBooks() {

        

        while (startIndex < target) {
            console.log("fetch")
            const searchFormatted = searchQuery.split(" ").join("+")
            let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchFormatted}&orderBy=newest&key=AIzaSyAFh3jqb7IGPoTrh4q8q1WrVOuFmQsvdis&maxResults=10&startIndex=${startIndex}`)

            if (response.status === 429) {
                console.log("429 error. Delaying...");
                await delay(1500);
                continue;
            }

            let data = await response.json()


            if (!data.items) {
                setSearchResultsData([])
                return
            }
            //there are books, make an array of them
            const books = data.items.map(item => ({
                id: item.id,
                title: item.volumeInfo.title,
                author: item.volumeInfo.authors?.[0] || "Unknown Author",
                subtitle: item.volumeInfo.subtitle || "",
                thumbnail: item.volumeInfo.imageLinks?.thumbnail,
                ratingsCount: item.volumeInfo.ratingsCount,
                averageRating: item.volumeInfo.averageRating
            }))
            //make an array of the books with reviews
            const filteredBooks = books.filter(book => book.ratingsCount >= 5 && book.averageRating >= 3)


            setSearchResultsData(prev => {
                const existingIds = new Set(prev.map(book => book.id)) // list existing ids

                const newBooks = filteredBooks.filter( // create new array without existing ids
                    book => !existingIds.has(book.id)
                )
                return [...prev, ...newBooks] //return new books not already in results
            })
            if(SearchResultsData.length > 1) {
                break
            }

            startIndex += 10

        }



    }

    // &startIndex=${pageIndex}


    // Runs when search query changes
    useEffect(() => {
        setSearchResultsData([]) // reset search results every change for now

        if (searchQuery) {
            fetchBooks()
        }

    }, [searchQuery])





    const defaultBooks = defaultBooksData.map(book => (
        <div className="book-card" key={`{book.id}-${book.title}`}>
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


    // function handleLoadBooks() {
    //     setPageIndex(prev => prev + 10)
    // }
    return (
        <>
            {!searchQuery && <div className="book-card-parent-container">
                <h1>Editors Picks</h1>
                <section className="books-card-container">
                    {defaultBooks}
                </section>
            </div>}

            {searchQuery && <div className="book-card-parent-container">
                <h1>Search Results</h1>
                <section className="books-card-container">
                    {searchResults}
                </section>
                {/* <button onClick={handleLoadBooks} className="load-btn">LOAD MORE BOOKS</button> */}
            </div>}
        </>



    )
}
