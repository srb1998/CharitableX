import Lottie from 'react-lottie';

const LottieAnimation = ({ animationPath, width, height }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: require(`./${animationPath}`),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default LottieAnimation;