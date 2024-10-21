import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InputName = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 2px 7px;
  margin: 12px 0;
`;

const CurrentStatus = styled.div`
  font-size: 19px;
  margin: 8px 0 12px 0;
  font-weight: bold;
`;

const IsCompeletedButton = styled.button`
  color: #fff;
  font-weight: 500;
  font-size: 17px;
  padding: 5px 10px;
  background: #f2a115;
  border: none;
  border-radius: 3px;
  cursor: pointer;
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

toast.configure();

function EditBook(props) {
  const initialBookState = {
    id: null,
    name: "",
    author: "",
    start_day: "",
    is_completed: false
  };
  const [currentBook, setCurrentBook] = useState(initialBookState);

  const notify = () => {
    toast.success("Book successfully updated!", {
      position: "bottom-center",
      hideProgressBar: true
    });
  };

  const getBook = id => {
    axios.get(`/api/v1/books/${id}`)
    .then(resp => {
      setCurrentBook(resp.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  useEffect(() => {
    console.log(props.match); // これで `match` オブジェクトが存在するか確認します
    if (props.match && props.match.params && props.match.params.id) {
      getBook(props.match.params.id);
    }
  }, [props.match]);
  

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

  const updateIsCompleted = (val) => {
    var data = {
      id: val.id,
      name: val.name,
      is_completed: !val.is_completed
    };
    axios.patch(`/api/v1/books/${val.id}`, data)
    .then(resp => {
      setCurrentBook(resp.data);
    });
  };

  const updateBook = () => {
    axios.patch(`/api/v1/books/${currentBook.id}`, currentBook)
    .then(response => {
      notify();
      props.history.push("/books");
    })
    .catch(e => {
      console.log(e);
    });
  };

  const deleteBook = () => {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios.delete(`/api/v1/books/${currentBook.id}`)
      .then(resp => {
        console.log(resp.data);
        props.history.push("/books");
      })
      .catch(e => {
        console.log(e);
      });
    }
  };

  return (
    <>
      <h1>Editing Book</h1>
      <div>
        <div>
          <label htmlFor="name">Current Name</label>
          <InputName
            type="text"
            id="name"
            name="name"
            value={currentBook.name}
            onChange={handleInputChange}
          />
          <div>
            <span>Current Status</span><br/>
            <CurrentStatus>
              {currentBook.is_completed ? "Completed" : "UnCompleted"}
            </CurrentStatus>
          </div>
        </div>
        {currentBook.is_completed ? (
          <IsCompeletedButton
            className="badge badge-primary mr-2"
            onClick={() => updateIsCompleted(currentBook)}
          >
            UnCompleted
          </IsCompeletedButton>
        ) : (
          <IsCompeletedButton
            className="badge badge-primary mr-2"
            onClick={() => updateIsCompleted(currentBook)}
          >
            Completed
          </IsCompeletedButton>
        )}
        <EditButton
          type="submit"
          onClick={updateBook}
        >
          Update
        </EditButton>
        <DeleteButton
          className="badge badge-danger mr-2"
          onClick={deleteBook}
        >
          Delete
        </DeleteButton>
      </div>
    </>
  );
}

export default EditBook;
