import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import AddBook from './Book/AddBook'
import BookList from './Book/BookList'
import EditBook from './Book/EditBook'
import AddDiary from './Diary/AddDiary'
import DiaryList from './Diary/DiaryList'
import EditDiary from './Diary/EditDiary'
import './App.css'
import { IoMdMenu } from "react-icons/io";

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
  
    const toggleNav = () => {
      setIsNavOpen(!isNavOpen);
    };

  return (
    <>
      <Navbar className='navbar navbar-dark bg-dark px-5'>
        <Logo className='text-white'>
          Reading Diary
        </Logo>
        <button 
        class="navbar-toggler p-0 border-0" 
        type="button" id="navbarSideCollapse" 
        aria-label="ナビゲーションの切替"
        onClick={toggleNav}
        >
            <span class="navbar-toggler-icon"></span>
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
        </Routes>
      </Wrapper>
    </>
  )
}

export default App