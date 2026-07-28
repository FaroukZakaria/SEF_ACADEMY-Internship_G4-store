import ProductCard from "../Shop/ProductCard";
import ProductCarousel from "./productCarousel"
import { ArrowRight } from "lucide-react";

  const FeaturedProductsSection = ({loadingProducts, featuredProducts}) => {
    return(
        <section id="featuredProducts" className="bg-amazon-surface w-full">
        <div className="bg-amazon-bg/30 w-full flex justify-center px-5 md:px-8 lg:px-8 pb-5">
          <div className="w-full">
            <div className="flex justify-between">
              <div className="flex flex-col justify-center gap-2">
                <p className="font-bold text-3xl">Featured Products</p>
                <p className="text-amazon-textLight">Handpicked just for you</p>
              </div>
              <a className="mt-[16px] font-semibold text-amazon-orange hover:text-amazon-orangeHover" href="/shop">
                View All <ArrowRight size={20} className="pb-0.5 inline" />
              </a>
            </div>
            {loadingProducts ? 
              (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-7">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-2xl border border-amazon-border bg-amazon-surface"
                    >
                      <div className="shimmer h-60 w-full" />

                      <div className="space-y-4 p-5">
                        <div className="shimmer h-4 w-24 rounded" />

                        <div className="shimmer h-5 w-full rounded" />

                        <div className="shimmer h-5 w-4/5 rounded" />

                        <div className="shimmer h-4 w-20 rounded" />

                        <div className="flex gap-3">
                          <div className="shimmer h-6 w-20 rounded" />

                          <div className="shimmer h-6 w-14 rounded" />
                        </div>

                        <div className="shimmer h-11 w-full rounded-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                    <>
                      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mt-7">
                        {featuredProducts.slice(0,8).map((product) => (
                          <ProductCard
                            key={product._id}
                            product={product}
                        />))}
                      </div>
                      <div className="md:hidden mt-7">
                        <ProductCarousel products={featuredProducts}/>
                      </div>
                    </>
                  )
            }
          </div>
        </div>
      </section>
    );
}

export default FeaturedProductsSection;