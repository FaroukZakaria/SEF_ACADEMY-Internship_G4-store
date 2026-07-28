import { Sparkles } from "lucide-react";

const HeroSection = () => {
    return(
        <section id="Intro" className="bg-gradient-to-br from-[#ffac3f] from-20% via-[#ff9900] via-55% to-[#b86800] w-full h-[500px] md:h-[600px] flex items-center">
        <div className="w-[600px] flex flex-col p-6 text-amazon-textBase">
          <div className="flex gap-2">
            <Sparkles size={24} className="inline" />
            <p className="font-medium">
              Premium Shopping Experience
            </p>
          </div>
          <h1 className="font-bold text-4xl md:text-6xl my-5">Shop the future, delivered today</h1>
          <p className="font-semibold text-lg mb-6">Discover premium products at unbeatable prices. Fast delivery, easy returns, and exceptional quality.</p>
          <div className="flex gap-6">
            <a href="/shop" className="bg-amazon-navy hover:bg-amazon-navy/90 p-3 text-lg font-medium rounded-lg text-amazon-textBase">Shop Now</a>
            <a href="#categories" className="bg-white hover:bg-white/90 p-3 text-lg text-black font-semibold rounded-lg">View Categories</a>
          </div>
        </div>
      </section>
    );
}

export default HeroSection;