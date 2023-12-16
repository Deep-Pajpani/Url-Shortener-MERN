import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import styled from 'styled-components'
import axios from 'axios'
import Navbar from './Navbar'
import { shortenRoute } from '../utils/APIRoutes'
import Analytics from './Analytics'

const Shorten = () => {

    const [values, setValues] = useState({
        ogurl: ""
    })

    const [url, setUrl] = useState({ shortUrl: "" })
    const [changeInData, setChangeInData] = useState(false);

    const toastOptions = {
        position: "bottom-right",
        draggable: true,
        pauseOnHover: true,
        autoClose: 8000,
        theme: "dark"
    };

    const handleShorten = async (e) => {
        e.preventDefault();

        if (handleValidation()) {
            const { ogurl } = values;

            const { data } = await axios.post(shortenRoute,
                {
                    originalUrl: ogurl
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "auth-token": localStorage.getItem("url")
                    },
                })
            setUrl(data.url)
            setChangeInData(!changeInData)
        }
    }

    const handleValidation = async () => {
        const { ogurl } = values;

        if (ogurl == "") {
            toast.error("Pls enter the url first", toastOptions)
            return 0;
        }

        return 1;
    }


    const handleChange = async (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Navbar />
            <Container>
                    <div className="og">
                        <h1>
                            Your Original URL
                        </h1>
                        <input type='text' placeholder='Enter your url here' name="ogurl" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="shrink">
                        <button onClick={(e) => handleShorten(e)} >Shrink the url</button>
                    </div>
                    <div className="short">
                        <h1>
                            Shortened URL
                        </h1>
                        <input type="text" name="" id="" value={url.shortUrl} readOnly />
                    </div>

                {/* <h2>Your shortened url is: {url.shortUrl}</h2> */}

            </Container>
            <Analytics changeInData={changeInData} setChangeInData={setChangeInData} />
            <ToastContainer />
        </>
    )
}

const Container = styled.div`
  display:flex;
  justify-content:space-evenly;
  align-items: center; 
  margin:5px 0px; 
  padding:10px;

  .og{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input{
        font-size: 30px;
        padding: 5px;
    }
  }

  .shrink{
    button{
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 32px;
        padding: 16px 8px;
        background-color: #2A14E1;
        color: white;
        padding: 1rem 2rem;
        border: none;
    }
  }

  .short{
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center; 

    input{
        font-size: 30px;
        padding: 5px;
    }
  }


`


export default Shorten
