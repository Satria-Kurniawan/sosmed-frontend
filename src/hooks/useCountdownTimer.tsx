import React from "react";

type CountdownTimer = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

export function useCountdownTimer(targetDate: Date): CountdownTimer {
  const calculateTimeLeft = (): CountdownTimer => {
    const difference = +targetDate - +new Date();
    let timeLeft: CountdownTimer = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0"),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24)
          .toString()
          .padStart(2, "0"),
        minutes: Math.floor((difference / 1000 / 60) % 60)
          .toString()
          .padStart(2, "0"),
        seconds: Math.floor((difference / 1000) % 60)
          .toString()
          .padStart(2, "0"),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = React.useState<CountdownTimer>(
    calculateTimeLeft()
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return timeLeft;
}
