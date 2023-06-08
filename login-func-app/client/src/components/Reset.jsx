// import React from 'react';
import { Link } from 'react-router-dom';
// import avatar from '../assets/profile.png';
import '../styles/username.css';
import { useFormik } from 'formik';
import { Toaster } from 'react-hot-toast';
import { resetPasswordValidation } from '../helper/validate';

const Reset = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pwd: '',
    },
    validate: resetPasswordValidation,
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
            <h4 className='text-4xl font-bold'>Reset Your Password</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter a New Password
            </span>
          </div>

          <form className='py-10' onSubmit={formik.handleSubmit}>
            <div className='textbox flex flex-col items-center gap-6'>
              <input
                {...formik.getFieldProps('password')}
                className='textbox'
                type='password'
                placeholder='New Password'
              />
              <input
                {...formik.getFieldProps('confirm_pwd')}
                className='textbox'
                type='password'
                placeholder='Confirm Password'
              />
              <button className='btn bg-cyan-400' type='submit'>
                Sign In
              </button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>
                Forgot Password{' '}
                <Link className='text-red-500' to='/recovery'>
                  Recovery Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
