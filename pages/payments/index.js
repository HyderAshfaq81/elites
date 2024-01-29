import Layout from "../../components/Layouts";
import Desc from "../../components/Paymennts/Desc";
import Plans from "../../components/Paymennts/Plans";

const Payments = () => {
  return (
    <Layout>
      <div className="w-full pt-5 bg-gray-100">
        <div className="w-[85%] m-auto">
          <div className="font-medium text-[32px] leading-[40px] flex justify-center mb-10">Choose your Plan</div>
          <div className="flex w-full">
            <div className="w-1/2">
              <Desc />
            </div>
            <div className="w-1/2">
              <Plans />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Payments;
