import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';



const App = () => {
  return (
    <div className='container'>
      <h1 className='title'>Image Search</h1>
      <div className='search-section'>
        <Form>
          <Form.Control
            type='search'
            placeholder='Type somthing to search'
            className='search-input'
          />
        </Form>
      </div>
    </div>
  )
};

export default App
