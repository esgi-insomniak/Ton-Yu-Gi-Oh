interface TimerProps {
    hours: string;
    minutes: string;
    seconds: string;
}

export const Timer = ({ hours, minutes, seconds }: TimerProps) => {
    return (
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    {/* @ts-ignore */}
                    <span style={{ "--value": hours }} />
                </span>
                hours
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    {/* @ts-ignore */}
                    <span style={{ "--value": minutes }} />
                </span>
                min
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl">
                    {/* @ts-ignore */}
                    <span style={{ "--value": seconds }} />
                </span>
                sec
            </div>
        </div>
    )
}