import { useState, useEffect } from "react"

export default function Library() {

    const [books, setBooks] = useState([])

    function addBookFromURL(url) {
        useEffect(() => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const book = data.items?.[0]?.volumeInfo;
                    setBooks({...books, book})
                    console.log(book)
                });
        }, [])
    }

    addBookFromURL("https://www.googleapis.com/books/v1/volumes?q=deep+work")
    addBookFromURL("https://www.googleapis.com/books/v1/volumes?q=isbn:9780451524232")
    addBookFromURL("https://www.googleapis.com/books/v1/volumes?q=after+the+ice")
    addBookFromURL("https://www.googleapis.com/books/v1/volumes?q=isbn:9780571192588")

console.log("books array:" + books)


// above code is temporary, useffect should not be inside a function
    
    return (
        <section>
            <p>Library Component</p>
        </section>


    )
}