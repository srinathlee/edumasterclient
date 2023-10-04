
import {BiLike} from 'react-icons/bi'
import {BiDislike} from 'react-icons/bi'
import {GoHome} from 'react-icons/go'
import {AiOutlineDelete} from 'react-icons/ai'
import Lottie from "lottie-react";
import nofilelottie from "../../assets/nofilelotti.json";
import {Link} from 'react-router-dom'
import './index.css'
import {GoDownload} from 'react-icons/go'
import { useEffect, useState } from 'react'
import {ThreeDots} from  'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import TextDownloader from '../textdownload/textdownload.js'

axios.defaults.baseURL="https://edumasterserver.onrender.com"
// axios.defaults.baseURL="http://localhost:5080"





   const Card=(props)=>{
    const{each,DeleteCard}=props
    const{like,dislike,story,question,_id}=each
    const handleDownload = () => {
        const textContent = story;
        downloadTextFile(textContent, 'example.txt');
      };
     
        const downloadTextFile = (content, fileName) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
    
        document.body.appendChild(link);
    
        link.click();
    
        document.body.removeChild(link);
      }

      const OnDelete=()=>{
        DeleteCard(_id)
        // console.log(_id)
      }


    return(
        <div className="dsha-card-container">
            <ToastContainer/>
        <h1 className="card-question">{question}</h1>
        <p className="card-answer">
            {story}
        </p>
        <hr  className="card-line"/>
        <div className="like-dislike-container">
            <GoDownload onClick={handleDownload} className='download-icon'/>
            <AiOutlineDelete onClick={OnDelete} className=' like_reaction react-icon' />
        </div>
    </div>
    )
}

// ___________________________________________________dashboard______________________________________________________

const dataState={"LOADING":"loading","SUCCESS":"success","FAILURE":"failure"}

const Dashboard=()=>{
    const [data,setData]=useState("")
    const [state,setState]=useState("")

    useEffect(()=>{
        getData()
    },[])
   
//   ___________________Delete card______________________________
const DeleteCard=async(_id)=>{

    setState("loading")
    const response=await axios.delete(`/getall/${_id}`)
    console.log(response)
    if(response.status===201){
        setState("success",getData())
    }   
}

    const getData=async()=>{
        setState("loading")
        const response=await axios.get("/getall")
        console.log(response)
        if(response.status===201){
            setState("success")
            setData(response.data.data)
            // Successview()
        }
        else{
            setState("failure")
            
        }
    }
// ______________no cards view_____________________________
    const NocardsView=()=>{

        return(
            <div className='no_card_view'>

               <Lottie animationData={nofilelottie}/>

            </div>
        )
    }
// ______________failure view_____________________________
const Failureview=()=>{

    return(
        <div className='failure_view'>

           failure view

        </div>
    )
}
   
// ______________success view_____________________________
const Successview=()=>{
     console.log(data)
    return(
        <div className='success_view'>

            {data.length==0?<NocardsView/>:data.map((each)=><Card DeleteCard={DeleteCard} each={each} key={each._id}/>)}
        </div>
    )
}
 
// ______________loading view_____________________________
const LoadingView=()=>{

    return(
        <div className='loading_view'>
            <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color="#ff7a00" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
            />
        </div>
    )
}


const RenderData=()=>{
  switch(state){
    case (dataState.LOADING):
        return LoadingView()
        break;
    case (dataState.SUCCESS):
        return Successview()
        break;
     case (dataState.FAILURE):
        return Failureview()
        break;
    
  }
}

    return(
        <div className="dashboard-bg-container">
            <div className='heading-btn-container'>
            <h1 className="dash-main-heading">DASHBOARD</h1> 
            <Link className='home-icon-link' to="/"><GoHome className='home-icon'/></Link>

            </div>    
            <div className="dahs-cards-container">
               
            {RenderData()}

            </div>      
        </div>
    )
}
export default Dashboard