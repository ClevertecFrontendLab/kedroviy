import Lottie from "lottie-react";
import groovyWalkAnimation from "./apploader.json";

export const Loader = () => {
  return <Lottie
    animationData={groovyWalkAnimation}
    data-test-id='loader'
  />;
};
