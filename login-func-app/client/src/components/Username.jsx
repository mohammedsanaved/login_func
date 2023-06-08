// import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import '../styles/username.css';
import { useFormik } from 'formik';
import { Toaster } from 'react-hot-toast';
import { usernameValidate } from '../helper/validate';

const Username = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className='glass'>
          <div className='title flex flex-col items-center'>
            <h4 className='text-4xl font-bold'>Hello Again!</h4>
            <span className='py-4 text-lg w-2/3 text-center text-gray-500'>
              Explore More by connecting with us.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img src={avatar} className='profile_img' alt='avatar' />
            </div>

            <div className='textbox flex flex-col items-center gap-6'>
              <input
                {...formik.getFieldProps('username')}
                className='textbox'
                type='text'
                placeholder='Username'
              />
              <button className='btn bg-cyan-400' type='submit'>
                Lets Go
              </button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>
                Not a Member{' '}
                <Link className='text-red-500' to='/register'>
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Username;
