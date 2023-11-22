import { useState,useCallback,useEffect ,useRef} from 'react'



function App() {
  const [length,setLength]=useState(8)
  const [numberAllowed,setnumberAllowed]=useState(false)
  const [charAllowed, setcharAllowed]=useState(false)
  const [password,setPassword]=useState("")

  //useRef hook use
  const passwordRef = useRef(null)

  const passwordGenerator =useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQURSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed ) str+="0123456789"
    if(charAllowed)  str+= "!@#$%^&*_"

    for (let i= 1; i <= length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass +=str.charAt(char)
      
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])
useEffect(()=>{
passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator])
  
const copypasswordtoclipBoard =useCallback(()=>{
  passwordRef.current?.select()
window.navigator.clipboard.writeText(password)
},[password])
     
  

  return (
    <>
<div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 text-orange-500 bg-gray-600'>
  <h1 className='text-white text-center my-3'>Password Generator</h1>
  <div className='flex shadow rounded-lg overflow-hidden mb-4'>
    <input type="text"  value={password} 
    className='outline-none w-full py-1 px-3' placeholder='password' readOnly 
    ref={passwordRef}
    />
    <button className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0' onClick={copypasswordtoclipBoard}>Copy</button>
  </div>
  <div className='flex text-sm gap-x-2 pb-5 '>
    <div className='flex items-center gap-x-1'>
      <input type="range" min={6} max={20} value={length} 
      className='cursor-pointer' 
      onChange={(e)=>{setLength(e.target.value)}}
      />
      <label >Length:{length}</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input type="checkbox"  
      defaultChecked={numberAllowed}
      id='numberInput'
      onChange={()=>{
        setnumberAllowed((prev)=>!prev);//ye number true hai toh false kar dega        
      }}
      />
      <label>Numbers{numberAllowed}</label>
    </div>
    <div className='flex items-center gap-x-1'>
    <input type="checkbox"  
      defaultChecked={charAllowed}
      id='charInput'
      onChange={()=>{
        setcharAllowed((prev)=>!prev);//ye char true hai toh false kar dega        
      }}
      />
      <label>Chararacter{charAllowed}</label>
    </div>
  </div>
</div>
      
    </>
  )
  }

export default App
