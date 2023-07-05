import React from "react";

export const TimerDuel = ({
  countDownStyle = {
    "--value": 0,
  },
  countDown,
  defaultCountDown,
}: {
  countDownStyle: React.CSSProperties;
  countDown: number;
  defaultCountDown: number;
}) => {
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
