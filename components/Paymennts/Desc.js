import React from "react";

const Desc = () => {
  return (
    <div className="mr-[45px]">
      <div className="text-[20px] font-medium leading-[32px] mb-[24px]"></div>
      <div className="w-[70%] p-[24px] rounded-[12px]" style={{ backgroundColor: 'rgba(29, 175, 236, 0.1)' }}>
        <div class="p-4">
          <h2 class="text-lg font-semibold mb-[20px]">Elites Pool Features</h2>
          <ul class="list-disc ml-4">
            <li className="text-[14px] font-medium leading-[24px] mb-[16px]">Course-specific resources</li>
            <li className="text-[14px] font-medium leading-[24px] mb-[16px]">Upload Documents</li>
            <li className="text-[14px] font-medium leading-[24px] mb-[16px]">Mock Quizes</li>
            <li className="text-[14px] font-medium leading-[24px] mb-[16px]">Test Quizes</li>
            <li className="text-[14px] font-medium leading-[24px] mb-[16px]">Test Marking</li>
            <li className="text-[14px] font-medium leading-[24px] mb-[16px]">Ranking</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Desc;
