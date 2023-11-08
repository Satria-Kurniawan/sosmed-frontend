import React from "react";

export function useMultistepForm(steps: JSX.Element[]) {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const currentStep = steps[currentIndex];
  const firstStep = currentIndex === 0;
  const lastStep = currentIndex === steps.length - 1;

  const nextStep = () => {
    if (currentIndex >= steps.length - 1) return currentIndex;
    setCurrentIndex((index) => {
      return index + 1;
    });
  };

  const backStep = () => {
    if (currentIndex <= 0) return currentIndex;
    setCurrentIndex((index) => {
      return index - 1;
    });
  };

  return {
    currentStep,
    firstStep,
    lastStep,
    nextStep,
    backStep,
  };
}
