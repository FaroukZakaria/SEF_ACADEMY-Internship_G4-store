import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import ProductCard from "../Shop/ProductCard";

import "swiper/css";
import "swiper/css/pagination";

const ProductCarousel = ({
  products = [],
  delay = 4000,
}) => {
  const [paginationEl, setPaginationEl] = useState(null);

  if (!products.length) return null;

  return (
    <div className="relative max-w-xl mx-auto pb-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={paginationEl ? { clickable: true, el: paginationEl } : false}
        loop={products.length > 1}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard
              product={product}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {products.length > 1 && (
        <div
          ref={setPaginationEl}
          className="custom-pagination-wrapper absolute bottom-0 left-0 right-0 mx-auto z-10
          flex items-center justify-center gap-1.5 !w-fit"
        />
      )}
    </div>
  );
};

export default ProductCarousel;