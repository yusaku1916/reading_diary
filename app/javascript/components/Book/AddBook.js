import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// react-toastifyをダウングレードしたらできた。@7.0.3
// import 'react-toastify';
import { FiSend } from 'react-icons/fi';
import { Navigate, useNavigate } from 'react-router-dom';
import Profile from '../User/Profile'

toast.configure();

const InputAndButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputName = styled.input`
  width: 100%;
  height: 40px;
  padding: 2px 7px;
`;

const Button = styled.button`
  text-align: center;
  cursor: pointer;
  
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor: default;
  `}`

const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content-center;
  margin: 0 7px;
`

const Div = styled.div`
  min-height: 100px;
  border: 2px solid;
  background-color: #aaa;
`

const DateAndButton = styled.div`
`


function AddBook(props) {
  const [user, setUser] = useState({});
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const navigate =useNavigate();
  const today = new Date().toISOString().substring(0, 10);
  const initialBookState = {
    id: null,
    name: "",
    author: '',
    start_day: today,
  };
  const [book, setBook] = useState(initialBookState);

  useEffect(() => {
    axios.get('/api/v1/books.json')
    .then(resp => {
      setUser(resp.data.user);
      setProfileImageUrl(resp.data.profile_image_url);
    })
    .catch(e => {
      console.log(e);
    });
  }, []);

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
        author: resp.data.author,
        start_day: resp.data.start_day
      });
      notify();
      navigate("/books");
    })
    .catch(e => {
      console.log(e);
    });
  };

  return (
    <>
      <h1>New Book</h1>
      <Div className='row'>
        <Div className='col-4'>
          <Profile data = { user } image = { profileImageUrl }/>
        </Div>
        <InputAndButton className='col-8'>
          <label htmlFor="inputName" className='fs-5'>Name</label>
          <InputName
            type="text"
            id="inputName"
            required
            value={book.name}
            onChange={handleInputChange}
            name="name"
          />        
          <label htmlFor="inputAuthor" className='fs-5'>Author</label>
          <InputName
            type="text"
            id="inputAuthor"
            required
            value={book.author}
            onChange={handleInputChange}
            name="author"
          />
          <DateAndButton className='row w-100'>
            <div className='col-8 ps-0 pe-1'>
              <label htmlFor="inputStartDay" className='fs-5'>読み始め</label>
              <InputName
                type="date"
                id="inputStartDay"
                required
                value={book.start_day}
                onChange={handleInputChange}
                name="start_day"
              />
            </div>
            <Button className='col-4 btn btn-primary h-50 my-auto'
              onClick={saveBook}
              disabled={(!book.name || /^\s*$/.test(book.name) || !book.author.trim() || !book.start_day)}
            >
              <Icon>
                <FiSend />
              </Icon>
            </Button>
          </DateAndButton>


        </InputAndButton>
      </Div>

    </>
  );
}

export default AddBook;
