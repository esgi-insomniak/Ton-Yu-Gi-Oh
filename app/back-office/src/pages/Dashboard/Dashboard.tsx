import React from "react";
import Charts from "@/components/Charts";
import Header from "@/components/Navbar";
import { EChartsOption } from "echarts-for-react";
import axios from "axios";

const Dashboard = () => {
  const [dataHeatmap, setDataHeatmap] = React.useState([]);
  const [userData, setUserData] = React.useState([]);
  const [clickData, setClickData] = React.useState([]);
  const [nbClickTotal, setNbClickTotal] = React.useState(0);
  const [sessionData, setSessionData] = React.useState([]);
  const [nbSessionTotal, setNbSessionTotal] = React.useState(0);
  const [rebondData, setRebondData] = React.useState([]);
  const [percentagesData, setPercentagesData] = React.useState(0);
  const [sessionTimeData, setSessionTimeData] = React.useState([]);
  const [sessionTimeTotal, setSessionTimeTotal] = React.useState("");
  const [graphData, setGraphData] = React.useState([]);
  const currentDate = new Date();

  const last7Days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - index);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");

    const formattedDate = `${day}/${month}`;

    return formattedDate;
  }).reverse();

  const [optionsGraph, setOptionsGraph] = React.useState<EChartsOption>({});

  const userId = localStorage.getItem("id");
  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((res) => {
        setUserData(res.data.appData[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  React.useEffect(() => {
    if (userData === undefined) return;
    if (userData.length > 0) {
      axios
        .get(`http://localhost:3000/mouse-track/distinct/${userData}`)
        .then((response) => {
          const { data } = response;
          setDataHeatmap(data);
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        });
    }
  }, [userData]);

  React.useEffect(() => {
    axios.get(`http://localhost:3000/track/${userData}`).then((response) => {
      const { data } = response;
      setClickData(data);
    });
  }, [userData]);

  React.useEffect(() => {
    let totalClicks = 0;

    if (clickData.length > 0) {
      clickData.forEach((data: any) => {
        totalClicks += data.count;
      });
    }

    const countArray: any = last7Days.map((day) => {
      const matchingData = clickData.find((data: any) => {
        const formattedDate = day.split("/").reverse().join("-");
        const year = new Date().getFullYear();
        const fullDate = `${year}-${formattedDate}`;
        return fullDate === data.date;
      });
      return matchingData ? matchingData.count : 0;
    });

    setGraphData(countArray);

    setOptionsGraph({
      xAxis: {
        type: "category",
        data: last7Days,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: countArray || [],
          type: "line",
          smooth: true,
        },
      ],
    });

    setNbClickTotal(totalClicks);
  }, [clickData]);

  React.useEffect(() => {
    if (userData === undefined) return;
    if (userData.length > 0) {
      axios
        .get(`http://localhost:3000/session/${userData}`)
        .then((response) => {
          const { data } = response;
          setSessionData(data);
        })
        .catch((error) => {
          console.error("Error fetching session data:", error);
        });
    }
  }, [userData]);

  React.useEffect(() => {
    let totalSession = 0;
    if (sessionData.length > 0) {
      sessionData.forEach((data: any) => {
        let nbUser = data.count;
        totalSession += nbUser;
      });
    }

    setNbSessionTotal(totalSession);
  }, [sessionData]);

  React.useEffect(() => {
    if (userData === undefined) return;
    if (userData.length > 0) {
      axios
        .get(`http://localhost:3000/user-page-urls/${userData}`)
        .then((response) => {
          setRebondData(response.data);
        });
    }
  }, [userData]);

  React.useEffect(() => {
    if (rebondData.length > 0) {
      const totalSessions = rebondData.length;
      const sessionsWithSinglePageView = rebondData.filter(
        (session) => session.uniquePageUrls === 1
      );
      const totalSessionsWithSinglePageView = sessionsWithSinglePageView.length;
      const bounceRate = Math.round(
        (totalSessionsWithSinglePageView / totalSessions) * 100
      );
      setPercentagesData(bounceRate);
    }
  }, [rebondData]);

  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/analytics/average-session-time`)
      .then((response) => {
        const { data } = response;
        setSessionTimeData(data);
      });
  }, [userData]);

  React.useEffect(() => {
    if (sessionTimeData.length > 0) {
      const totalSessions = sessionTimeData.length;
      let totalSessionTime = 0;
      sessionTimeData.forEach((data: any) => {
        totalSessionTime += data.averageSessionTime;
      });
      const averageSessionTime = Math.round(totalSessionTime / totalSessions);

      const convertToHHMMSS = (milliseconds: any) => {
        const seconds = Math.floor(milliseconds / 1000);
        const hh = Math.floor(seconds / 3600)
          .toString()
          .padStart(2, "0");
        const mm = Math.floor((seconds % 3600) / 60)
          .toString()
          .padStart(2, "0");
        const ss = Math.floor((seconds % 3600) % 60)
          .toString()
          .padStart(2, "0");
        return `${hh}:${mm}:${ss}`;
      };

      const formattedAverageSessionTime = convertToHHMMSS(averageSessionTime);
      setSessionTimeTotal(formattedAverageSessionTime);
    }
  }, [sessionTimeData]);

  const handleClick = (dataName: string) => {
    let countArray: any = [];

    if (dataName === "click") {
      countArray = last7Days.map((day) => {
        const matchingData = clickData.find((data: any) => {
          const formattedDate = day.split("/").reverse().join("-");
          const year = new Date().getFullYear();
          const fullDate = `${year}-${formattedDate}`;
          return fullDate === data.date;
        });
        return matchingData ? matchingData.count : 0;
      });
    } else if (dataName === "session") {
      countArray = last7Days.map((day) => {
        const matchingData = sessionData.find((data: any) => {
          const formattedDate = day.split("/").reverse().join("-");
          const year = new Date().getFullYear();
          const fullDate = `${year}-${formattedDate}`;
          return fullDate === data.date;
        });
        return matchingData ? matchingData.count : 0;
      });
    } else if (dataName === "rebond") {
      countArray = last7Days.map((day) => {
        const formattedDate = day.split("/").reverse().join("-");
        const year = new Date().getFullYear();
        const fullDate = `${year}-${formattedDate}`;

        const matchingData = rebondData.filter((data: any) =>
          data.sessions.some((session: any) => session.date === fullDate)
        );

        if (matchingData.length === 0) return 0;

        const totalSessions = matchingData.length;
        const sessionsWithSinglePageView = matchingData.filter(
          (data: any) => data.uniquePageUrls === 1
        );
        const totalSessionsWithSinglePageView =
          sessionsWithSinglePageView.length;

        const bounceRate =
          totalSessions > 0
            ? Math.round(
              (totalSessionsWithSinglePageView / totalSessions) * 100
            )
            : 0;

        return bounceRate;
      });
    } else if (dataName === "time") {
      countArray = last7Days.map((day) => {
        const matchingData = sessionTimeData.find((data: any) => {
          const formattedDate = day.split("/").reverse().join("-");
          const year = new Date().getFullYear();
          const fullDate = `${year}-${formattedDate}`;
          return fullDate === data.date;
        });
        const sessionTime = matchingData ? matchingData.averageSessionTime : 0;
        const convertToMinutes = (milliseconds: any) => {
          const minutes = Math.floor(milliseconds / 60000);
          return minutes;
        };

        const formattedSessionTime = convertToMinutes(sessionTime);
        return formattedSessionTime;
      });
    }

    setGraphData(countArray);

    setOptionsGraph({
      xAxis: {
        type: "category",
        data: last7Days,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: countArray || [0, 0, 0, 0, 0, 0, 10],
          type: "line",
          smooth: true,
        },
      ],
    });
  };

  return (
    <React.Fragment>
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <Header />
        <main className="">
          <div className="grid mb-4 pb-10 px-8 rounded-3xl bg-gray-100">
            <div className="grid grid-cols-12 gap-6">
              <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                <div className="col-span-12 mt-8">
                  <div className="flex items-center h-10 intro-y">
                    <h2 className="mr-5 text-lg font-medium truncate">
                      Dashboard
                    </h2>
                  </div>
                  <div className="grid grid-cols-12 gap-6 mt-5">
                    <a
                      className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white cursor-pointer"
                      onClick={() => handleClick("click")}
                    >
                      <div className="p-5">
                        <div className="flex justify-between">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 text-blue-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                        </div>
                        <div className="ml-2 w-full flex-1">
                          <div>
                            <div className="mt-3 text-3xl font-bold leading-8">
                              {nbClickTotal || "Pas de données"}
                            </div>

                            <div className="mt-1 text-base text-gray-600">
                              Nombres de clicks
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a
                      className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white cursor-pointer"
                      onClick={() => handleClick("session")}
                    >
                      <div className="p-5">
                        <div className="flex justify-between">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 text-yellow-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </div>
                        <div className="ml-2 w-full flex-1">
                          <div>
                            <div className="mt-3 text-3xl font-bold leading-8">
                              {nbSessionTotal || "Pas de données"}
                            </div>

                            <div className="mt-1 text-base text-gray-600">
                              Sessions
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a
                      className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white cursor-pointer"
                      onClick={() => handleClick("rebond")}
                    >
                      <div className="p-5">
                        <div className="flex justify-between">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 text-pink-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                            />
                          </svg>
                        </div>
                        <div className="ml-2 w-full flex-1">
                          <div>
                            <div className="mt-3 text-3xl font-bold leading-8">
                              {percentagesData + "%" || "Pas de données"}
                            </div>

                            <div className="mt-1 text-base text-gray-600">
                              Taux de rebond
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a
                      className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white cursor-pointer"
                      onClick={() => handleClick("time")}
                    >
                      <div className="p-5">
                        <div className="flex justify-between">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 text-green-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                            />
                          </svg>
                        </div>
                        <div className="ml-2 w-full flex-1">
                          <div>
                            <div className="mt-3 text-3xl font-bold leading-8">
                              {sessionTimeTotal || "Pas de données"}
                            </div>

                            <div className="mt-1 text-base text-gray-600">
                              Durée de la session
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-span-12 mt-5">
                  <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
                    <div className="bg-white shadow-lg p-4">
                      <Charts options={optionsGraph} />
                    </div>
                  </div>
                </div>
                <div className="col-span-12 mt-5">
                  <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
                    <div className="bg-white p-4 shadow-lg rounded-lg">
                      <h1 className="font-bold text-base">
                        Pages les plus vues
                      </h1>
                      <div className="mt-4">
                        <div className="flex flex-col">
                          <div className="-my-2 overflow-x-auto">
                            <div className="py-2 align-middle inline-block min-w-full">
                              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead>
                                    <tr>
                                      <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex cursor-pointer">
                                          <span className="mr-2">
                                            Nom de la page
                                          </span>
                                        </div>
                                      </th>
                                      <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex cursor-pointer">
                                          <span className="mr-2">
                                            Nombre de click
                                          </span>
                                        </div>
                                      </th>
                                      <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex cursor-pointer">
                                          <span className="mr-2">Heatmap</span>
                                        </div>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {dataHeatmap.length ? (
                                      dataHeatmap.map((item: any, index) => (
                                        <tr key={index}>
                                          <td className="px-6 py-4 whitespace-no-wrap">
                                            <div className="flex items-center">
                                              <div className="ml-4">
                                                <div className="text-sm leading-5 font-medium text-gray-900">
                                                  {item.pageUrl ||
                                                    "Pas de nom de page"}
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-no-wrap">
                                            <div className="flex items-center">
                                              <div className="ml-4">
                                                <div className="text-sm leading-5 font-medium text-gray-900">
                                                  {item.clientIdCount || "0"}
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-no-wrap">
                                            <div className="text-sm leading-5 text-gray-900">
                                              <a href={`/heatmap/${item._id}`}>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  className="h-6 w-6 text-blue-500"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  stroke="currentColor"
                                                >
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 4v16m8-8H4"
                                                  />
                                                </svg>
                                              </a>
                                            </div>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan={3} className="text-center">
                                          Aucune donnée disponible
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
