import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { AiFillEdit } from 'react-icons/ai'


const RemoveAllButton = styled.button`
  width: auto;
  height: 32px;
  background: #f54242;
  border: none;
  font-weight: 500;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
`

const BookName = styled.span`
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
`

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`

const Div = styled.div`
  min-height: 100px;
  border: 2px solid;
  background-color: #aaa;
`

const DivBooks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/books.json')
    .then(resp => {
      console.log(Array.isArray(resp.data));
      console.log(resp.data);
      setBooks(resp.data);
    })
    .catch(e => {
      console.log(e);
    });
  }, []);

  const removeAllBooks = () => {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios.delete('/api/v1/books/destroy_all')
      .then(resp => {
        setBooks([]);
      })
      .catch(e => {
        console.log(e);
      });
    }
  };

  return (
    <>
      <h1>Book List</h1>
      <Div className='row'>
        <Div className='col-4'>
          <h2>User Info</h2>
        </Div>
        <DivBooks className='col-8'>
          {books.map((val, key) => {
            return (
              <Row key={key}>
                <BookName className='fs-4'>
                  {val.name}
                </BookName>
                <Link to={"/books/" + val.id + "/edit"}>
                  <EditButton>
                    <AiFillEdit />
                  </EditButton>
                </Link>
              </Row>
            );
          })}
          <RemoveAllButton onClick={removeAllBooks}>
            Remove All
          </RemoveAllButton>
        </DivBooks>
      </Div>

    </>
  );
}

export default BookList

