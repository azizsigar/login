import React from 'react'
import { toast,Toaster } from 'react-hot-toast';

function SignUp() {
  const handleToaster=()=>{
    try {
      toast.success('Successfully toasted!');
      
    } catch (error) {
      console.log('first')
    }
  }
  return (
    <div className='signup'>
      <button onClick={handleToaster}>taster</button>
      <Toaster position="top-center" reverseOrder={false} />
<form>
  <input placeholder='email'/>
  <input placeholder='username'/>
  <input placeholder='password'/>
  <button>sign up</button>
</form>

    </div>
  )
}

export default SignUp