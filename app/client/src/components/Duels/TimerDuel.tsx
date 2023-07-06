import React from "react";

export const TimerDuel = ({
  countDown,
  defaultCountDown,
}: {
  countDown: number;
  defaultCountDown: number;
}) => {
  interface CountDownStyle extends React.CSSProperties {
    "--value": number;
  }
  const [countDownStyle, setCountDownStyle] = React.useState<CountDownStyle>({
    "--value": countDown,
  });

  React.useEffect(() => {
    setCountDownStyle({
      "--value": countDown,
    });
  }, [countDown]);

  return (
    <React.Fragment>
      <div className="flex justify-center mb-2">
        <span className="countdown font-mono text-6xl">
          <span style={{ ...countDownStyle }}></span>
        </span>
      </div>
      <progress
        className="progress progress-warning w-full mb-2"
        value={countDown}
        max={defaultCountDown}
      ></progress>
    </React.Fragment>
  );
};
