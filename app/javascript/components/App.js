import React, { useState } from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import AddBook from './Book/AddBook'
import BookList from './Book/BookList'
import EditBook from './Book/EditBook'
import AddDiary from './Diary/AddDiary'
import DiaryList from './Diary/DiaryList'
import EditDiary from './Diary/EditDiary'
import './App.css'
import { IoMdMenu } from "react-icons/io";
import EditUser from './User/EditUser'

// const Navbar = styled.nav`
//   background: #dbfffe;
//   min-height: 8vh;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
// `

const Navbar = styled.nav`
  min-height: 8vh;
`

const Logo = styled.div`
  font-weight: bold;
  font-size: 36px;
  letter-spacing: 3px;
`

const NavItems = styled.ul`
  width: 400px;
  max-width: 40%;
  justify-content: space-around;
  list-style: none;
`

const NavItem = styled.li`
  font-size: 19px;
  font-weight: bold;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
  min-height: 500px;
`

function App() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navigate = useNavigate();
  
    const toggleNav = () => {
      setIsNavOpen(!isNavOpen);
    };

    const signOutUser = () => {
      if (window.confirm('Are you sure you want to sign out?')) {
        fetch('/users/sign_out', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          },
          credentials: 'same-origin',  // 認証情報を含める場合
        })
        .then(response => {
          if (response.ok) {
            // サインアウト成功時の処理
            console.log('Signed out successfully');
            // リダイレクトや状態の更新など
            navigate('homes/top');
          } else {
            // エラーハンドリング
            console.error('Failed to sign out');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    }
    

  return (
    <>
      <Navbar className='navbar navbar-dark bg-dark px-5'>
        <Logo className='text-white'>
          Reading Diary
        </Logo>
        <button 
        className="navbar-toggler p-0 border-0" 
        type="button" id="navbarSideCollapse" 
        aria-label="ナビゲーションの切替"
        onClick={toggleNav}
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`navbar-collapse offcanvas-collapse ${isNavOpen ? 'd-block' : 'd-none'}`} 
        id='navbarNav'>
          <NavItems className='navbar-nav'>
            <NavItem className='navbar-item'>
              <Link to="/books" className='navbar-link text-white-50'>
                Books
              </Link>
            </NavItem>
            <NavItem className='navbar-item'>
              <Link to="/books/new" className='navbar-link text-white-50'>
                Add New Books
              </Link>
            </NavItem>
            <NavItem className='navbar-item'>
              <Link to="/diaries" className='navbar-link text-white-50'>
                Diary
              </Link>
            </NavItem>
            <NavItem className='navbar-item'>
              <Link to="/diaries/new" className='navbar-link text-white-50'>
                Add New Diary
              </Link>
            </NavItem>
            <NavItem className='navbar-item'>
              <div onClick={signOutUser} className='navbar-link text-white-50'>
                Log Out
              </div>
            </NavItem>
          </NavItems>
        </div>
      </Navbar>
      


      <Wrapper className='container'>
        <Routes>
          <Route exact path="/books" element={<BookList />} />
          <Route exact path="/books/new" element={<AddBook />} />
          <Route path="/books/:id/edit" element={<EditBook />} />
          <Route exact path="/diaries" element={<DiaryList />} />
          <Route exact path="/diaries/new" element={<AddDiary />} />
          <Route path="/diaries/:id/edit" element={<EditDiary />} />
          <Route path="/user/:id/edit" element={<EditUser />} />
        </Routes>
      </Wrapper>
    </>
  )
}

export default App