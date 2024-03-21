import { Carousel } from "@material-tailwind/react";
const CarouselBanner = () => {
  return (
    <Carousel
      className="flex rounded-xl overflow-hidden w-full"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      autoplay={true}
      loop={true}
    >
      <img
        src="smile.jpg"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="cancer.jpg"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="world.jpg"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}

export default CarouselBanner