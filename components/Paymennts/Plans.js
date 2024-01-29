import React from "react";

const Plans = () => {
  return (
    <>
      <div className="border-[1px] border-grey rounded-[12px] mb-1">
        <div className="grid grid-cols-7">
          <div className="p-[24px] text-[20px] font-medium leading-[32px] col-span-1 rounded-tl-[12px]" style={{ backgroundColor: 'rgba(29, 175, 236, 0.1)' }}>Plan</div>
          <div className="p-[24px] text-[20px] font-medium leading-[32px] col-span-3 bg-white">Elite Trio</div>
          <div className="p-[24px] text-[20px] font-medium leading-[32px] col-span-3 bg-white rounded-tr-[12px]">Premier</div>
        </div>
        <div className="grid grid-cols-7">
          <div className="p-[24px] text-[14px] font-medium leading-[16px] col-span-1" style={{ backgroundColor: 'rgba(29, 175, 236, 0.1)' }}>Annual</div>
          <div className="p-[24px] col-span-3 bg-white">
            <label class="">
              <input type="radio" name="subscription" class="form-radio h-4 w-5 text-indigo-600" />
              <span class="ml-2 text-gray-700">$11.95 <span className="text-[12px]">/mo</span></span>
            </label>
            <div className="ml-6 text-[14px] leading-[24px] bg-white">$143.40 charged yearly</div>
            <div className="font-bold ml-6 text-[14px] leading-[24px] text-[#ce0098]">Save $216/year</div>
          </div>
          <div className="p-[24px] col-span-3 bg-white">
            <label class="">
              <input type="radio" name="subscription" class="form-radio h-4 w-5 text-indigo-600" />
              <span class="ml-2 text-gray-700">$11.95 <span className="text-[12px]">/mo</span></span>
            </label>
            <div className="ml-6 text-[14px] leading-[24px]">$143.40 charged yearly</div>
            <div className="font-bold ml-6 text-[14px] leading-[24px] text-[#ce0098]">Save $216/year</div>
          </div>
        </div>
        <div className="grid grid-cols-7">
          <div className="p-[24px] text-[14px] font-medium leading-[16px] col-span-1" style={{ backgroundColor: 'rgba(29, 175, 236, 0.1)' }}>Quarterly</div>
          <div className="p-[24px] col-span-3 bg-white">
            <label class="">
              <input type="radio" name="subscription" class="form-radio h-4 w-5 text-indigo-600" />
              <span class="ml-2 text-gray-700">$11.95 <span className="text-[12px]">/mo</span></span>
            </label>
            <div className="ml-6 text-[14px] leading-[24px]">$143.40 charged yearly</div>
            <div className="font-bold ml-6 text-[14px] leading-[24px] text-[#ce0098]">Save $216/year</div>
          </div>
          <div className="p-[24px] col-span-3 bg-white">
            <label class="">
              <input type="radio" name="subscription" class="form-radio h-4 w-5 text-indigo-600" />
              <span class="ml-2 text-gray-700">$11.95 <span className="text-[12px]">/mo</span></span>
            </label>
            <div className="ml-6 text-[14px] leading-[24px]">$143.40 charged yearly</div>
            <div className="font-bold ml-6 text-[14px] leading-[24px] text-[#ce0098]">Save $216/year</div>
          </div>
        </div>
        <div className="grid grid-cols-7">
          <div className="p-[24px] text-[14px] font-medium leading-[16px] col-span-1 rounded-bl-[12px]" style={{ backgroundColor: 'rgba(29, 175, 236, 0.1)' }}>Monthly</div>
          <div className="p-[24px] col-span-3 bg-white">
            <label class="">
              <input type="radio" name="subscription" class="form-radio h-4 w-5 text-indigo-600" />
              <span class="ml-2 text-gray-700">$11.95 <span className="text-[12px]">/mo</span></span>
            </label>
            <div className="ml-6 text-[14px] leading-[24px]">$143.40 charged yearly</div>
            <div className="font-bold ml-6 text-[14px] leading-[24px] text-[#ce0098]">Save $216/year</div>
          </div>
          <div className="p-[24px] col-span-3 bg-white rounded-br-[12px]">
            <label class="">
              <input type="radio" name="subscription" class="form-radio h-4 w-5 text-indigo-600" />
              <span class="ml-2 text-gray-700">$11.95 <span className="text-[12px]">/mo</span></span>
            </label>
            <div className="ml-6 text-[14px] leading-[24px]">$143.40 charged yearly</div>
            <div className="font-bold ml-6 text-[14px] leading-[24px] text-[#ce0098]">Save $216/year</div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mb-10">
        <div className="flex items-center">
          <div className="w-[20px] h-[20px]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="tw-inline tw-w-[20px] tw-h-[20px] tw-mr-4 tw-text-gray-50">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="text-[14px] leading-[24px]">Pause or cancel anytime</div>
        </div>
        <div className="flex items-center">
          <div className="w-[20px] h-[20px]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="tw-inline tw-w-[20px] tw-h-[20px] tw-mr-4 tw-text-gray-50">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"></path>
            </svg>
          </div>
          <div className="text-[14px] leading-[24px]">Money Back Guarantee</div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-10">
          <div className="text-[20px] font-medium leading-[32px]">Payment method</div>
          <div className="flex items-center gap-4">
            <div className="text-[14px] leading-[16px]">Secured by</div>
            <img src='/digicert.png' alt="secure" width={80} height={38} />
          </div>
        </div>
        <div className="mb-10">
          <div className="w-full cursor-pointer hover:shadow-lg border-[1px] border-gray-500 p-6 rounded-lg flex items-center space-x-2 bg-white">
            <input type="radio" name="payment" className="form-radio h-4 w-5 text-indigo-600" />
            <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png" alt="paypal" width={78} height={40} />
          </div>
        </div>
        <div className="flex justify-between items-center mb-10 p-[24px]" style={{ backgroundColor: 'rgba(29, 175, 236, 0.1)' }}>
          <div className="text-[16px] leading-[24px]">
            Upload your own study resources to earn <span className="font-bold">FREE</span> access
          </div>
          <div>
            <button className="text-[#5e2ae7] border-[1px] border-[#5e2ae7] text-[16px] p-2 rounded-[5px]"> Upload Now </button>
          </div>
        </div>

      </div>
    </>
  )
}
export default Plans;
