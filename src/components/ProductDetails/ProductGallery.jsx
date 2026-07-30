import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductGallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="space-y-5">
      {/* Main Slider */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="rounded-2xl border border-amazon-border bg-amazon-surface"
      >
        {images.map((image) => (
          <SwiperSlide key={image.public_id}>
            <img
              src={image.url}
              alt="Product"
              className="h-125 w-full object-contain p-4"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={12}
        slidesPerView={4}
        watchSlidesProgress
        className="thumbs-swiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image.public_id}>
            <div className="overflow-hidden rounded-xl border border-amazon-border bg-amazon-surface transition-all duration-200 hover:border-amazon-orange">
              <img
                src={image.url}
                alt="Thumbnail"
                className="h-24 w-full object-contain p-2"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductGallery;
