import React from 'react';
import OurLogoWithoutRect from '@/assets/logo';
import Charts from '@/components/Charts';

const Dashboard = () => {
  const [optionsGraph, setOptionsGraph] = React.useState<any>({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
  });

  const handleClick = (dataName: string) => {
    console.log(dataName);

    setOptionsGraph({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
        },
      ],
    });
  };

  return (
    <React.Fragment>
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <header className="z-40 py-4  bg-gray-800 flex justify-between items-center">
          <div className="flex justify-center">
            <div className="flex items-center mx-5">
              <OurLogoWithoutRect width="80" height="80" />
              <div className="flex items-center mx-5">
                <p className="text-2xl text-green-500 font-semibold">WEB</p>
                <p className="ml-2 font-semibold italic text-white">
                  ANALYTICS
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between h-8 px-6">
            <ul className="flex items-center flex-shrink-0 space-x-6">
              <li className="relative">
                <button
                  className="p-2 bg-white text-green-400 align-middle rounded-full hover:text-white hover:bg-green-400 focus:outline-none "
                  aria-label="Notifications"
                  aria-haspopup="true"
                >
                  <div className="flex items-cemter">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                  ></span>
                </button>
                <template>
                  <ul className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-green-400 border border-green-500 rounded-md shadow-md">
                    <li className="flex">
                      <a
                        className="text-white inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                        href="#"
                      >
                        <span>Messages</span>
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600">
                          13
                        </span>
                      </a>
                    </li>
                  </ul>
                </template>
              </li>

              <li className="relative">
                <button
                  className="p-2 bg-white text-green-400 align-middle rounded-full hover:text-white hover:bg-green-400 focus:outline-none "
                  aria-label="Account"
                  aria-haspopup="true"
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </button>
                <template>
                  <ul
                    className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-green-400 border border-green-500 rounded-md shadow-md"
                    aria-label="submenu"
                  >
                    <li className="flex">
                      <a
                        className=" text-white inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Profile</span>
                      </a>
                    </li>
                    <li className="flex">
                      <a
                        className="text-white inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>Log out</span>
                      </a>
                    </li>
                  </ul>
                </template>
              </li>
            </ul>
          </div>
        </header>
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
                      onClick={() => handleClick('users')}
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
                          <div className="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                            <span className="flex items-center">30%</span>
                          </div>
                        </div>
                        <div className="ml-2 w-full flex-1">
                          <div>
                            <div className="mt-3 text-3xl font-bold leading-8">
                              4.510
                            </div>

                            <div className="mt-1 text-base text-gray-600">
                              Utilisateurs
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a
                      className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white cursor-pointer"
                      onClick={() => handleClick('session')}
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
                          <div className="bg-red-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                            <span className="flex items-center">30%</span>
                          </div>
                        </div>
                        <div className="ml-2 w-full flex-1">
                          <div>
                            <div className="mt-3 text-3xl font-bold leading-8">
                              4.510
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
                      onClick={() => handleClick('rebond')}
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
                          <div className="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                            <span className="flex items-center">30%</span>
                          </div>
                        </div>
                        <div className="ml-2 w-full flex-1">
                          <div>
                            <div className="mt-3 text-3xl font-bold leading-8">
                              4.510
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
                      onClick={() => handleClick('time')}
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
                          <div className="bg-blue-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                            <span className="flex items-center">30%</span>
                          </div>
                        </div>
                        <div className="ml-2 w-full flex-1">
                          <div>
                            <div className="mt-3 text-3xl font-bold leading-8">
                              4.510
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
                                            Nombre de visiteurs
                                          </span>
                                        </div>
                                      </th>
                                      <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex cursor-pointer">
                                          <span className="mr-2">
                                            Nombres de clique
                                          </span>
                                        </div>
                                      </th>
                                      <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex cursor-pointer">
                                          <span className="mr-2">
                                            Temps passé sur la page
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
                                    <tr>
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                        <p>tonyugigi.fr</p>
                                      </td>
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                        <p>9999999</p>
                                      </td>
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                        <p>9999999</p>
                                      </td>
                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                        <p>15min52</p>
                                      </td>
                                      <td>
                                        <a href="/heatmap/{pageId}" className="text-blue-500">
                                          Heatmap de la page
                                        </a>
                                      </td>
                                    </tr>
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
