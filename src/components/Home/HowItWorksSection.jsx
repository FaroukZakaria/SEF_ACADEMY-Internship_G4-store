import { Handbag, CreditCard, Truck } from "lucide-react";

const HowItWorksSection = () => {
    return(
        <section id="howItWorks" className="bg-amazon-surface w-full">
        <div className="bg-amazon-bg/30 w-full flex justify-center text-center">
          <div className="w-full">
            <p className="font-bold text-3xl mt-30">How It Works</p>
            <div className="w-full flex-col md:flex-row flex justify-evenly gap-6 items-center mt-6 mb-42">
              <div className="p-5 w-[350px] flex flex-col items-center">
                <div className="mb-4 bg-amazon-orange/20 rounded-xl p-4">
                  <Handbag size={32} className="text-amazon-orange"/>
                </div>
                <div className="font-medium text-lg">Browse Products</div>
                <div className="text-sm text-amazon-textLight/60">Explore our wide range of premium products</div>
              </div>
              <div className="p-5 w-[350px] flex flex-col items-center">
                <div className="mb-4 bg-amazon-orange/20 rounded-xl p-4">
                  <CreditCard size={32} className="text-amazon-orange"/>
                </div>
                <div className="font-medium text-lg">Add to Cart</div>
                <div className="text-sm text-amazon-textLight/60">Select your favorites and add them to your cart</div>
              </div>
              <div className="p-5 w-[350px] flex flex-col items-center">
                <div className="mb-4 bg-amazon-orange/20 rounded-xl p-4">
                  <Truck size={32} className="text-amazon-orange"/>
                </div>
                <div className="font-medium text-lg">Order & Receive</div>
                <div className="text-sm text-amazon-textLight/60">Place your order and get it delivered to your doorstep</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default HowItWorksSection;