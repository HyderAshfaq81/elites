import { useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layouts';
import { useRouter } from 'next/router';
import { TailSpin } from "react-loader-spinner";

const Signup = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Confirm Password not matched!');
    } else {
      try {
        setLoading(true)
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        setLoading(false)
        if (response.status === 201) {
          toast.success('User created Successfully!');
          router.push('/main')
        } else if (response.status === 401) {
          toast.error("User email already exits!");
        }
      } catch (error) {
        console.error('Signup error:', error);
      }
    }
  };
  const redirectToLogin = async () => {
    router.push('/Login')
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
            <div className="w-[70%] bg-[#DEEEF2] flex items-center justify-center px-[20px] py-[48px]">
              <div className="w-[550px] rounded-[8px] bg-white flex justify-center p-[56px]">
                <div className="">
                  <div className="flex justify-center text-[36px] font-bold leading-[48px] mb-[16px]">
                    Join Course with Elites.
                  </div>
                  <div className="flex justify-center text-center text-[15px] leading-[24px]">
                    Get free access to course content, assessments, syllabi, and more from our network of college faculty.
                  </div>
                  <form className="mt-[32px]" onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-2">
                      <label className="text-[#6C7687] mb-2 text-[14px]">First name:</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        className="border-2 border-[#6C7687] rounded-[8px] p-2 text-[20px]"
                        required
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label className="text-[#6C7687] mb-2 text-[14px]">Last name:</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        className="border-2 border-[#6C7687] rounded-[8px] p-2 text-[20px]"
                        required
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label className="text-[#6C7687] mb-2 text-[14px]">Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="border-2 border-[#6C7687] rounded-[8px] p-2 text-[20px]"
                        required
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label className="text-[#6C7687] mb-2 text-[14px]">Password:</label>
                      <input
                        type="password"  // Use "password" type for password input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="border-2 border-[#6C7687] rounded-[8px] p-2 text-[20px]"
                        required
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label className="text-[#6C7687] mb-2 text-[14px]">Re-Enter Password:</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-Enter your Password"
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
                    </div>
                    <button type="submit" className="bg-[#002de4] text-white w-full py-2 rounded-[8px] my-6 text-[16px]">
                      Create my account
                    </button>
                    <div className="text-[16px] leading-[24px] flex justify-center">
                      Already have an account? <span className="ml-1 text-[#002de4] cursor-pointer mb-6" onClick={(() => redirectToLogin())}>Sign in</span>
                    </div>
                    <div className="text-[12px] leading-[16px]">
                      By creating an account, you agree with Course Heros Terms of Use and Honor Code,
                      and acknowledge that your personal information will be processed in accordance with our Privacy Policy.
                      Your details will be verified using SheerID. View Sheer ID privacy policy.
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
export default Signup;
