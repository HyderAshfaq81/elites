import Layout from '../Layouts';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [isLoading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect (() => {
    if (currentRoute.includes('admin')) {
      setIsAdmin(true)    
    } else {
      setIsAdmin(false)
    }
  }, [currentRoute])
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });
  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.value,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAdmin) {
      formData.role = 'admin' 
    }
    try {
      setLoading(true)
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        sessionStorage.setItem('loggedInUserEmail', formData.email);
        if (isAdmin) {
          setLoading(false)
          router.push('/admin/quiz')
          sessionStorage.setItem('roleName', 'admin');
          toast.success('Admin loggedin Successfully!');
        } else {
          sessionStorage.setItem('roleName', 'user');
          setLoading(false)
          toast.success('User loggedin Successfully!');
          router.push('/main')
        }
      } else if (response) {
        setLoading(false)
        toast.error("Invalid Creds!");
      }
    } catch (error) {
      setLoading(false)
      console.error('Invalid credentials!', error);
    }
  };
  const redirectToSignup = async () => {
    router.push('/auth/signup')
  }
  return (
    <>
      <Layout>
        <div className="loader-container">
          {isLoading && (
            <TailSpin type="TailSpin" color="#00BFFF" className="h-[80px] w-[80px]" />
          )}
        </div>
        <div className="w-full flex justify-center bg-gray-100">
          <div className="flex w-full">
            <div className="w-[30%] px-[80px] py-[80px]">
              <div className="text-[24px] leading-[32px] mb-[24px]">
                Discover why more than 20 million students and educators use Elites Cources.
              </div>
              <div className="text-[20px] mb-[40px]">
                As a member, you get <strong>immediate access</strong> to:
              </div>
              <div className="flex items-center mb-10 w-full">
                <div className="mr-4 w-[10%]">
                  <img src="https://assets.coursehero.com/ssi/1e7d75a61ada6308d631.svg" alt="folder" width={100} height={100} />
                </div>
                <div className="text-[16px] leading-[24px] w-[90%]">
                  The largest and best collection of online learning resources—guaranteed.
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 w-[10%]">
                  <img src="	https://assets.coursehero.com/ssi/ca3eac71ff07f8c0c22b.svg" alt="folder" width={200} height={200} />
                </div>
                <div className="text-[16px] leading-[24px] w-[90%]">
                  Hundreds of expert tutors available 24/7. Get answers and explanations in as little as 15 minutes.
                </div>
              </div>
            </div>
            {isAdmin && 
              <div className="w-[70%] bg-[#DEEEF2] flex items-center justify-center px-[20px] py-[48px]">
                <div className="w-[550px] rounded-[8px] bg-white flex justify-center p-[56px]">
                  <div className="w-full">
                    <div className="flex justify-center text-[36px] font-bold leading-[48px] mb-[16px]">
                      Login As Admin!
                    </div>
                    <form className="mt-[32px]" onSubmit={handleSubmit}>
                      <div className="flex flex-col mb-2">
                        <label className="text-[#6C7687] mb-2 text-[14px]">Email:</label>
                        <input
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className="border-2 border-[#6C7687] rounded-[8px] p-2 text-[20px]"
                          required
                        />
                      </div>
                      <div className="flex flex-col mb-2">
                        <div className="flex justify-between">
                          <label className="text-[#6C7687] mb-2 text-[14px]">Password:</label>
                          <label className="text-[#001b89] mb-2 text-[14px] cursor-pointer">Forget Password?</label>
                        </div>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                          className="border-2 border-[#6C7687] rounded-[8px] p-2 text-[20px]"
                          required
                        />
                      </div>
                      {/* <div className="flex gap-2 mb-2">
                        <span className="text-[#6C7687] mb-2 text-[14px]">I am a:</span>
                        <label className="inline-block mr-4">
                          <input
                            type="radio"
                            name="role"
                            value="student"
                            checked={formData.role === 'student'}
                            onChange={handleRoleChange}
                            className="mr-1"
                            required
                          />
                          Student
                        </label>
                        <label className="inline-block">
                          <input
                            type="radio"
                            name="role"
                            value="expert"
                            checked={formData.role === 'expert'}
                            onChange={handleRoleChange}
                            className="mr-1"
                            required
                          />
                          Expert
                        </label>
                        <label className="inline-block">
                          <input
                            type="radio"
                            name="role"
                            value="admin"
                            checked={formData.role === 'admin'}
                            onChange={handleRoleChange}
                            className="mr-1"
                            required
                          />
                          Admin
                        </label>
                      </div> */}
                      <button type="submit" className="bg-[#002de4] text-white w-full py-2 rounded-[8px] my-6 text-[16px]">
                        Log in
                      </button>
                      <div className="flex justify-between">
                        <div>
                          <input type="checkbox" /> 
                          <label className="ml-2">Remember me</label>
                        </div>
                        <div>More info</div>
                      </div>
                      <div className="mt-6 text-[16px] leading-[24px] flex justify-center">
                        Need an account? <span className="ml-1 text-[#002de4] cursor-pointer mb-6" onClick={() => redirectToSignup()} >Sign up</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            }
            {!isAdmin && 
              <div className="w-[70%] bg-[#DEEEF2] flex items-center justify-center px-[20px] py-[48px]">
                <div className="w-[550px] rounded-[8px] bg-white flex justify-center p-[56px]">
                  <div className="w-full">
                    <div className="flex justify-center text-[36px] font-bold leading-[48px] mb-[16px]">
                      Welcome Back!
                    </div>
                    <form className="mt-[32px]" onSubmit={handleSubmit}>
                      <div className="flex flex-col mb-2">
                        <label className="text-[#6C7687] mb-2 text-[14px]">Email:</label>
                        <input
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className="border-2 border-[#6C7687] rounded-[8px] p-2 text-[20px]"
                          required
                        />
                      </div>
                      <div className="flex flex-col mb-2">
                        <div className="flex justify-between">
                          <label className="text-[#6C7687] mb-2 text-[14px]">Password:</label>
                          <label className="text-[#001b89] mb-2 text-[14px] cursor-pointer">Forget Password?</label>
                        </div>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                          className="border-2 border-[#6C7687] rounded-[8px] p-2 text-[20px]"
                          required
                        />
                      </div>
                      <div className="flex gap-2 mb-2">
                        <span className="text-[#6C7687] mb-2 text-[14px]">I am a:</span>
                        <label className="inline-block mr-4">
                          <input
                            type="radio"
                            name="role"
                            value="student"
                            checked={formData.role === 'student'}
                            onChange={handleRoleChange}
                            className="mr-1"
                            required
                          />
                          Student
                        </label>
                        <label className="inline-block">
                          <input
                            type="radio"
                            name="role"
                            value="expert"
                            checked={formData.role === 'expert'}
                            onChange={handleRoleChange}
                            className="mr-1"
                            required
                          />
                          Expert
                        </label>
                        {/* <label className="inline-block">
                          <input
                            type="radio"
                            name="role"
                            value="admin"
                            checked={formData.role === 'admin'}
                            onChange={handleRoleChange}
                            className="mr-1"
                            required
                          />
                          Admin
                        </label> */}
                      </div>
                      <button type="submit" className="bg-[#002de4] text-white w-full py-2 rounded-[8px] my-6 text-[16px]">
                        Log in
                      </button>
                      <div className="flex justify-between">
                        <div>
                          <input type="checkbox" /> 
                          <label className="ml-2">Remember me</label>
                        </div>
                        <div>More info</div>
                      </div>
                      <div className="mt-6 text-[16px] leading-[24px] flex justify-center">
                        Need an account? <span className="ml-1 text-[#002de4] cursor-pointer mb-6" onClick={() => redirectToSignup()} >Sign up</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </Layout>
    </>
  );
}
export default Login;
