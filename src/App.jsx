import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
// import './index.css'

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGE_PER_PAGE = 20;
const App = () => {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  //pagination
  const [page, setPage] = useState(0);

  const resetSearch = () => {
    setPage(1);
    fetchImages();
  };

  const handleSearch = (value) => {
    value.preventDefault();
    console.log(searchInput.current.value);
    resetSearch();
  }

  const handleSelection = (value) => {
    searchInput.current.value = value;
    resetSearch();
  }

  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL}?query=${searchInput.current.value
          }&page=${page}&per_page=${IMAGE_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY
          }`
        );
        console.log('data', data)
        setImages(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);


  return (
    <div className='container'>
      <h1 className='title'>Image Search</h1>
      <div className='search-section '>
        <Form onSubmit={handleSearch}>
          <Form.Control
            type='search'
            placeholder='Type somthing to search'
            className='d-flex search-input'
            ref={searchInput}
          />
        </Form>
      </div>
      <div className='filter d-flex justify-content-center'>
        <div className='card bg-primary m-2 p-1' onClick={() => handleSelection('nature')}>Nature</div>
        <div className='card bg-primary m-2 p-1' onClick={() => handleSelection('birds')}>Birds</div>
        <div className='card bg-primary m-2 p-1' onClick={() => handleSelection('Cats')}>Cats</div>
        <div className='card bg-primary m-2 p-1' onClick={() => handleSelection('shoes')}>Shoes</div>
      </div>
      {loading ? (
        <p className='loading'>Loading...</p>
      ) : (
        <>
          <div className='images'>{
            images.map((image) => (
              <img
                key={image.id}
                src={image.urls.small}
                alt={image.alt_description}
                className="m-2 rounded"
                style={{ width: 200, height: 200 }}
              />
            ))
          }
          </div>
          <div className='button'>
            {page > 1 && (
              <Button className='m-3' onClick={() => setPage(page - 1)}>Previous</Button>
            )}
            {
              page > 0 && page
            }
            {page < totalPages && (
              <Button className='m-3' onClick={() => setPage(page + 1)}>Next</Button>
            )}
          </div>
        </>
      )}
    </div>
  )
};

export default App
