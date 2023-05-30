import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function SearchForm({handleSearch, query, setQuery }) {
  return (
    <form onSubmit={handleSearch}>
                <div className='row g-2'>
                  <div className='col-auto'>
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)} className='form-control'></input>
                  </div>
                  <div className='col-auto'>
                    <button className='btn btn-success'>
                      <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                    </button>
                  </div>
                </div>
              </form>
  )
}
