import {GoDownload} from 'react-icons/go'
import './index.css'

const TextDownloader=(props)=>{
   const {answer}=props
const handleDownload = () => {
    const textContent = answer;
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
  };



    return (
        
            <button onClick={handleDownload} className="download-icon-btn">
                <GoDownload className='download-icon'/>
            </button>
    )
}

export default TextDownloader