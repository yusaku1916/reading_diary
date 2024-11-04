import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const InputName = styled.input`
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


function EditUser(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialUserState = {
    id: null,
    name: "",
    introduction: ""
  };
  const [currentUser, setCurrentUser] = useState(initialUserState);

  const notify = () => {
    toast.success("User successfully updated!", {
      position: "bottom-center",
      hideProgressBar: true
    });
  };

  const getUser = id => {
    axios.get(`/api/v1/users/${id}`)
    .then(resp => {
      console.log(resp.data);
      setCurrentUser(resp.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  useEffect(() => {
    if (id){
      getUser(id);
    }
  }, [props.match]);
  

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateUser = () => {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    axios.patch(`/api/v1/users/${currentUser.id}`, currentUser, {
      headers: {
        'X-CSRF-Token': token // トークンをヘッダーに含める
      }
    })
    .then(resp => {
      notify();
      navigate("/books");
    })
    .catch(e => {
      console.log(e);
    });
  };

  return (
    <>
      <h1>Editing User</h1>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <InputName
            type="text"
            id="name"
            name="name"
            value={currentUser.name}
            onChange={handleInputChange}
          />
          <label htmlFor="introduction">Introduction</label>
          <InputName
            type="text"
            id="intorduction"
            name="introduction"
            value={currentUser.introduction}
            onChange={handleInputChange}
          />
        </div>
        <EditButton
          type="submit"
          onClick={updateUser}
        >
          Update
        </EditButton>
      </div>
    </>
  );
}

export default EditUser;

