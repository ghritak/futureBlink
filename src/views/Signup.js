import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import {
  IoLockClosedOutline,
  IoMailOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import GradientButton from '../components/ui-components/button/GradientButton';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log('Sign up successful:', data);
        navigate('/login');
      } else {
        setErrorMessage(data?.error);
      }
      setLoading(false);
    } catch (error) {
      console.error('Sign up error:', error);
      setLoading(false);
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
          <h2 className='text-2xl mb-6 text-center font-bold'>Sign Up</h2>

          <div className='bg-[#f2f1ff] flex flex-row items-center rounded-full text-black'>
            <div className='px-4 py-3'>
              <IoPersonOutline color='#666' size={20} />
            </div>
            <input
              id='name'
              type='text'
              placeholder='Name'
              value={formData.name}
              className='outline-none flex-1 bg-transparent'
              onChange={handleInputChange}
            />
          </div>
          <div className='bg-[#f2f1ff] flex flex-row items-center rounded-full text-black'>
            <div className='px-4 py-3'>
              <IoMailOutline color='#666' size={20} />
            </div>
            <input
              id='email'
              type='email'
              placeholder='Email'
              value={formData.email}
              className='outline-none flex-1 bg-transparent'
              onChange={handleInputChange}
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
                value={formData.password}
                onChange={handleInputChange}
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

          {errorMessage && (
            <p className='text-red-400 text-sm'>{errorMessage}</p>
          )}

          <GradientButton
            title='Sign up'
            disabled={loading}
            loading={loading}
          />

          <div>
            <span>Already have an account?</span>
            <span
              onClick={() => navigate('/login')}
              className='text-indigo-500 font-bold mb-4 cursor-pointer ml-1'
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
