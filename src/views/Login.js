import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import Input from '../components/ui-components/input/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-full max-w-md'>
        <form
          onSubmit={handleSubmit}
          className='bg-white rounded px-8 pt-6 pb-8 mb-4'
        >
          <h2 className='text-2xl mb-6 text-center font-bold uppercase font-sans'>
            Login
          </h2>
          <div className='mb-4'>
            <Input
              id='email'
              type='email'
              label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                label='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className='absolute inset-y-0 right-0 px-2 flex items-center'>
                <button
                  type='button'
                  onClick={handleTogglePassword}
                  className='text-gray-700 p-1.5 rounded-full hover:bg-gray-300 transition-all duration-300'
                >
                  {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-center'>
            <button
              className='bg-gradient-to-r from-indigo-300 to-indigo-500 hover:scale-95 text-white font-bold py-3 px-10 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300'
              type='submit'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
