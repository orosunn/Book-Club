const apiKey = 'AIzaSyAOVgR0qzmaflGuHQxiy2_mQOr8-nC0d70'

import { useState, useEffect } from 'react';


// once the backend is running, replace fetchBooksFromApi function with a query
export default function Books() {
    const [books, setBooks] = useState([]);
    useEffect(function () {
        async function fetchBooksFromAPI() {
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=''&maxResults=10&key=${apiKey}`);
                const data = await response.json()
                setBooks(data.items)
            } catch (error) {
                console.error('Error fetching books from Google Books API:', error);
                return [];
            }
        }
        fetchBooksFromAPI();
    }, [])
    return (
        <div className="books-page">
            <p>This is the books page</p>
            {
                books.map(function (book) {
                    return (
                        <div class="ui card">
                            <a class="image" href="#">
                                <img src={book.volumeInfo.imageLinks.thumbnail} />
                            </a>
                            <div class="content">
                                <a class="header" href="#">{book.volumeInfo.title}</a>
                                <div class="meta">
                                    <a>{book.volumeInfo.authors}</a>
                                </div>
                            </div>
                        </div>

                    )
                })
            }
        </div>
    );
};

