import React, { useState,useEffect } from 'react';
import Footer from './Footer';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();
  const [roleType, setRoleType] = useState('')
  useEffect(() => {
    setRoleType(sessionStorage.getItem('roleName'));
    // Do something with roleType...
  }, []); 
  const currentRoute = router.pathname;
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect (() => {
    if (currentRoute.includes('admin')) {
      setIsAdmin(true)    
    } else {
      setIsAdmin(false)
    }
  }, [currentRoute])
  const redirectHome = () => {
    router.push(`/main`);
  };

  const redirectToQuiz = () => {
    if (roleType === 'admin') {
      router.push(`/admin/quiz`);
    } else {
      router.push(`/quiz/all_quizes`);
    }
  };

  const redirectToPayment = () => {
    router.push(`/payments`);
  };

  const redirectToDocuments = () => {
    router.push(`/documents`);
  };redirectToDocuments

  const logoutRedirect = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('loggedInUserEmail', '');
      router.push(`/`);
    }
  };

  return (
    <>
      <div className="w-full flex justify-start px-[50px]">
        <div className='flex justify-between w-full items-center'>
          <div>
            <img
              src="/elites_pool.jpeg"
              alt="logo"
              width="150px"
              height="100px"
              className="cursor-pointer"
              onClick={() => redirectHome()}
            />
          </div>
          {(router.pathname !== '/' && router.pathname !== '/admin' && router.pathname !== '/auth/signup') && (
            <div className='flex items-center text-[20px] text-center gap-4'>
              <button
                className="cursor-pointer mr-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => redirectToQuiz()}
              >
                All Quiz
              </button>
              <button
                className="cursor-pointer mr-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => redirectToPayment()}
              >
                Payments
              </button>
              <button
                className="cursor-pointer mr-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => redirectToDocuments()}
              >
                Documents
              </button>
              <button
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => logoutRedirect()}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex h-full">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="content">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
