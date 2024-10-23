import { useState, useEffect } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



const colorsArray = [
  "#2F4F4F", // Dark Slate Gray
  "#556B2F", // Dark Olive Green
  "#8B4513", // Saddle Brown
  "#4682B4", // Steel Blue
  "#708090", // Slate Gray
  "#6B8E23", // Olive Drab
  "#4B0082", // Indigo
  "#8B0000", // Dark Red
  "#2E8B57", // Sea Green
  "#5F9EA0", // Cadet Blue
  "#483D8B", // Dark Slate Blue
  "#A0522D", // Sienna
  "#8FBC8F", // Dark Sea Green
  "#556B2F", // Olive Drab
  "#2C3E50"  // Midnight Blue
];






function App() {

  const [color, setcolor] = useState('')
  const [quotes, setquotes] = useState([])
  const [quote, setquote] = useState('')
  const [author, setauthor] = useState('')

  

  const URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

  


     

  
  useEffect(() => {

    const fetchData = async ()=>{

      try{
        const response = await fetch(URL);

        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setquotes(result.quotes)
        getRamdomQuoteAndTheme(result.quotes)

      }catch(e){
        console.log(e.message)
      }
      
    
    }
    fetchData()
    
    },[]);
    
  

   


 
  
  


  function getRamdomQuoteAndTheme(quotesArray,colors = colorsArray) {
    
    const color = colors[Math.floor(Math.random() * 15) + 1];
    const randomQuote = quotesArray[ Math.floor(Math.random() * quotesArray.length)];
    setquote(randomQuote.quote);
    setauthor(randomQuote.author);
    setcolor(color);
}



function newQuote(){

  getRamdomQuoteAndTheme(quotes)

}



  return (
    <div className="mh-100 d-flex justify-content-center align-items-center flex-column" style={{ height: '100vh', backgroundColor: color ?? '#B37A4C' }}  >
      <div id="quote-box" className='w-50 h-auto bg-white rounded d-flex flex-column '>
        <div id="text" className=' rounded p-4 m-3 fs-2' style={{ color: color ?? '#B37A4C' }}>{quote ?? <h1>Something Went Wrong</h1>}</div>

        <span id="auther" className='justify-content-end d-flex px-4 fs-5' style={{ color: color ?? '#B37A4C' }}>-{author ?? 'Unknown'}</span>
        <div className='d-flex  justify-content-between'>
          <a href='https://x.com/intent/tweet%22' id="tweet-quote" className='text-white rounded px-2 m-5 justify-content-center' style={{ backgroundColor: color ?? '#B37A4C' }}><i className="bi bi-twitter fs-3"></i> </a>
          <span id="new-quote" onClick={newQuote} className='text-white  justify-content-center rounded p-2 m-5' role='button' style={{ backgroundColor: color ?? '#B37A4C' }}>New Quote</span>
        </div>
      </div>

      <h6 className='m-3 text-white'>-by Bikram Sharma</h6>

    </div>
  );
}

export default App;
