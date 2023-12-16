import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { fetchRoute } from '../utils/APIRoutes'

const Analytics = ({ changeInData, setChangeInData }) => {

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    let currentDate
    if (date < 10) {
        currentDate = year + "-" + month + "-" + "0" + date;
    }
    else {
        currentDate = year + "-" + month + "-" + date;
    }


    const compareDates = (date1, date2) => {
        
        date2 = date2.split('T')[0];


        if (date1 <= date2) {
            return 1;
        }
        else {
            return 0;
        }
    };


    const [shortenedUrl, setShortenedUrl] = useState([])

    const getUrls = async () => {

        const { data } = await axios.get(fetchRoute, {
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("url")
            }
        });
        setShortenedUrl(data)
    }

    useEffect(() => {
        getUrls();
    }, [])

    useEffect(() => {
        if (changeInData) {
            getUrls();
            setChangeInData(!changeInData)
        }
    }, [changeInData])
  
    
    return (        
        <FetchContainer>
            <h2>Some of the urls which you have shortened previously</h2>
            {
                shortenedUrl?.length > 0 ?
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Original Url</th>
                                    <th>Shortened Url</th>
                                    <th>Expired or Not</th>
                                    <th>Clicks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shortenedUrl?.map((url, index) => (
                                    <tr key={index}>
                                        <td>{url.originalUrl}</td>
                                        <td>{url.shortUrl}</td>
                                        <td>{!compareDates(currentDate,url.expiresAt)?"Yes":"No"}</td>
                                        <td>{url.clicks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                    :
                    <h3>You have no url shortened before.</h3>
            }

        </FetchContainer>
    )
}

const FetchContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;

    table{
        width: 80%;
        margin: 20px;

        th{
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
            background-color: #f2f2f2;
            text-align: center
        }

        td{
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }
    }
`

export default Analytics
