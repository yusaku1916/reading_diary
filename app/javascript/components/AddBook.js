import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// react-toastifyをダウングレードしたらできた。@7.0.3
// import 'react-toastify';
import { FiSend } from 'react-icons/fi';

toast.configure();

const InputAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const InputName = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 2px 7px;
`;

const Button = styled.button`
  font-size: 20px;
  border: none;
  border-radius: 3px;
  margin-left: 10px;
  padding: 2px 10px;
  background: #1E90FF;
  color: #fff;
  text-align: center;
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor: default;
  `}
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`;


function AddBook(props) {
  const today = new Date().toISOString().substring(0, 10);
  const initialBookState = {
    id: null,
    name: "",
    author: '',
    start_day: today,
    is_completed: false
  };
  const [book, setBook] = useState(initialBookState);

  const notify = () => {
    toast.success("Book successfully created!", {
      position: "bottom-center",
      hideProgressBar: true
    });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const saveBook = () => {
    var data = {
      book: {
        name: book.name,
        author: book.author,
        start_day: book.start_day,
      }
    };
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    axios.post('/api/v1/books', data, {
      headers: {
        'X-CSRF-Token': token // トークンをヘッダーに含める
      }
    })
    .then(resp => {
      setBook({
        id: resp.data.id,
        name: resp.data.name,
        name: resp.data.author,
        name: resp.data.start_day,
        is_completed: resp.data.is_completed
      });
      notify();
      props.history.push("/books");
    })
    .catch(e => {
      console.log(e);
    });
  };

  return (
    <>
      <h1>New Book</h1>
      <InputAndButton>
        <InputName
          type="text"
          required
          value={book.name}
          onChange={handleInputChange}
          name="name"
        />        
        <InputName
          type="text"
          required
          value={book.author}
          onChange={handleInputChange}
          name="author"
        />
        <InputName
          type="date"
          required
          value={book.start_day}
          onChange={handleInputChange}
          name="start_day"
        />
        <Button
          onClick={saveBook}
          disabled={(!book.name || /^\s*$/.test(book.name) || !book.author.trim() || !book.start_day)}
        >
          <Icon>
            <FiSend />
          </Icon>
        </Button>
      </InputAndButton>
    </>
  );
}

export default AddBook;
