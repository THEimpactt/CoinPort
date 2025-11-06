import React, { useEffect, useState } from 'react'
import './CP.css'

export default function CP() {
    const [info,setInfo]= useState([])
    const [find,setFind]= useState("")

    const takeInput=(e)=>{
        setFind(e.target.value)
    }

    const API_KEY = import.meta.env.VITE_API_KEY;
    const crptoCoin = async()=>{
        try{
            const response  = await fetch("https://openapiv1.coinstats.app/coins?currency=PKR",{
                headers:{'X-API-KEY':API_KEY}
            })
            const data = await response.json();
            setInfo(data.result)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        crptoCoin()
    },[])
  return (
    <div className='container'>
        <div className="top">
            <h1>CryptoPort</h1>
            <input type='Search' placeholder='Search here...' onChange={takeInput}/>
        </div>
        <div className="main">
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Market Cap</th>
                        <th>Price(PKR)</th>
                        <th>Available Supply</th>
                        <th>Volume (24hrs)</th>
                    </tr>
                </thead>
                <tbody>
                    {info.filter((value)=>{
                        return value.name.toLowerCase().includes(find.toLowerCase())
                    }).map((value,index)=>{
                        return <tr>
                            <td>{value.rank}</td>
                            <div className="stuff">
                            <img src={value.icon} />
                            <td>{value.name}</td>
                            </div>
                            <td>{value.symbol}</td>
                            <td>{value.marketCap.toFixed(2)}</td>
                            <td>{(value.price).toFixed(2)}</td>
                            <td>{value.availableSupply}</td>
                            <td>{value.volume.toFixed(2)}</td>
                        </tr>
                    })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}