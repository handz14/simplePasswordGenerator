import { useCallback, useState, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numsAllowed, setNumsAllowed] = useState(false);
  const [charsAllowed, setCharsAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numsAllowed) str += "0123456789";
    if (charsAllowed) str += "!@#$%^&*()_+";

    for(let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numsAllowed, charsAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numsAllowed, charsAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  }

  return (
    <>
      <div className='bg-gray-800 text-yellow-500 w-full h-screen mx-auto px-4 rounded-lg py-3 '>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button className='outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" 
              value={length}
              min={6}
              max={24}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numsAllowed}
              className='cursor-pointer'
              onChange={() => setNumsAllowed((prev) => !prev)}
              name="" 
              id="" 
            />
            <label htmlFor="numsAllowed">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charsAllowed}
              className='cursor-pointer'
              onChange={() => setCharsAllowed((prev) => !prev)}
              name="" 
              id="" 
            />
            <label htmlFor="charsAllowed">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
