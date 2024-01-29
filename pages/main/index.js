import Layout from "../../components/Layouts";
import { useRouter } from "next/router";

const Main = () => {
  const router = useRouter();
  const redirectToQuiz = () => {
    router.push('/quiz/all_quizes')
  }
  return (
    <Layout>
      <div className="w-[90%] mx-auto">
        <div className="mb-6">
          <div className="">
            <div className="w-1/2 relative">
              <input
                type="search"
                placeholder="Search"
                class="border-[2px] border-[#1eadeeb3] p-4 rounded-[4px] w-full text-[16px] leading-[20px] text-decoration-none outline-none"
              />
              <div className="absolute right-9 bottom-4 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 rounded-[12px] mb-20" style={{ backgroundColor: 'rgba(29, 175, 236, 0.1)' }}>
          <div className="flex justify-center text-[32px] leading-[24px] font-bold mb-10 cursor-pointer" onClick={(() => redirectToQuiz())}>Live Quiz</div>
          <div class="grid grid-cols-3 gap-10 justify-between items-start">
            <div class="">
              <div class="flex justify-center font-medium text-[20px] leading-[16px] mb-4">Timings</div>
              <div class="flex justify-center text-center font-normal text-[16px] leading-[20px]">Attempt the quiz in the specific time, you have to attempt the each question in the 0.30 sec!</div>
            </div>
            <div class="">
              <div class="flex justify-center font-medium text-[20px] leading-[16px] mb-4">Contents</div>
              <div class="flex justify-center text-center font-normal text-[16px] leading-[20px]">Attempt the quiz in the specific time, you have to attempt the each question in the 0.30 sec!</div>
            </div>
            <div class="">
              <div class="flex justify-center font-medium text-[20px] leading-[16px] mb-4">Prizes</div>
              <div class="flex justify-center text-center font-normal text-[16px] leading-[20px]">Attempt the quiz in the specific time, you have to attempt the each question in the 0.30 sec!</div>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-10 justify-between items-start mt-10">
            <div class="col-span-1"></div>
            <div class="col-span-1">
              <div class="flex justify-center font-medium text-[20px] leading-[16px] mb-4">Mockes</div>
              <div class="flex justify-center text-center font-normal text-[16px] leading-[20px]">Attempt the quiz in the specific time, you have to attempt the each question in the 0.30 sec!</div>
            </div>
            <div class="col-span-1">
              <div class="flex justify-center font-medium text-[20px] leading-[16px] mb-4">Exam/topics</div>
              <div class="flex justify-center text-center font-normal text-[16px] leading-[20px]">Attempt the quiz in the specific time, you have to attempt the each question in the 0.30 sec!</div>
            </div>
            <div class="col-span-1"></div>
          </div>
        </div>
        <div className="mb-20">
          <div className="flex justify-center text-[32px] leading-[24px] font-bold mb-10">Polular Exams</div>
          <div className="flex justify-center  gap-10">
            <div className="border-[#1eadeeb3] border-[2px] rounded-[12px] p-6">
              <div>
                <div className="flex items-center justify-center">
                  <img src="https://assess-1c314.kxcdn.com/wp-content/uploads/2019/05/BubbleSheetOrange.jpg" alt="paper" width={200} heigth={200} className="rounded-[12px]" />
                </div>
                <div className="flex justify-center font-medium text-[20px] leading-[16px] mt-5">SCC CGL</div>
              </div>
            </div>
            <div className="border-[#1eadeeb3] border-[2px] rounded-[12px] p-6">
              <div>
                <div className="flex items-center justify-center">
                  <img src="https://assess-1c314.kxcdn.com/wp-content/uploads/2019/05/BubbleSheetOrange.jpg" alt="paper" width={200} heigth={200} className="rounded-[12px]" />
                </div>
                <div className="flex justify-center font-medium text-[20px] leading-[16px] mt-5">Bank</div>
              </div>
            </div>
            <div className="border-[#1eadeeb3] border-[2px] rounded-[12px] p-6">
              <div>
                <div className="flex items-center justify-center">
                  <img src="https://assess-1c314.kxcdn.com/wp-content/uploads/2019/05/BubbleSheetOrange.jpg" alt="paper" width={200} heigth={200} className="rounded-[12px]" />
                </div>
                <div className="flex justify-center font-medium text-[20px] leading-[16px] mt-5">UPSC</div>
              </div>
            </div>
            <div className="border-[#1eadeeb3] border-[2px] rounded-[12px] p-6">
              <div>
                <div className="flex items-center justify-center">
                  <img src="https://assess-1c314.kxcdn.com/wp-content/uploads/2019/05/BubbleSheetOrange.jpg" alt="paper" width={200} heigth={200} className="rounded-[12px]" />
                </div>
                <div className="flex justify-center font-medium text-[20px] leading-[16px] mt-5">Punjab Exam</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-10 mt-10">
            <div className="border-[#1eadeeb3] border-[2px] rounded-[12px] p-6">
              <div>
                <div className="flex items-center justify-center">
                  <img src="https://assess-1c314.kxcdn.com/wp-content/uploads/2019/05/BubbleSheetOrange.jpg" alt="paper" width={200} heigth={200} className="rounded-[12px]" />
                </div>
                <div className="flex justify-center font-medium text-[20px] leading-[16px] mt-5">PPSC</div>
              </div>
            </div>
            <div className="border-[#1eadeeb3] border-[2px] rounded-[12px] p-6">
              <div>
                <div className="flex items-center justify-center">
                  <img src="https://assess-1c314.kxcdn.com/wp-content/uploads/2019/05/BubbleSheetOrange.jpg" alt="paper" width={200} heigth={200} className="rounded-[12px]" />
                </div>
                <div className="flex justify-center font-medium text-[20px] leading-[16px] mt-5">FPSC</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] bg-[#1eadeeb3] m-auto mb-20 p-6 rounded-[8px]">
          <div className="flex justify-center text-[28px] leading-[24px] font-bold mb-10">Current / Upcoming Jobs</div>
          <div className="">
            <ul class="gap-10 list-disc ml-4">
              <li class="text-red-700 cursor-pointer mb-2"><a href="https://jobs.unicef.org/en-us/filter/?search-keyword=&location=uk">https://jobs.unicef.org/en-us/filter/?search-keyword=&location=uk</a></li>
              <li class="text-red-700 cursor-pointer mb-2"><a href="https://jobs.unicef.org/en-us/filter/?search-keyword=&location=uk">https://jobs.unicef.org/en-us/filter/?search-keyword=&location=uk</a></li>
              <li class="text-red-700 cursor-pointer mb-2"><a href="https://jobs.unicef.org/en-us/filter/?search-keyword=&location=uk">https://jobs.unicef.org/en-us/filter/?search-keyword=&location=uk</a></li>
              <li class="text-red-700 cursor-pointer mb-2"><a href="https://jobs.unicef.org/en-us/filter/?search-keyword=&location=uk">https://jobs.unicef.org/en-us/filter/?search-keyword=&location=uk</a></li>
            </ul>
          </div>
        </div>
        <div className="w-full mb-10">
          <div className="flex justify-center text-[28px] leading-[24px] font-bold mb-10">Subjects</div>
          <div className="grid grid-cols-4 gap-10">
            <div className="bg-[#f2f2f2] w-[350px] h-fit p-6 rounded-[12px]">
              <div className="flex items-center justify-center">
                <img src="https://cdn1.byjus.com/wp-content/uploads/blog/2023/06/21210753/pexels-pixabay-262786.jpg" alt="Research" className="w-[320px] h-[320px]" />
              </div>
              <div className="text-[20px] font-bold flex justify-center py-3">Research</div>
              <div className="flex justify-end text-blue-500 cursor-pointer underline text-[16px]">Explore more</div>
            </div>
            <div className="bg-[#f2f2f2] w-[350px] h-fit p-6 rounded-[12px]">
              <div className="flex items-center justify-center">
                <img src="https://cdn1.byjus.com/wp-content/uploads/blog/2023/06/13112603/Feature-Image-1.png" alt="Research" className="w-[320px] h-[320px]" />
              </div>
              <div className="text-[20px] font-bold flex justify-center py-3">Maths</div>
              <div className="flex justify-end text-blue-500 cursor-pointer underline text-[16px]">Explore more</div>
            </div>
            <div className="bg-[#f2f2f2] w-[350px] h-fit p-6 rounded-[12px]">
              <div className="flex items-center justify-center">
                <img src="https://cdn1.byjus.com/wp-content/uploads/blog/2023/04/27233442/Feature-image-21.jpg" alt="Research" className="w-[320px] h-[320px]" />
              </div>
              <div className="text-[20px] font-bold flex justify-center py-3">GK</div>
              <div className="flex justify-end text-blue-500 cursor-pointer underline text-[16px]">Explore more</div>
            </div>
            <div className="bg-[#f2f2f2] w-[350px] h-fit p-6 rounded-[12px]">
              <div className="flex items-center justify-center">
                <img src="https://cdn1.byjus.com/wp-content/uploads/blog/2023/04/27233442/Feature-image-21.jpg" alt="Research" className="w-[320px] h-[320px]" />
              </div>
              <div className="text-[20px] font-bold flex justify-center py-3">Current Affairs</div>
              <div className="flex justify-end text-blue-500 cursor-pointer underline text-[16px]">Explore more</div>
            </div>
            <div className="bg-[#f2f2f2] w-[350px] h-fit p-6 rounded-[12px]">
              <div className="flex items-center justify-center">
                <img src="https://cdn1.byjus.com/wp-content/uploads/blog/2023/04/27233442/Feature-image-21.jpg" alt="Research" className="w-[320px] h-[320px]" />
              </div>
              <div className="text-[20px] font-bold flex justify-center py-3">English</div>
              <div className="flex justify-end text-blue-500 cursor-pointer underline text-[16px]">Explore more</div>
            </div>
            <div className="bg-[#f2f2f2] w-[350px] h-fit p-6 rounded-[12px]">
              <div className="flex items-center justify-center">
                <img src="https://cdn1.byjus.com/wp-content/uploads/blog/2023/04/27233442/Feature-image-21.jpg" alt="Research" className="w-[320px] h-[320px]" />
              </div>
              <div className="text-[20px] font-bold flex justify-center py-3">Computer</div>
              <div className="flex justify-end text-blue-500 cursor-pointer underline text-[16px]">Explore more</div>
            </div>
            <div className="bg-[#f2f2f2] w-[350px] h-fit p-6 rounded-[12px]">
              <div className="flex items-center justify-center">
                <img src="https://cdn1.byjus.com/wp-content/uploads/blog/2023/06/13112603/Feature-Image-1.png" alt="Research" className="w-[320px] h-[320px]" />
              </div>
              <div className="text-[20px] font-bold flex justify-center py-3">Algebra</div>
              <div className="flex justify-end text-blue-500 cursor-pointer underline text-[16px]">Explore more</div>
            </div>
            <div className="bg-[#f2f2f2] w-[350px] h-fit p-6 rounded-[12px]">
              <div className="flex items-center justify-center">
                <img src="https://cdn1.byjus.com/wp-content/uploads/blog/2023/06/13112603/Feature-Image-1.png" alt="Research" className="w-[320px] h-[320px]" />
              </div>
              <div className="text-[20px] font-bold flex justify-center py-3">Science</div>
              <div className="flex justify-end text-blue-500 cursor-pointer underline text-[16px]">Explore more</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Main;
