import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import user from '../services/user';
import { updateAuth } from '../Redux/Store/AuthSlice';
import { Alert, Spinner } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { CiLock } from 'react-icons/ci';
import { CiUnlock } from 'react-icons/ci';
import { MdOutlineEmail } from 'react-icons/md';
import { HiInformationCircle } from 'react-icons/hi';

const Index = () => {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggle = () => {
    setVisible(!isVisible);
  };

  const handleChange = (e, field) => {
    setFields({ ...fields, [field]: e.target.value });
    setErrors({ ...errors, [field]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    let params = fields;
    user
      .login(params)
      .then((res) => {
        if (res?.data?.status) {
          localStorage.setItem('token', res?.data?.data?.access_token);
          localStorage.setItem('id', res?.data?.data?.admin_data?.id);
          localStorage.setItem('name', res?.data?.data?.admin_data?.name);
          localStorage.setItem('email', res?.data?.data?.admin_data?.email);
          localStorage.setItem('mobile', res?.data?.data?.admin_data?.mobile);
          localStorage.setItem('admin', res?.data?.data);

          let admin = {
            token: res?.data?.data?.access_token,
            id: res?.data?.data?.admin_data?.id,
            name: res?.data?.data?.admin_data?.name,
            email: res?.data?.data?.admin_data?.email,
            mobile: res?.data?.data?.admin_data?.mobile,
          };
          dispatch(updateAuth(admin));
          localStorage.setItem('admin', JSON.stringify(admin));
          setLoader(false);
          if (parseInt(res?.data?.data?.admin_data?.id) === 1) {
            navigate('/admin/dashboard', { replace: true });
          }
        } else {
          toast.error(res?.data?.message, {
            position: 'top-right',
          });
          setErrors(errors);
          setLoader(false);
        }
      })
      .catch(function (error) {
        toast.error(error, {
          position: 'top-right',
        });
        setLoader(false);
      });
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2 h-screen">
            <div className="py-17.5 px-26 text-center">
              {/* <Link className="mb-5.5 inline-block" to="/">
                <img
                  className="hidden dark:block"
                  src="/assets/images/drjlcitm-logo.png"
                  alt="drjlcitm-logo"
                />
                <img
                  className="dark:hidden"
                  src="/assets/images/drjlcitm-logo.png"
                  style={{ height: '60px' }}
                  alt="drjlcitm-logo"
                />
              </Link> */}

              <span className="mt-15 inline-block">
              <img
                  className="dark:hidden"
                  src="/assets/images/login-img.png"
                  alt="drjlcitm-logo"
                />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Login
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={fields['email'] ? fields['email'] : ''}
                      onChange={(event) => handleChange(event, 'email')}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <MdOutlineEmail
                        className="cursor-pointer"
                        style={{ fontSize: '25px' }}
                      />
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={!isVisible ? 'password' : 'text'}
                      name="password"
                      placeholder="Password"
                      value={fields['password'] ? fields['password'] : ''}
                      onChange={(event) => handleChange(event, 'password')}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4" onClick={toggle}>
                      {isVisible ? (
                        <CiUnlock
                          className="cursor-pointer"
                          style={{ fontSize: '25px' }}
                        />
                      ) : (
                        <CiLock
                          className="cursor-pointer"
                          style={{ fontSize: '25px' }}
                        />
                      )}
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  >
                    {loader ? (
                      <Spinner
                        color="success"
                        size="sm"
                        className="mr-1"
                        disabled={loader}
                      />
                    ) : (
                      ''
                    )}
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
