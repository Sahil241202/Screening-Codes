import React, { useEffect, useRef, useState } from 'react'
import './OTP.css'

const OTPsize = 5;

function OTP() {
  const [inputArr, setInputArr] = useState(
    new Array(OTPsize).fill("")
  );

  const handleInput = (e,index) => {
    if(isNaN(e.target.value)) return ;
  }

  const arrRef = useRef([]);

  useEffect(()=>{
    arrRef.current[0]?.focus()
  },[])


  return (
    <div>
      <h1>OTP Validator</h1>
      {inputArr.map((index)=>{
        return(
            <input
                className='otp-input'
                key={index}
                type='text'
                maxLength='1'
                onChange={(e)=>{
                    handleInput(e,index)
                }}
            />
        )
      })}
    </div>
  )
}

export default OTP
