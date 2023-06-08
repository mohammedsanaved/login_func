// import React from 'react';
// import { Link } from 'react-router-dom';
import '../styles/username.css';
import { useFormik } from 'formik';
import { Toaster } from 'react-hot-toast';
import { passwordValidate } from '../helper/validate';

const Recovery = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: passwordValidate,
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
        <div className='glass w-[25%] h-[80%]'>
          <div className='title flex flex-col items-center'>
            <h4 className='text-4xl font-bold'>Recovery</h4>
            <span className='py-4 text-xl w-1/2 text-center text-gray-50'>
              Enter OTP to recover password.
            </span>
          </div>

          <form className='pt-20' onSubmit={formik.handleSubmit}>
            <div className='textbox flex flex-col items-center gap-6'>
              <div className='input text-center'>
                <span className='py-4 text-sm text-left text-gray-50'>
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input className='textbox' type='text' placeholder='OTP' />
              </div>

              <button className='btn bg-cyan-400' type='submit'>
                Recover
              </button>
            </div>
          </form>

          <div className='text-center py-4'>
            <span className='text-gray-200'>
              Cant get OTP? <button className='text-red-500'>Resend</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
