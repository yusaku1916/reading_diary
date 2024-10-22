import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { AiFillEdit } from 'react-icons/ai'
import { ImCheckboxUnchecked } from 'react-icons/im';


const SearchAndButtton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SearchForm = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
`

const RemoveAllButton = styled.button`
  width: 16%;
  height: 40px;
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
  font-size: 27px;
  ${({ is_completed }) => is_completed && `
    opacity: 0.4;
  `}
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
`

const CheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: green;
  cursor: pointer;
`

const UncheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    axios.get('/api/v1/books.json')
    .then(resp => {
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
      <SearchAndButtton>
        <SearchForm
          type="text"
          placeholder="Search book..."
          onChange={event => {
            setSearchName(event.target.value);
          }}
        />
        <RemoveAllButton onClick={removeAllBooks}>
          Remove All
        </RemoveAllButton>
      </SearchAndButtton>
      <div>
        {books.filter((val) => {
          if (searchName === "") {
            return val;
          } else if (val.name.toLowerCase().includes(searchName.toLowerCase())) {
            return val;
          }
          return null; // 忘れずに追加
        }).map((val, key) => {
          return (
            <Row key={key}>
              <BookName is_completed={val.is_completed}>
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
      </div>
    </>
  );
}

export default BookList

