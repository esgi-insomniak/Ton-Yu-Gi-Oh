import React from "react";
import OurLogoWithoutRect from "@/assets/logo";
import Charts from "@/components/Charts";
import { useParams } from "react-router-dom";

const Heatmap = () => {
  const [showSubmenu, setShowSubmenu] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);
  const params = useParams();
  console.log(params);

  let noise = getNoiseHelper();
  let xData: number[] = [];
  let yData: number[] = [];
  noise.seed(Math.random());

  function generateData(theta: number, min: number, max: number) {
    let data: number[][] = [];
    for (let i = 0; i <= 200; i++) {
      for (let j = 0; j <= 100; j++) {
        // let x = (max - min) * i / 200 + min;
        // let y = (max - min) * j / 100 + min;
        data.push([i, j, noise.perlin2(i / 40, j / 20) + 0.5]);
        // data.push([i, j, normalDist(theta, x) * normalDist(theta, y)]);
      }
      xData.push(i);
    }
    for (let j = 0; j < 100; j++) {
      yData.push(j);
    }
    return data;
  }

  let data = generateData(2, -5, 5);

  const option = {
    tooltip: {},
    xAxis: {
      type: "category",
      data: xData,
    },
    yAxis: {
      type: "category",
      data: yData,
    },
    visualMap: {
      min: 0,
      max: 1,
      calculable: true,
      realtime: false,
      inRange: {
        color: [
          "#313695",
          "#4575b4",
          "#74add1",
          "#abd9e9",
          "#e0f3f8",
          "#ffffbf",
          "#fee090",
          "#fdae61",
          "#f46d43",
          "#d73027",
          "#a50026",
        ],
      },
    },
    series: [
      {
        name: "Gaussian",
        type: "heatmap",
        data: data,
        emphasis: {
          itemStyle: {
            borderColor: "#333",
            borderWidth: 1,
          },
        },
        progressive: 1000,
        animation: false,
      },
    ],
  };

  function getNoiseHelper() {
    class Grad {
      x: number;
      y: number;
      z: number;
      constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
      }

      dot2(x: number, y: number) {
        return this.x * x + this.y * y;
      }

      dot3(x: number, y: number, z: number) {
        return this.x * x + this.y * y + this.z * z;
      }
    }

    const grad3 = [
      new Grad(1, 1, 0),
      new Grad(-1, 1, 0),
      new Grad(1, -1, 0),
      new Grad(-1, -1, 0),
      new Grad(1, 0, 1),
      new Grad(-1, 0, 1),
      new Grad(1, 0, -1),
      new Grad(-1, 0, -1),
      new Grad(0, 1, 1),
      new Grad(0, -1, 1),
      new Grad(0, 1, -1),
      new Grad(0, -1, -1),
    ];
    const p = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
      140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247,
      120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177,
      33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165,
      71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211,
      133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25,
      63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
      135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217,
      226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206,
      59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248,
      152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22,
      39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218,
      246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
      81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
      184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93,
      222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
    ];
    // To remove the need for index wrapping, double the permutation table length
    let perm = new Array(512);
    let gradP = new Array(512);
    // This isn't a very good seeding function, but it works ok. It supports 2^16
    // different seed values. Write something better if you need more seeds.
    function seed(seed: number) {
      if (seed > 0 && seed < 1) {
        // Scale the seed out
        seed *= 65536;
      }
      seed = Math.floor(seed);
      if (seed < 256) {
        seed |= seed << 8;
      }
      for (let i = 0; i < 256; i++) {
        let v;
        if (i & 1) {
          v = p[i] ^ (seed & 255);
        } else {
          v = p[i] ^ ((seed >> 8) & 255);
        }
        perm[i] = perm[i + 256] = v;
        gradP[i] = gradP[i + 256] = grad3[v % 12];
      }
    }
    seed(0);
    // ##### Perlin noise stuff
    function fade(t: number) {
      return t * t * t * (t * (t * 6 - 15) + 10);
    }
    function lerp(a: number, b: number, t: number) {
      return (1 - t) * a + t * b;
    }
    // 2D Perlin Noise
    function perlin2(x: number, y: number) {
      // Find unit grid cell containing point
      let X = Math.floor(x),
        Y = Math.floor(y);
      // Get relative xy coordinates of point within that cell
      x = x - X;
      y = y - Y;
      // Wrap the integer cells at 255 (smaller integer period can be introduced here)
      X = X & 255;
      Y = Y & 255;
      // Calculate noise contributions from each of the four corners
      let n00 = gradP[X + perm[Y]].dot2(x, y);
      let n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
      let n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
      let n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);
      // Compute the fade curve value for x
      let u = fade(x);
      // Interpolate the four results
      return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
    }

    return {
      seed,
      perlin2,
    };
  }

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
                  onClick={() => {
                    setShowNotification(!showNotification),
                      setShowSubmenu(false);
                  }}
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
                <div>
                  {showNotification && (
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
                  )}
                </div>
              </li>

              <li className="relative">
                <button
                  className="p-2 bg-white text-green-400 align-middle rounded-full hover:text-white hover:bg-green-400 focus:outline-none "
                  aria-label="Account"
                  aria-haspopup="true"
                  onClick={() => {
                    setShowSubmenu(!showSubmenu), setShowNotification(false);
                  }}
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
                <div>
                  {showSubmenu && (
                    <ul
                      className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-green-400 border border-green-500 rounded-md shadow-md block"
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
                          <span>Profil</span>
                        </a>
                      </li>
                      <li className="flex">
                        <a
                          className="text-white inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                          href="/logout"
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
                          <span>Se déconnecter</span>
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </header>
        <main className="">
          <div className="grid pb-5 px-8 rounded-3xl bg-gray-100">
            <div className="grid grid-cols-12 gap-6">
              <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                <div
                  className="col-span-12 cursor-pointer mt-8"
                  onClick={() => {
                    history.back();
                  }}
                >
                  <p>← Retour à la page précédente</p>
                </div>
                <div className="col-span-12">
                  <div className="flex items-center h-10 intro-y">
                    <h2 className="mr-5 text-lg font-medium truncate">
                      Heatmap de la page {params.id}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
              <div className="bg-white shadow-lg charts">
                <Charts options={option} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Heatmap;
