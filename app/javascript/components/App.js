import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import AddBook from './AddBook'
import BookList from './BookList'
import EditBook from './EditBook'
import './App.css'

const Navbar = styled.nav`
  background: #dbfffe;
  min-height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Logo = styled.div`
  font-weight: bold;
  font-size: 23px;
  letter-spacing: 3px;
`

const NavItems = styled.ul`
  display: flex;
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
`

function App() {
  return (
    <>
      <Navbar>
        <Logo>
          Reading Diary
        </Logo>
        <NavItems>
          <NavItem>
            <Link to="/books">
              Todos
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/books/new">
              Add New Books
            </Link>
          </NavItem>
        </NavItems>
      </Navbar>
      <Wrapper>
        {/* デバッグ用のコンテンツ */}
        <div>Wrapper Content</div>
        <Routes>
          <Route exact path="/books" element={<BookList />} />
          <Route exact path="/books/new" element={<AddBook />} />
          <Route path="/books/:id/edit" element={<EditBook />} />
        </Routes>
      </Wrapper>
    </>
  )
}

export default App