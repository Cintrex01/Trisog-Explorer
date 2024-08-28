import { Swiper, SwiperProps } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./Slider.css";
import { ReactNode } from "react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";

interface SliderProps {
  settings: SwiperProps;
  children: ReactNode;
}

export default function Slider({ settings, children }: SliderProps) {
  return (
    <Swiper modules={[Navigation, Pagination, A11y, Autoplay]} {...settings}>
      {children}
    </Swiper>
  );
}
