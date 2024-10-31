import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiSend } from 'react-icons/fi';
import { Navigate, useNavigate } from 'react-router-dom';


toast.configure();

const InputComment = styled.input`
  font-size: 20px;
  width: 100%;
  height: 200px;
`;

const InputTitle = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
`;

const InputDate = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  text-align: center;
`;

const InputTime = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  text-align: center;
`;

const InputPublicId = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 0 5px;
`;

const PublicId = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const BookIdDiv = styled.div`

`


const Button = styled.button`
  text-align: center;
  cursor: pointer;
  width: 100%;
  
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor: default;
  `}
`

const Div = styled.div`
  min-height: 100px;
  border: 2px solid;
  background-color: #aaa;
`

function AddDiary(props) {
  const navigate =useNavigate();
  const today = new Date().toISOString().substring(0, 10);
  const initialDiaryState = {
    id: null,
    comment: "",
    date: today,
    time: 0,
    public_id: 1,
    title: "",
    book_id: null
  };
  const [diary, setDiary] = useState(initialDiaryState);
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');

  useEffect(() => {
    fetch('/api/v1/books.json') // Railsのエンドポイント
      .then(resp => resp.json())
      .then(data => setBooks(data));
  }, []);

  const notify = () => {
    toast.success("Diary successfully created!", {
      position: "bottom-center",
      hideProgressBar: true
    });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === "public_id" || name === "book_id") {
      setDiary({ ...diary, [name]: parseInt(value, 10) });
    } else {
      setDiary({ ...diary, [name]: value });
    }
  };
  const saveDiary = () => {
    var data = {
      diary: {
        comment: diary.comment,
        date: diary.date,
        time: diary.time,
        public_id: diary.public_id,
        title: diary.title,
        book_id: selectedBookId
      }
    };

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    axios.post('/api/v1/diaries', data, {
      headers: {
        'X-CSRF-Token': token // トークンをヘッダーに含める
      }
    })
    .then(resp => {
      setDiary({
        id: resp.data.id,
        comment: resp.data.comment,
        date: resp.data.date,
        time: resp.data.time
      });
      notify();
      navigate("/diaries");})
    .catch(e => {
      console.log(e);
    });
  };

  return (
    <>
      <h1>New Diary</h1>
        <div className='row'>
          <Div className='col-4'><h2>User Info</h2></Div>
          <Div className='col-8'>
            <div className='row mx-1 my-3' id='DateAndTime'>
              <div className='col-9 pe-1 ps-0'>
                <label htmlFor="date" className='fs-5'>Date</label>
                <InputDate
                  type="date"
                  id="date"
                  required
                  value={diary.date}
                  onChange={handleInputChange}
                  name="date"
                />
              </div>
              <div className='col-3 ps-1 pe-0'>
                <label htmlFor="time" className='fs-5'>Time</label>
                <InputTime
                  type="number"
                  id="time"
                  required
                  value={diary.time}
                  onChange={handleInputChange}
                  name="time"
                />
              </div>
            </div>
            <div className='row mx-1 my-3' id='Title'>
              <label htmlFor="title" className='fs-5'>Title</label>
              <InputTitle
                type="text"
                id="title"
                required
                value={diary.title}
                onChange={handleInputChange}
                name="title"
              />
            </div>
            <div className='row mx-1 my-3' id='Diary'>
              <label htmlFor="comment" className='fs-5'>Diary</label>
              <InputComment
                type="text"
                id="comment"
                required
                value={diary.comment}
                onChange={handleInputChange}
                name="comment"
              />
            </div>
            <div className='row mx-1 my-3' id='PubAndButton'>
              <PublicId className='col-4'>
                <label>
                  <InputPublicId
                    type="radio"
                    value={1}
                    checked={diary.public_id === 1 }
                    onChange={handleInputChange}
                    name="public_id"
                  />
                  公開
                </label>
                <label>
                  <InputPublicId
                    type="radio"
                    value={2}
                    checked={diary.public_id === 2}
                    onChange={handleInputChange}
                    name="public_id"
                  />
                  非公開
                </label>
              </PublicId>
              <BookIdDiv className='col-8 d-flex flex-column justify-content-center align-items-center'>
                <label htmlFor="select-book" className='text-start fs-5'>Book</label>
                <select
                  id="select-book"
                  value={selectedBookId}
                  onChange={e => setSelectedBookId(parseInt(e.target.value, 10))}
                >
                  <option value=""></option>
                  {books.map(book => (
                    <option key={book.id} value={book.id}>
                      {book.name}
                    </option>
                  ))}
                </select>
              </BookIdDiv>
            </div>
            <div className='row mx-1 my-3 d=flex justify-content-center' id='Book'>
              <ButtonDiv className='w-75'>
                <Button className='btn btn-info'
                  onClick={saveDiary}
                  disabled={(/^\s*$/.test(diary.comment) || !diary.public_id || !diary.time || !diary.date)}
                >
                  <FiSend />
                </Button>
              </ButtonDiv>
            </div>
          </Div>
        </div>
    </>
  );
}

export default AddDiary;


