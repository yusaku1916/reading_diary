import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 2px 7px;
  margin: 12px 0;
`;

const EditButton = styled.button`
  color: white;
  font-weight: 500;
  font-size: 17px;
  padding: 5px 10px;
  margin: 0 10px;
  background: #0ac620;
  border-radius: 3px;
  border: none;
`;

const DeleteButton = styled.button`
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  padding: 5px 10px;
  background: #f54242;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const PublicId = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

toast.configure();

function EditDiary(props) {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const [currentDiary, setCurrentDiary] = useState(initialDiaryState);
  const [books, setBooks] = useState([]);
  

  const notify = () => {
    toast.success("Diary successfully updated!", {
      position: "bottom-center",
      hideProgressBar: true
    });
  };

  const getDiary = id => {
    axios.get(`/api/v1/diaries/${id}`)
      .then(resp => {
        console.log(resp.data);
        setCurrentDiary(resp.data.diary);
        // console.log(resp.data.diary);
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  const getBooks = id => {
    axios.get(`/api/v1/diaries/${id}`)
      .then(resp => {
        setBooks(resp.data.books);
        // console.log(resp.data.books);
      })
      .catch(e => {
        console.log(e);
      });
    };
  



  useEffect(() => {
    if (id) {
      getDiary(id);
      getBooks(id);
    }
  }, [props.match]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentDiary({ ...currentDiary, [name]: value });
  };

  const updateDiary = () => {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    axios.patch(`/api/v1/diaries/${currentDiary.id}`, currentDiary, {
      headers: {
        'X-CSRF-Token': token // トークンをヘッダーに含める
      }
    })
    .then(resp => {
      notify();
      navigate("/diaries");
    })
    .catch(e => {
      console.log(e);
    });
  };

  const deleteDiary = () => {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios.delete(`/api/v1/diaries/${currentDiary.id}`)
      .then(resp => {
        console.log(resp.data);
        props.history.push("/diaries");
      })
      .catch(e => {
        console.log(e);
      });
    }
  };

  return (
    <>
      <h1>Editing Diary</h1>
      <div>
        <div>
          <label htmlFor="date" className='fs-5'>Date</label>
          <Input
            type="date"
            id="date"
            name="date"
            value={currentDiary.date}
            onChange={handleInputChange}
          />
          <label htmlFor="time" className='fs-5'>Time</label>
          <Input
            type="number"
            id="time"
            required
            value={currentDiary.time}
            onChange={handleInputChange}
            name="time"
          />
          <label htmlFor="title" className='fs-5'>Title</label>
          <Input
            type="text"
            id="title"
            name="title"
            value={currentDiary.title}
            onChange={handleInputChange}
          />
          <label htmlFor="diary" className='fs-5'>Diary</label>
          <Input
            type="text"
            id="diary"
            name="diary"
            value={currentDiary.comment}
            onChange={handleInputChange}
          />
          <PublicId className='col-4'>
            <label>
              <Input
                type="radio"
                value={1}
                checked={currentDiary.public_id === 1 }
                onChange={handleInputChange}
                name="public_id"
              />
              公開
            </label>
            <label>
              <Input
                type="radio"
                value={2}
                checked={currentDiary.public_id === 2}
                onChange={handleInputChange}
                name="public_id"
              />
              非公開
            </label>
          </PublicId>
        </div>
        <EditButton
          type="submit"
          onClick={updateDiary}
        >
          Update
        </EditButton>
        <DeleteButton
          className="badge badge-danger mr-2"
          onClick={deleteDiary}
        >
          Delete
        </DeleteButton>
      </div>
    </>
  );
}

export default EditDiary;
