import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from 'first/styles/Home.module.css'
import searchGoogleScholar from './api/hello'
import { useState } from 'react';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  async function handleSubmit(event) {
    event.preventDefault();
    console.log('Submitting form with query:', query);
    const results = await searchGoogleScholar(query);
    console.log ({results}) ;
    setResults(results);
  }

  function handleChange(event) {
    setQuery(event.target.value);
  }
  return (
    <>
      <div>
      <Head>
        <title>Google Scholar Search</title>
        <meta name="description" content="Google Scholar Search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <h1>Google Scholar Search</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="query">Search query:</label>
          <input type="text" id="query" value={query} onChange={handleChange} />
          <button type="submit">Search</button>
        </form>

        {results.length > 0 && (
          <div>
            <h2>Search results:</h2>
            <ul>
              {results.map((result, index) => (
                <li key={index}>
                  <a href={result.url}>{result.title}</a>
                  {result.authors && <p>Authors: {result.authors.join(', ')}</p>}
                  {result.year && <p>Year: {result.year}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
    </>
  )
}
