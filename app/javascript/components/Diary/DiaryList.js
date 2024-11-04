import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { AiFillEdit } from 'react-icons/ai';
import Profile from '../User/Profile'

const DiaryName = styled.span`
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
`;

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`;

const Div = styled.div`
  min-height: 100px;
  border: 2px solid;
  background-color: #aaa;
`

function DiaryList() {
  const [diaries, setDiaries] = useState([]);
  const [user, setUser] = useState({});
  const [profileImageUrl, setProfileImageUrl] = useState('');

  useEffect(() => {
    axios.get('/api/v1/diaries.json')
      .then(resp => {
        setDiaries(resp.data.diaries);
        setUser(resp.data.user);
        setProfileImageUrl(resp.data.profile_image_url);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);


  return (
    <>
      <h1>Diary List</h1>
      <Div className='row'>
        <Div className='col-4'>
          <Profile data = { user } image = { profileImageUrl }/>
        </Div>
        <Div className='col-8'>
          {diaries.map((val, key) => {
            return (
              <Row key={key}>
                <DiaryName className='fs-4'>
                  {val.title}<br/><div className='fs-6'>({val.date})</div>
                </DiaryName>
                <Link to={"/diaries/" + val.id + "/edit"}>
                  <EditButton>
                    <AiFillEdit />
                  </EditButton>
                </Link>
              </Row>
            );
          })}
        </Div>
      </Div>
    </>
  );
}

export default DiaryList;
