export interface StatProps {
    title: string;
    value: string;
    desc: string;
    icon: React.ReactNode;
}

interface PropsRelou {
    data: StatProps[];
}

export const Stats = ({ data }: PropsRelou) => {
    return (
        <div className="stats shadow-xl border md:w-auto sm:w-[375px] w-[375px]">

            {data.map((stat, index) => (
                <div className="stat">
                    <div className="stat-figure text-secondary">{stat.icon}</div>
                    <div className="stat-title">{stat.title}</div>
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-desc">{stat.desc}</div>
                </div>
            ))}
        </div>
    )
}