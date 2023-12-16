import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Logo from '../assets/img.jpg'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(true)

  useEffect(() => {

    const check = async () => {
      if (!localStorage.getItem("url")) {
        setIsLogged(false)
        navigate("/login")
      }
    }

    check();
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("url");
    setIsLogged(!isLogged)
    navigate('/login');
  }

  return (
    <>
      <Container>
        <div className='brand'>
          <img src={Logo} alt='logo' />
          <h2>Deep's Url Shortener</h2>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </Container>
    </>
  )
}

const Container = styled.div`
  min-height:fit-content;
  height:10vh;
  width:100vw;
  display:flex;
  padding: 5px 2px;
  justify-content: space-between;
  align-items:center; 
  background-color:#A7D5DA;

  .brand{
    display:flex; 
    align-items:center;
    justify-content:center;

    img{
      width:100px;
    }

    // h2{
    //   font-size:50px;
    // }
  }

  button{
    background-color:white;
    padding:15px;
    margin:8px 16px;
    width:fit-content;
    font-size:30px;
    border-radius: 0.5rem;
    cursor:pointer;
  }

`

export default Navbar
