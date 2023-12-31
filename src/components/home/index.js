
import { Link } from 'react-router-dom'
import './index.css'
import { useState } from 'react'
import TextDownloader from '../textdownload/textdownload.js'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import SlowTextRender from '../slowtext/slowtext.js'
import 'react-toastify/dist/ReactToastify.css';
// ___________________________setting axios baseurl ___________________________________________
// axios.defaults.baseURL="https://edumasterserver.onrender.com"
// axios.defaults.baseURL="http://localhost:5080"




const Home=()=>{
    const [question,setQuestion]=useState("")
    const [answer,setAnswer]=useState("")
    const [blink,setblink]=useState(false)

    const CreateStory=async(event)=>{
            event.preventDefault()
            setblink(true)
            if(question!=="" && answer===""){
            const response=await axios.post("/getStory",{question:question})
            console.log(response)
            if(response.status===200){
                setAnswer(response.data.story)
            } 
        }
        else{
            toast.warning("enter prompt")
        }
        }     

        const SaveStory=async(event)=>{
            event.preventDefault()
            if(answer!==""){
            const response=await axios.post("/save",{question:question, story:answer})
            console.log(response)
            if(response.status===200){
                toast.success("saved successfully")
            } 
        setAnswer("")
        setQuestion("")
        }
        else{
            toast.warning("generate prompt")
        }
        }   

    // const SlowTextGenerator()=>{
    // } 

    return(
        <div className="home-bg-container">
            <ToastContainer/>
           {answer && <TextDownloader answer={answer}/>}
            <div className="story_container">
               
                {
                 <>
                 {blink&&<span className='blink'></span>}
                 <SlowTextRender text={answer}/>
                 </>
                }
            </div>

            <form  className="bottom_section">
                <textarea  placeholder='enter some prompt to get story . . . . . . . .' onChange={(e)=>setQuestion(e.target.value)} value={question} type="text" id="question" className="question">
                
                </textarea> 

                <div className='buttons-container'>
                    <div className='run-save-container'>
                        <button onClick={CreateStory} className='btns run-btn'>RUN</button>
                        <button onClick={SaveStory} className='btns'>SAVE</button>
                    </div>  
                   <Link to='/dashboard' className='dom-link'> <button className='btns dsahboard-btn'>DASHBOARD</button></Link>
                </div>

            </form> 

        </div>
    )
}
export default Home