import { Mail } from "lucide-react";

const SubscriptionSection = () => {
    return(
        <section id="subscribe" className="bg-amazon-surface w-full">
        <div className="bg-amazon-bg/30 w-full text-center pb-20">
          <div className="bg-gradient-to-r from-[#ffb649] from-20% to-[#ffa216] mx-8 flex-col items-center rounded-2xl py-10">
                <div className="flex justify-center">
                  <Mail size={38} className="text-amazon-textDark"/>
                </div>
                <div className="font-extrabold my-3 text-3xl">
                  Stay Updated
                </div>
                <div className="text-amazon-textDark/80 mb-5 w-[350px] mx-auto">
                  Subscribe to our newsletter and get exclusive deals and new arrivals first.
                </div>
                <div className="flex justify-center items-center">
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                    <input className="focus:ring-inset focus:ring-2 focus:ring-amazon-textDark/40 outline-none bg-amazon-surface/30 rounded-xl px-4 py-3 w-[360px] sm:w-[280px]" type="email" placeholder="Enter your email" />
                    <div className="bg-amazon-lightNavy hover:bg-amazon-lightNavy/90 cursor-pointer text-amazon-textBase px-4 py-3 rounded-xl w-[360px] sm:w-30 ">Subscribe</div>
                  </div>
                </div>
          </div>
        </div>
      </section>
    );
}

export default SubscriptionSection;