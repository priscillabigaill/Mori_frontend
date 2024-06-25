import React from "react";
import { useWindowSize } from "react-use";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import moriLogo from "../../assets/moriWhite.png";
import bell from "../../assets/bell.png";
import hamburg from "../../assets/hamburg.png";
import bg from "../../assets/usercardBG.png";
import collector from "../../assets/collectorLogo.png";
import processor from "../../assets/processorLogo.png";
import shipping from "../../assets/shippingLogo.png";
import { readDryingMachines } from "../../service/dryingMachine";
import { readFlouringMachines } from "../../service/flouringMachine";
import { getCurrentUser } from "../../service/users";
import { readWetLeavesCollections } from "../../service/wetLeaves";
import { readBatches } from "../../service/batches";

const gaugeOptions = {
  responsive: true,
  cutout: "80%",
  circumference: 180,
  rotation: -90,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  maintainAspectRatio: false,
  events: [],
};

export default function CentraHome() {
  const { width } = useWindowSize();
  const isMobile = width <= 640;
  const [username, setUsername]= useState("");

  const [dryMachinesData, setDryMachinesData] = useState([]);
  const [flourMachinesData, setFlourMachinesData] = useState([]);

  const [statusCounts, setStatusCounts] = useState({
    Fresh: 0,
    'Near expiry': 0,
    Exceeded: 0,
    Expired: 0,
    Processed: 0,
  });

  const [batchesToShip, setBatchesToShip] = useState(0);

  useEffect(() => {
    fetchMachines();
    fetchWetLeavesCollections();
    fetchBatches();
    fetchUser();
  }, []);
  
  const fetchMachines = async () => {
    try {
      const [dryResponse, flourResponse] = await Promise.all([
        readDryingMachines(),
        readFlouringMachines(),
        // getCurrentUser(),
      ]);

      const transformedDryData = dryResponse.data.map((machine) => ({
        number: machine.MachineID,
        status: machine.Status,
        currentLoad: machine.Load,
        capacity: machine.Capacity,
        // lastUpdated: machine.lastUpdated,
      }));

      const transformedFlourData = flourResponse.data.map((machine) => ({
        number: machine.MachineID,
        status: machine.Status,
        currentLoad: machine.Load,
        capacity: machine.Capacity,
        // lastUpdated: machine.lastUpdated,
      }));

      console.log(flourResponse.data);

      // setUsername(user.data.FirstName);
      setDryMachinesData(transformedDryData);
      setFlourMachinesData(transformedFlourData);
    } catch (error) {
      console.error("Error fetching machines data:", error);
    }
  };

  const fetchWetLeavesCollections = async () => {
    try {
      const response = await readWetLeavesCollections();
      // Count the statuses
      const counts = {
        Fresh: 0,
        'Near expiry': 0,
        Exceeded: 0,
        Expired: 0,
        Processed: 0,
      };
      response.data.forEach(collection => {
        counts[collection.Status]++;
      });
      setStatusCounts(counts);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching wet leaves collections:", error);
    }
  };

  const fetchBatches = async () => {
    try {
      const response = await readBatches();
      const unshippedBatches = response.data.filter((batch) => !batch.Shipped);
      setBatchesToShip(unshippedBatches.length);
      console.log(unshippedBatches);
    } catch (error) {
      console.error("Error fetching batches: ", error);
    }
  };

  const fetchUser = async () => {
    try {
      const user = await getCurrentUser();
      console.log("User data:", user);
      setUsername(user.data.FirstName); 
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const renderDryMachines = () => {
    return dryMachinesData.map((machine, index) => (
      <MachineCard
        key={machine.number}
        machine={machine}
        extraMarginClass={index === dryMachinesData.length - 1 ? "mb-10" : "mb-4"}
      />
    ));
  };

  const renderFlourMachines = () => {
    return flourMachinesData.map((machine, index) => (
      <MachineCard
        key={machine.number}
        machine={machine}
        extraMarginClass={index === flourMachinesData.length - 1 ? "mb-10" : "mb-4"}
      />
    ));
  };

  const MachineCard = ({ machine, extraMarginClass }) => {
    const chartColor =
      machine.currentLoad === machine.capacity
        ? "#0F3F43"
        : machine.currentLoad > machine.capacity / 2
          ? "#5D9EA4"
          : "#99D0D580";

    const linkTo = `/dryingmachine/${machine.number}`;

    return (
      <div
        className={`machine-card bg-white p-4 rounded-lg shadow ${extraMarginClass} flex flex-col items-center font-vietnam ${machine.status.toLowerCase()}`}
        style={{
          width: "auto",
          flexGrow: 1,
          minWidth: "300px",
          minHeight: "100px",
          maxWidth: "none",
          position: "relative",
        }}
      >
        <div
          className="machine-number bg-black text-white rounded-full h-6 w-6 flex items-center justify-center"
          style={{ position: "absolute", left: "15px", top: "15px" }}
        >
          <span className="font-bold text-sm">{machine.number}</span>
        </div>
        <div className="machine-info flex justify-center items-center w-full mb-2">
          <div
            className="chart-container"
            style={{ width: "150px", height: "120px", position: "relative" }}
          >
            <Doughnut
              data={{
                labels: ["Current Load", "Capacity"],
                datasets: [
                  {
                    data: [
                      machine.currentLoad,
                      machine.capacity - machine.currentLoad,
                    ],
                    backgroundColor: [chartColor, "#EFEFEF"],
                    borderWidth: 0,
                  },
                ],
              }}
              options={gaugeOptions}
            />
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ fontSize: "0" }}
            >
              <span
                className="font-vietnam font-bold"
                style={{ fontSize: "24px", lineHeight: "1.2" }}
              >
                {machine.currentLoad} kg
              </span>
              <span
                className="font-vietnam font-bold"
                style={{
                  fontSize: "12px",
                  lineHeight: "1.2",
                  marginBottom: "-30px",
                }}
              >{`/ ${machine.capacity} kg`}</span>
            </div>
          </div>
        </div>
        {/* <div
          className="last-updated"
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            fontSize: "10px",
            color: "#666666",
          }}
        >
          <div>Last updated:</div>
          <div style={{ fontWeight: "bold" }}>{machine.lastUpdated}</div>
        </div> */}
      </div>
    );
  };

  return (
    <div>
      <style>
        {`
          .bg-custom-c16548 { background-color: #C16548; }
          .bg-custom-86b788 { background-color: #86B788; }
          .bg-custom-f4df67 { background-color: #F4DF67; }
        `}
      </style>

      {isMobile ? (
        <div className="bg-[#F0F0F0]">
          <header
            className="flex flex-col p-4 shadow-md"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Link to="/centra/navigation">
                  <img
                    src={hamburg}
                    alt="divisions"
                    className="text-6xl font-bold text-gray-700 w-5"
                  />
                </Link>
              </div>
              <img
                src={moriLogo}
                alt="mori logo"
                className="text-6xl ml-2 mt-3 font-bold text-gray-700 w-20"
              />
              <div className="flex">
                <Link to="/centra/notification">
                  <img
                    src={bell}
                    alt="notifications"
                    className="text-6xl mr-2 font-bold text-gray-700 w-5"
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-row gap-5 p-3">
              <div className="w-16 h-16 bg-black rounded-full"></div>
              <div className="">
                <p className="text-lg text-white font-semibold">
                  Welcome,
                </p>
                <p className="text-3xl text-white font-semibold">{username}</p>
              </div>
            </div>
          </header>

          <body className="flex flex-col gap-5 px-5 py-5">
            <div>
              <h2 className="text-gray-600 font-bold">Quick Access</h2>
            </div>

            <div className="flex flex-row gap-3">
              <Link to="/centra/collector" className="bg-[#5D9EA4] p-3 flex flex-col gap-3 w-1/3 h-24 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="self-end"
                >
                  <path
                    d="M0.202301 14.4184C0.202301 13.8605 0.321841 13.2935 0.560922 12.7172C0.806132 12.1349 1.19234 11.5801 1.71954 11.0529C1.30268 10.6115 0.999236 10.1395 0.809197 9.63678C0.625289 9.1341 0.533335 8.62835 0.533335 8.11954C0.533335 7.39004 0.704983 6.70038 1.04828 6.05057C1.39157 5.39464 1.85134 4.85211 2.42759 4.42299C3.00383 3.98774 3.64445 3.7272 4.34943 3.64138C4.37395 3.11418 4.52414 2.62682 4.8 2.17931C5.08199 1.7318 5.44674 1.34559 5.89425 1.02069C6.34789 0.695785 6.84751 0.444444 7.3931 0.266667C7.94483 0.0888889 8.50268 0 9.06667 0C9.64291 0 10.1916 0.0950192 10.7126 0.285057C11.2337 0.475096 11.6966 0.775479 12.1012 1.18621C12.4996 0.775479 12.9594 0.475096 13.4805 0.285057C14.0015 0.0950192 14.5533 0 15.1356 0C15.6996 0 16.2544 0.0888889 16.8 0.266667C17.3517 0.444444 17.8513 0.695785 18.2989 1.02069C18.7525 1.34559 19.1172 1.7318 19.3931 2.17931C19.6751 2.62682 19.8284 3.11418 19.8529 3.64138C20.5579 3.7272 21.1985 3.98774 21.7747 4.42299C22.351 4.85211 22.8077 5.39464 23.1448 6.05057C23.4881 6.70038 23.6598 7.39004 23.6598 8.11954C23.6598 8.62835 23.5678 9.1341 23.3839 9.63678C23.2 10.1395 22.8996 10.6115 22.4828 11.0529C23.01 11.5801 23.3931 12.1349 23.6322 12.7172C23.8774 13.2935 24 13.8605 24 14.4184C24 15.1602 23.8437 15.813 23.531 16.377C23.2245 16.9349 22.7985 17.3732 22.2529 17.692C21.7073 18.0107 21.0759 18.1701 20.3586 18.1701C20.0215 18.1701 19.669 18.1241 19.3011 18.0322C18.9333 17.9402 18.5563 17.7992 18.1701 17.6092C17.9801 17.7808 17.7042 17.9648 17.3425 18.1609C16.987 18.351 16.5701 18.5195 16.092 18.6667C15.6199 18.8138 15.1142 18.8966 14.5747 18.9149C14.6789 18.4307 14.8444 17.9034 15.0713 17.3333C15.3042 16.7571 15.5494 16.2054 15.8069 15.6782C16.0705 15.1448 16.3034 14.6912 16.5057 14.3172C15.7946 14.2559 15.2307 14.0475 14.8138 13.692C14.4031 13.3364 14.1057 12.8981 13.9218 12.377C13.6705 12.5609 13.3946 12.7019 13.0943 12.8C12.8 12.892 12.469 12.9379 12.1012 12.9379C11.7333 12.9379 11.3992 12.892 11.0989 12.8C10.8046 12.7019 10.5318 12.5609 10.2805 12.377C10.0966 12.8981 9.79617 13.3364 9.37931 13.692C8.96245 14.0475 8.40153 14.2559 7.69655 14.3172C7.89885 14.6912 8.12874 15.1448 8.38621 15.6782C8.64981 16.2054 8.89502 16.7571 9.12184 17.3333C9.34866 17.9034 9.51724 18.4307 9.62759 18.9149C9.08199 18.8966 8.57012 18.8138 8.09196 18.6667C7.61992 18.5195 7.20613 18.351 6.85058 18.1609C6.49502 17.9648 6.22222 17.7808 6.03219 17.6092C5.63985 17.7992 5.25977 17.9402 4.89196 18.0322C4.53027 18.1241 4.18084 18.1701 3.84368 18.1701C3.12644 18.1701 2.49502 18.0107 1.94943 17.692C1.40383 17.3732 0.974715 16.9349 0.662071 16.377C0.355558 15.813 0.202301 15.1602 0.202301 14.4184ZM12.1012 24C11.6598 24 11.3042 23.9356 11.0345 23.8069C10.7709 23.6782 10.6391 23.5034 10.6391 23.2828C10.6391 23.0927 10.6513 22.8015 10.6759 22.4092C10.7065 22.0169 10.7341 21.5847 10.7586 21.1126C10.7893 20.6406 10.8046 20.187 10.8046 19.7517C10.8046 19.433 10.7556 19.0713 10.6575 18.6667C10.5655 18.2682 10.4337 17.8421 10.2621 17.3885C10.0966 16.9349 9.90345 16.4659 9.68276 15.9816C9.46207 15.4973 9.22606 15.013 8.97471 14.5287C8.72337 14.0383 8.46897 13.5602 8.2115 13.0943L9.14943 11.8437C9.5295 12.4935 9.85134 13.0575 10.1149 13.5356C10.3785 14.0077 10.6054 14.4368 10.7954 14.823C10.9916 15.2092 11.1755 15.5985 11.3471 15.9908L11.3287 11.5034L12.8092 11.5862L12.8552 15.9816C13.0268 15.5893 13.2077 15.2031 13.3977 14.823C13.5877 14.4429 13.8176 13.9985 14.0874 13.4897C14.3632 12.9808 14.7126 12.3402 15.1356 11.5678L16.3586 12.2299C16.0276 12.8674 15.7119 13.4866 15.4115 14.0874C15.1172 14.682 14.8444 15.2521 14.5931 15.7977C14.3479 16.3372 14.1364 16.849 13.9586 17.3333C13.7808 17.8115 13.6429 18.2529 13.5448 18.6575C13.4467 19.0682 13.3977 19.433 13.3977 19.7517C13.3977 20.187 13.41 20.6406 13.4345 21.1126C13.4651 21.5847 13.4927 22.0169 13.5172 22.4092C13.5479 22.8015 13.5632 23.0927 13.5632 23.2828C13.5632 23.5034 13.4284 23.6782 13.1586 23.8069C12.895 23.9356 12.5425 24 12.1012 24Z"
                    fill="white"
                  />
                </svg>
                <div className="font-vietnam text-white flex flex-col">
                  <div className="text-sm font-bold">Collector</div>
                  {Object.entries(statusCounts).map(([status, count]) => (
                    count > 0 && (
                      <div key={status} className="text-[8px] font-normal">
                        {count} Batch{count > 1 ? 'es' : ''} {status.toUpperCase()}
                      </div>
                    )
                  ))}
                </div>
              </Link>
              <Link to="/centra/processor" className="bg-[#4D946D] p-3 flex flex-col gap-3 w-1/3 h-24 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="24"
                  viewBox="0 0 21 24"
                  fill="none"
                  className="self-end"
                >
                  <path
                    d="M0.531799 5.51361V2.61459C0.531799 1.82693 0.76518 1.19608 1.23194 0.722021C1.6987 0.240674 2.31133 0 3.06981 0H16.9851C17.7436 0 18.3526 0.240674 18.8121 0.722021C19.2788 1.19608 19.5122 1.82693 19.5122 2.61459V5.51361H0.531799ZM4.49197 4.37588C4.76182 4.37588 4.99155 4.27743 5.18118 4.08051C5.37809 3.8836 5.47655 3.65022 5.47655 3.38037C5.47655 3.10323 5.37809 2.86985 5.18118 2.68023C4.99155 2.48331 4.76182 2.38486 4.49197 2.38486C4.21484 2.38486 3.97781 2.48331 3.78089 2.68023C3.59127 2.86985 3.49646 3.10323 3.49646 3.38037C3.49646 3.65022 3.59127 3.8836 3.78089 4.08051C3.97781 4.27743 4.21484 4.37588 4.49197 4.37588ZM7.36912 4.37588C7.63896 4.37588 7.8687 4.27743 8.05832 4.08051C8.25524 3.8836 8.35369 3.65022 8.35369 3.38037C8.35369 3.10323 8.25524 2.86985 8.05832 2.68023C7.8687 2.48331 7.63896 2.38486 7.36912 2.38486C7.09198 2.38486 6.8586 2.48331 6.66898 2.68023C6.47936 2.86985 6.38454 3.10323 6.38454 3.38037C6.38454 3.65022 6.47936 3.8836 6.66898 4.08051C6.8586 4.27743 7.09198 4.37588 7.36912 4.37588ZM13.2656 3.94924H15.9568C16.1318 3.94924 16.2704 3.89818 16.3725 3.79608C16.4746 3.68668 16.5257 3.54811 16.5257 3.38037C16.5257 3.21263 16.4746 3.07406 16.3725 2.96466C16.2704 2.85526 16.1318 2.80057 15.9568 2.80057H13.2656C13.0979 2.80057 12.963 2.85526 12.8609 2.96466C12.7587 3.07406 12.7077 3.21263 12.7077 3.38037C12.7077 3.54811 12.7587 3.68668 12.8609 3.79608C12.963 3.89818 13.0979 3.94924 13.2656 3.94924ZM13.014 23.8704C12.89 23.7829 12.7952 23.648 12.7296 23.4657C12.6639 23.2834 12.6858 23.0937 12.7952 22.8968C12.9338 22.6634 13.0249 22.4592 13.0687 22.2842C13.1198 22.1092 13.1453 21.9086 13.1453 21.6825C13.1453 21.2303 13.0541 20.8073 12.8718 20.4135C12.6895 20.0197 12.478 19.6258 12.2373 19.232C11.9966 18.8309 11.7851 18.4006 11.6028 17.9411C11.4205 17.4744 11.3293 16.9493 11.3293 16.3658C11.3293 16.0303 11.3694 15.6985 11.4496 15.3703C11.5371 15.0421 11.6684 14.7358 11.8435 14.4514C11.9747 14.218 12.1498 14.0867 12.3686 14.0575C12.5874 14.0284 12.777 14.0648 12.9374 14.1669C13.0833 14.2544 13.189 14.393 13.2547 14.5826C13.3203 14.765 13.2984 14.9509 13.189 15.1406C13.0505 15.3739 12.9557 15.5818 12.9046 15.7641C12.8536 15.9392 12.828 16.1397 12.828 16.3658C12.828 16.8034 12.9192 17.2191 13.1015 17.6129C13.2911 17.9995 13.5063 18.3933 13.747 18.7944C13.9876 19.1883 14.1991 19.6185 14.3815 20.0853C14.5638 20.5521 14.655 21.0845 14.655 21.6825C14.655 22.3462 14.4872 22.9843 14.1517 23.597C14.0059 23.8376 13.8199 23.9689 13.5938 23.9908C13.3677 24.02 13.1745 23.9798 13.014 23.8704ZM16.1865 23.8595C16.0552 23.772 15.9568 23.6371 15.8912 23.4547C15.8328 23.2797 15.862 23.0901 15.9787 22.8859C16.1099 22.6525 16.1975 22.4483 16.2412 22.2733C16.2923 22.0982 16.3178 21.9013 16.3178 21.6825C16.3178 21.2303 16.2266 20.8073 16.0443 20.4135C15.862 20.0197 15.6505 19.6222 15.4098 19.2211C15.1764 18.8199 14.9649 18.3897 14.7753 17.9302C14.593 17.4707 14.5018 16.9456 14.5018 16.3549C14.5018 16.0194 14.5419 15.6912 14.6221 15.3703C14.7097 15.0421 14.8373 14.7321 15.005 14.4404C15.1363 14.2143 15.3113 14.0903 15.5301 14.0685C15.7489 14.0393 15.9386 14.0721 16.099 14.1669C16.2522 14.2544 16.3616 14.3894 16.4272 14.5717C16.4928 14.754 16.4673 14.94 16.3506 15.1296C16.2193 15.363 16.1282 15.5709 16.0771 15.7532C16.0261 15.9355 16.0006 16.1361 16.0006 16.3549C16.0006 16.7925 16.0917 17.2082 16.274 17.602C16.4637 17.9885 16.6788 18.3824 16.9195 18.7835C17.1602 19.1846 17.3717 19.6185 17.554 20.0853C17.7363 20.5521 17.8275 21.0845 17.8275 21.6825C17.8275 22.3462 17.6561 22.9807 17.3133 23.586C17.182 23.8194 17.0034 23.9507 16.7773 23.9798C16.5585 24.0163 16.3616 23.9762 16.1865 23.8595ZM19.359 23.8486C19.2278 23.7611 19.1293 23.6261 19.0637 23.4438C19.0053 23.2688 19.0308 23.0791 19.1402 22.8749C19.2788 22.6416 19.37 22.4373 19.4137 22.2623C19.4648 22.0873 19.4903 21.8904 19.4903 21.6716C19.4903 21.2194 19.3992 20.7964 19.2168 20.4026C19.0345 20.0087 18.823 19.6113 18.5823 19.2101C18.3416 18.809 18.1301 18.3787 17.9478 17.9192C17.7655 17.4598 17.6743 16.9347 17.6743 16.3439C17.6743 16.0084 17.7144 15.6803 17.7947 15.3594C17.8822 15.0312 18.0098 14.7212 18.1776 14.4295C18.3088 14.2034 18.4839 14.0794 18.7027 14.0575C18.9215 14.0284 19.1111 14.0612 19.2715 14.156C19.4174 14.2435 19.5231 14.3784 19.5888 14.5608C19.6617 14.7431 19.6398 14.9291 19.5231 15.1187C19.3919 15.3521 19.3007 15.5599 19.2496 15.7422C19.1986 15.9246 19.1731 16.1251 19.1731 16.3439C19.1731 16.7815 19.2642 17.1972 19.4466 17.5911C19.6362 17.9776 19.8513 18.3714 20.092 18.7725C20.3327 19.1737 20.5442 19.6076 20.7265 20.0744C20.9088 20.5411 21 21.0735 21 21.6716C21 22.3352 20.8286 22.9697 20.4858 23.5751C20.3546 23.8085 20.1759 23.9397 19.9498 23.9689C19.731 24.0054 19.5341 23.9653 19.359 23.8486ZM5.97978 18.5537C5.68805 18.5537 5.54219 18.4042 5.54219 18.1052V11.1147C5.54219 10.8157 5.68805 10.6662 5.97978 10.6662H14.0642C14.3559 10.6662 14.5018 10.8157 14.5018 11.1147V12.8213C14.4216 12.8578 14.3487 12.9089 14.283 12.9745C14.2174 13.0401 14.159 13.1094 14.108 13.1824C13.9767 13.0146 13.7725 12.8578 13.4954 12.7119C13.2182 12.5588 12.8937 12.4822 12.5217 12.4822C11.8945 12.4822 11.3767 12.6828 10.9683 13.0839C10.5672 13.485 10.2681 13.9846 10.0712 14.5826C9.87431 15.1807 9.77586 15.7751 9.77586 16.3658C9.77586 16.8034 9.81232 17.2009 9.88525 17.5582C9.96548 17.9156 10.0603 18.2474 10.1697 18.5537H5.97978ZM3.06981 22.9734C2.31133 22.9734 1.6987 22.7327 1.23194 22.2514C0.76518 21.7773 0.531799 21.1465 0.531799 20.3588V7.00141H19.5122V12.5697C19.2351 12.4822 18.9616 12.453 18.6917 12.4822C18.4219 12.5114 18.163 12.588 17.915 12.7119C17.6743 12.8286 17.4555 12.9818 17.2586 13.1714C17.0471 12.9672 16.821 12.8068 16.5804 12.6901C16.347 12.5661 16.0625 12.5004 15.7271 12.4931V10.9178C15.7271 10.4802 15.5885 10.1265 15.3113 9.85668C15.0415 9.58683 14.6914 9.45191 14.2611 9.45191H5.78286C5.35257 9.45191 5.00249 9.58683 4.73265 9.85668C4.4628 10.1265 4.32788 10.4802 4.32788 10.9178V18.3021C4.32788 18.7397 4.4628 19.0934 4.73265 19.3633C5.00249 19.6331 5.35257 19.7681 5.78286 19.7681H10.6401C10.8662 20.2202 11.0813 20.5922 11.2855 20.8839C11.4897 21.1829 11.5918 21.4491 11.5918 21.6825C11.5918 21.9451 11.5335 22.1748 11.4168 22.3717C11.3074 22.5686 11.2272 22.7692 11.1761 22.9734H3.06981Z"
                    fill="white"
                  />
                </svg>
                <div className="font-vietnam text-white flex flex-col">
                  <div className="text-sm font-bold">Processor</div>
                  <div className="text-[8px] font-normal">2 Machine FULL</div>
                </div>
              </Link>
              <Link to="/centra/shipping" className="bg-[#00000099] p-3 flex flex-col gap-3 w-1/3 h-24 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                  className="self-end"
                >
                  <path
                    d="M12.5662 24V12.6838L22.9118 6.77206C22.9706 6.99265 23 7.27206 23 7.61029V16.2022C23 17.0037 22.864 17.5956 22.5919 17.9779C22.3272 18.3529 21.9375 18.6875 21.4228 18.9816L12.7868 23.9007C12.75 23.9228 12.7132 23.9412 12.6765 23.9559C12.6397 23.9779 12.6029 23.9926 12.5662 24ZM11.0551 24C11.0184 23.9926 10.9816 23.9779 10.9449 23.9559C10.9154 23.9412 10.8824 23.9228 10.8456 23.9007L2.19853 18.9816C1.69118 18.6875 1.30147 18.3529 1.02941 17.9779C0.757352 17.5956 0.621323 17.0037 0.621323 16.2022V7.61029C0.621323 7.27206 0.650734 6.99265 0.709558 6.77206L11.0551 12.6838V24ZM11.8162 11.3603L1.41544 5.45956C1.5772 5.3125 1.78309 5.16912 2.03309 5.02941L6.08088 2.72426L16.5257 8.69118L11.8162 11.3603ZM18.0588 7.81985L7.56985 1.86397L9.80882 0.595588C10.4926 0.198529 11.1618 0 11.8162 0C12.4632 0 13.1287 0.198529 13.8125 0.595588L21.5993 5.02941C21.8419 5.16912 22.0441 5.3125 22.2059 5.45956L18.0588 7.81985Z"
                    fill="white"
                  />
                </svg>
                <div className="font-vietnam text-white flex flex-col">
                  <div className="text-sm font-bold">Shipping</div>
                  <div className="text-[8px] font-normal">{batchesToShip} Batch{batchesToShip > 1 ? "es" : ""} to ship</div>
                </div>
              </Link>
            </div>

            {/* Dry Machine Stock Status */}
            <div>
              <div>
                <h2 className="text-gray-600 font-bold ">
                  Drying Machine Stock Status
                </h2>
              </div>
              <div className="machine-status my-4">{renderDryMachines()}</div>
            </div>

            {/* Flour Machine Stock Status */}
            <div>
              <div>
                <h2 className="text-gray-600 font-bold ">
                  Flouring Machine Stock Status
                </h2>
              </div>
              <div className="machine-status my-4">{renderFlourMachines()}</div>
            </div>
          </body>

          <footer className="font-vietnam bg-gray-200 text-black flex justify-between items-center h-10 px-3 fixed bottom-0 left-0 right-0">
            <p className="font-bold">@2024 MORI</p>
            <p className="font-semibold">CENTRA</p>
          </footer>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen mt-4 text-gray-600">
          Not available for this device.
        </div>
      )}
    </div>
  );
}
