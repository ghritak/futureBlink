import React, { useContext, useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { IoLockClosedOutline, IoMailOutline } from 'react-icons/io5';

import { useNavigate } from 'react-router-dom';
import GradientButton from '../components/ui-components/button/GradientButton';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuthStatus } = useContext(UserContext);

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('AUTH_TOKEN', data?.token);
        localStorage.setItem('USER_DATA', JSON.stringify(data?.data));
        setAuthStatus('authenticated');
        setTimeout(() => {
          navigate('/');
          setLoading(false);
        }, 500);
        console.log('Login successful:', data);
      } else {
        setErrorMessage(data?.error);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
      setErrorMessage(error);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-full max-w-md'>
        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-2xl md:shadow-md px-8 pt-6 pb-8 space-y-4'
        >
          <h2 className='text-2xl mb-6 text-center font-bold uppercase font-sans'>
            Login
          </h2>
          <div className='bg-[#f2f1ff] flex flex-row items-center rounded-full text-black'>
            <div className='px-4 py-3'>
              <IoMailOutline color='#666' size={20} />
            </div>
            <input
              id='email'
              type='email'
              placeholder='Email'
              value={email}
              className='outline-none flex-1 bg-transparent'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='relative'>
            <div className='bg-[#f2f1ff] flex flex-row items-center rounded-full text-black'>
              <div className='px-4 py-3'>
                <IoLockClosedOutline color='#666' size={20} />
              </div>
              <input
                className='outline-none flex-1 bg-transparent'
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

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

          <div className='flex flex-row justify-between'>
            <div
              onClick={() => navigate('/')}
              className='text-indigo-500 font-bold cursor-pointer text-sm'
            >
              Forgot Password ?
            </div>
            {errorMessage && (
              <p className='text-red-400 text-sm'>{errorMessage}</p>
            )}
          </div>

          <GradientButton
            title={'Login'}
            loading={loading}
            disabled={loading}
          />

          <div>
            <span>Don't have an account?</span>
            <span
              onClick={() => navigate('/signup')}
              className='text-indigo-500 font-bold mb-4 cursor-pointer ml-1'
            >
              Sign up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
