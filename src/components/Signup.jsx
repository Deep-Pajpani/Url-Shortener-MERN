import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Logo from '../assets/img.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { signupRoute } from '../utils/APIRoutes'

function Signup() {

    const navigate = useNavigate();

    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {

        const check = async () => {
            if (localStorage.getItem("url")) {
                setIsLogged(true);
                navigate("/shorten")
            }
        }

        check();
    }, [])

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
    });


    const toastOptions = {
        position: "bottom-right",
        draggable: true,
        pauseOnHover: true,
        autoClose: 8000,
        theme: "dark"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { username, email, password } = values;

            try {
                const { data } = await axios.post(signupRoute, {
                    username,
                    email,
                    password
                })
                if (data.status == false) {
                    toast.error(data.msg, toastOptions);
                }
                else {
                    localStorage.setItem("url", data.authtoken);
                }

                navigate("/shorten");
            } catch (er) {
                console.log(er.message)
            }

        }
    }

    const handleValidation = () => {
        const { username, email, password } = values;

        if (username.length <= 3) {
            toast.error("Username should be atleast 4 characters long");
            return 0;
        }
        else if (password.length < 8) {
            toast.error("Password should be atleast 8 characters long");
            return 0;
        }
        else if (email === "") {
            toast.error("Email field should not be empty");
            return 0;
        }

        return 1;
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='brand'>
                        <img src={Logo} alt="logo" />
                        <h1>Deep's Url Shortener</h1>
                    </div>

                    <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} />
                    <input type="email" placeholder="Email" name="email" onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
                    <button type='submit'>Create Account</button>
                    <span>Already have an account ? <Link to="/login">Login</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
   height : 100vh;
   width : 100vw;
   display:flex;
   flex-direction: column;
   justify-content: center;
   gap: 1rem;
   align-items: center;
   background-color: #1C1B32;

   .brand{
    display:flex;
    align-items:center;
    justify-content: center;
    gap: 1rem;

    img{
        height: 5rem;
    }
    h1{
        color: black;
        text-transform: uppercase;
    }
   }

   form{
    display:flex;
    flex-direction:column;
    gap: 2rem;
    background-color: #E8E4E5;
    border-radius: 2rem;
    padding: 3rem 5rem;
    align-items:center;

    input{
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        width:80%;
        color: black;
        font-size:1rem;
    }

    button{
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;

    }

    span{
        color:black;
        text-transform: uppercase;

        a{
            font-weight:bold;
            text-decoration: none;
        }
    }
   }

`;


export default Signup
