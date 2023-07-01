import React from "react";
import Charts from "@/components/Charts";
import { useParams } from "react-router-dom";
import Header from "@/components/Navbar";
import axios from "axios";
import { EChartsOption } from "echarts-for-react";

const Heatmap = () => {
  const [heatmap, setHeatmap] = React.useState([]);
  const [currentSize, setCurrentSize] = React.useState("lg");
  const [urlName, setUrlName] = React.useState("");
  const params = useParams();

  const screenSize: any = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  };

  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/mouse-track/${params.id}`)
      .then((response) => {
        const { data } = response;
        setUrlName(data[0].pageUrl);
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  }, []);

  React.useEffect(() => {
    if (urlName) {
      const urlNameEncoded = encodeURIComponent(urlName);
      axios
        .get(
          `http://localhost:3000/mouse-track/distinct/${urlNameEncoded}/${currentSize}`
        )
        .then((response) => {
          const { data } = response;
          setHeatmap(data);
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        });
    }
  }, [urlName, currentSize]);

  // I want xAxis and yAxis to be the size of the screen
  const xData = [];
  const yData = [];

  for (let i = 0; i < screenSize[currentSize]; i++) {
    xData.push(i);
    yData.push(i);
  }

  // I want to display a point on the heatmap for each mouse position and more the mouse is on the position, more the point is red else it's blue
  const data: any = [];

  heatmap.forEach((element: any) => {
    data.push([element.mousePosition.x, element.mousePosition.y, 1]);
  });

  const option: EChartsOption = {
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
        name: "Heatmap de la page web",
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

  const handleTabClick = (size: any) => {
    setCurrentSize(size);
  };

  return (
    <React.Fragment>
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <Header />
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
                      Heatmap de la page {urlName || "inconnue"}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
              <ul className="flex flex-wrap text-sm mx-auto font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                {Object.keys(screenSize).map((size) => (
                  <li className="mr-2" key={size}>
                    <div
                      aria-current={currentSize === size ? "page" : undefined}
                      className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 ${
                        currentSize === size ? "active" : ""
                      }`}
                      onClick={() => handleTabClick(size)}
                    >
                      {size.toUpperCase()}
                    </div>
                  </li>
                ))}
              </ul>

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
