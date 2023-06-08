// import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import '../styles/username.css';
import { useFormik } from 'formik';
import { Toaster } from 'react-hot-toast';
import { registerValidation } from '../helper/validate';
import { useState } from 'react';
import convertToBase64 from '../helper/convert';

const Register = () => {
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || '' });
      console.log(values);
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-auto'>
        <div className='glass '>
          <div className='title flex flex-col items-center'>
            <h4 className='text-4xl font-bold'>Register !</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore More by connecting with us.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-2'>
              <label htmlFor='profile'>
                <img
                  src={file || avatar}
                  className='profile_img'
                  alt='avatar'
                />
              </label>
              <input
                type='file'
                id='profile'
                name='profile'
                onChange={onUpload}
              />
            </div>

            <div className='textbox flex flex-col items-center gap-4'>
              <input
                {...formik.getFieldProps('email')}
                className='textbox'
                type='email'
                placeholder='Email'
              />
              <input
                {...formik.getFieldProps('username')}
                className='textbox'
                type='text'
                placeholder='Username'
              />
              <input
                {...formik.getFieldProps('password')}
                className='textbox'
                type='password'
                placeholder='Password'
              />
              <button className='btn bg-cyan-400' type='submit'>
                Sign In
              </button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>
                Forgot Register{' '}
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

export default Register;
