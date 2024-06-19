import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import ArrowDown from "../../assets/XYZ/arrowdown.png";
import { getAllCentras } from "../../service/centras";
import { readExpeditions } from "../../service/expeditionService";
import { getAllUsers } from "../../service/users";
import { getAllHarborGuards } from "../../service/harborGuardService";
import { getAllWarehouses } from "../../service/warehousesService";

const DashboardContent = () => {
  const initialConvertionRate = {
    id: 0,
    conversionRate: 0,
    wetToDry: 0,
    dryToFloured: 0
  };
  const initialCentra = {
    CentralID: 0, 
    Address: ""
  };
  const [selectedConversionRate, setSelectedConversionRate] = useState(initialConvertionRate);
  const [selectedCentra, setSelectedCentra] = useState(initialCentra);
  const [conversionRateDropdownVisible, setConversionRateDropdownVisible] = useState(false);
  const [totalShipments, setTotalShipments] = useState(0);
  const [centraCount, setCentraCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [harborCount, setHarborCount] = useState(0);
  const [xyzCount, setXyzCount] = useState(0);
  const [centras, setCentras] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expeditions = await readExpeditions();
        const centras = await getAllCentras();
        const users = await getAllUsers();
        const harborGuards = await getAllHarborGuards();
        const warehouses = await getAllWarehouses();

        // console.log("Expeditions Data: ", expeditions.data); // Debugging line
        const expeditionIDs = expeditions.data.map(item => item.expedition.ExpeditionID);
        // console.log("Expedition IDs: ", expeditionIDs); // Debugging line
        setTotalShipments(new Set(expeditionIDs).size);

        setCentraCount(centras.data.length);
        setUserCount(users.data.length);
        setHarborCount(harborGuards.data.length);
        setXyzCount(warehouses.data.length);
        setCentras(centras.data); // Assuming getAllCentras returns the conversion rates
        setSelectedCentra(centras.data[0]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCentra) {
      const fetchConversionRate = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/secured/conversion_rates/${selectedCentra.CentralID}`);
          setSelectedConversionRate(response.data);
        } catch (error) {
          console.error("Error fetching conversion rate data: ", error);
        }
      };

      fetchConversionRate();
    }
  }, [selectedCentra]);

  const toggleConversionRateDropdown = () => {
    setConversionRateDropdownVisible(!conversionRateDropdownVisible);
  };

  const selectConversionRate = (centra) => {
    setSelectedCentra(centra);
    setConversionRateDropdownVisible(false);
  };

  const chartData = {
    datasets: [
      {
        data: [selectedConversionRate?.conversionRate || 0, 100 - (selectedConversionRate?.conversionRate || 0)],
        backgroundColor: ['#176E76', '#E0E0E0'],
      },
    ],
  };

  const gaugeOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
    rotation: 270,
    circumference: 180,
  };

  return (
    <div className="bg-white p-3">
      <div className='flex justify-between items-center'>
        <h1 className="text-3xl font-bold mb-6">Overview</h1>
        <div className="inline-flex items-center border rounded-full px-4 py-2">
          <svg className="w-4 h-4 text-black mr-2" width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.60938 8.85449C3.45443 8.85449 3.32454 8.80208 3.21973 8.69727C3.11491 8.59245 3.0625 8.46256 3.0625 8.30762C3.0625 8.15267 3.11491 8.02506 3.21973 7.9248C3.32454 7.81999 3.45443 7.76758 3.60938 7.76758H6.51465V3.83008C6.51465 3.67969 6.56706 3.55208 6.67188 3.44727C6.77669 3.34245 6.9043 3.29004 7.05469 3.29004C7.20964 3.29004 7.33952 3.34245 7.44434 3.44727C7.54915 3.55208 7.60156 3.67969 7.60156 3.83008V8.30762C7.60156 8.46256 7.54915 8.59245 7.44434 8.69727C7.33952 8.80208 7.20964 8.85449 7.05469 8.85449H3.60938ZM7.06152 15.0615C6.09538 15.0615 5.1862 14.877 4.33398 14.5078C3.48177 14.1432 2.72982 13.6351 2.07812 12.9834C1.43099 12.3317 0.922852 11.5798 0.553711 10.7275C0.18457 9.87533 0 8.96615 0 8C0 7.03385 0.18457 6.12467 0.553711 5.27246C0.922852 4.42025 1.43099 3.67057 2.07812 3.02344C2.72982 2.37174 3.47949 1.86133 4.32715 1.49219C5.17936 1.12305 6.08854 0.938477 7.05469 0.938477C8.02539 0.938477 8.93685 1.12305 9.78906 1.49219C10.6413 1.86133 11.3932 2.37174 12.0449 3.02344C12.6966 3.67057 13.207 4.42025 13.5762 5.27246C13.9453 6.12467 14.1299 7.03385 14.1299 8C14.1299 8.96615 13.9453 9.87533 13.5762 10.7275C13.207 11.5798 12.6966 12.3317 12.0449 12.9834C11.3932 13.6351 10.6413 14.1432 9.78906 14.5078C8.93685 14.877 8.02767 15.0615 7.06152 15.0615ZM7.06152 13.667C7.84994 13.667 8.58594 13.5212 9.26953 13.2295C9.95312 12.9378 10.5547 12.5322 11.0742 12.0127C11.5938 11.4932 11.9993 10.8916 12.291 10.208C12.5827 9.52441 12.7285 8.78841 12.7285 8C12.7285 7.21615 12.5827 6.48242 12.291 5.79883C11.9993 5.11068 11.5938 4.50684 11.0742 3.9873C10.5547 3.46777 9.95085 3.06217 9.2627 2.77051C8.5791 2.47884 7.8431 2.33301 7.05469 2.33301C6.27083 2.33301 5.53483 2.47884 4.84668 2.77051C4.16309 3.06217 3.5638 3.46777 3.04883 3.9873C2.53385 4.50684 2.13053 5.11068 1.83887 5.79883C1.5472 6.48242 1.40137 7.21615 1.40137 8C1.40137 8.78841 1.5472 9.52441 1.83887 10.208C2.13053 10.8916 2.53385 11.4932 3.04883 12.0127C3.56836 12.5322 4.16992 12.9378 4.85352 13.2295C5.54167 13.5212 6.27767 13.667 7.06152 13.667Z" fill="black"/>
          </svg>
          <span className="text-black font-semibold mr-2">30 Days</span>
          <span className="text-gray-500">Oct 26/24 - Nov 26/24</span>
          <svg className="w-4 h-4 text-black ml-2" width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.60938 8.85449C3.45443 8.85449 3.32454 8.80208 3.21973 8.69727C3.11491 8.59245 3.0625 8.46256 3.0625 8.30762C3.0625 8.15267 3.11491 8.02506 3.21973 7.9248C3.32454 7.81999 3.45443 7.76758 3.60938 7.76758H6.51465V3.83008C6.51465 3.67969 6.56706 3.55208 6.67188 3.44727C6.77669 3.34245 6.9043 3.29004 7.05469 3.29004C7.20964 3.29004 7.33952 3.34245 7.44434 3.44727C7.54915 3.55208 7.60156 3.67969 7.60156 3.83008V8.30762C7.60156 8.46256 7.54915 8.59245 7.44434 8.69727C7.33952 8.80208 7.20964 8.85449 7.05469 8.85449H3.60938ZM7.06152 15.0615C6.09538 15.0615 5.1862 14.877 4.33398 14.5078C3.48177 14.1432 2.72982 13.6351 2.07812 12.9834C1.43099 12.3317 0.922852 11.5798 0.553711 10.7275C0.18457 9.87533 0 8.96615 0 8C0 7.03385 0.18457 6.12467 0.553711 5.27246C0.922852 4.42025 1.43099 3.67057 2.07812 3.02344C2.72982 2.37174 3.47949 1.86133 4.32715 1.49219C5.17936 1.12305 6.08854 0.938477 7.05469 0.938477C8.02539 0.938477 8.93685 1.12305 9.78906 1.49219C10.6413 1.86133 11.3932 2.37174 12.0449 3.02344C12.6966 3.67057 13.207 4.42025 13.5762 5.27246C13.9453 6.12467 14.1299 7.03385 14.1299 8C14.1299 8.96615 13.9453 9.87533 13.5762 10.7275C13.207 11.5798 12.6966 12.3317 12.0449 12.9834C11.3932 13.6351 10.6413 14.1432 9.78906 14.5078C8.93685 14.877 8.02767 15.0615 7.06152 15.0615ZM7.06152 13.667C7.84994 13.667 8.58594 13.5212 9.26953 13.2295C9.95312 12.9378 10.5547 12.5322 11.0742 12.0127C11.5938 11.4932 11.9993 10.8916 12.291 10.208C12.5827 9.52441 12.7285 8.78841 12.7285 8C12.7285 7.21615 12.5827 6.48242 12.291 5.79883C11.9993 5.11068 11.5938 4.50684 11.0742 3.9873C10.5547 3.46777 9.95085 3.06217 9.2627 2.77051C8.5791 2.47884 7.8431 2.33301 7.05469 2.33301C6.27083 2.33301 5.53483 2.47884 4.84668 2.77051C4.16309 3.06217 3.5638 3.46777 3.04883 3.9873C2.53385 4.50684 2.13053 5.11068 1.83887 5.79883C1.5472 6.48242 1.40137 7.21615 1.40137 8C1.40137 8.78841 1.5472 9.52441 1.83887 10.208C2.13053 10.8916 2.53385 11.4932 3.04883 12.0127C3.56836 12.5322 4.16992 12.9378 4.85352 13.2295C5.54167 13.5212 6.27767 13.667 7.06152 13.667Z" fill="black"/>
          </svg>
        </div>
      </div>
      <div className='flex'>
        <div className="w-full lg:w-2/3 mt-6 mr-10 ml-3">
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg w-full p-6 lg:p-10">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current text-gray-500 mr-1"
                style={{ marginBottom: '-0.65em' }}>
                <path d="M4.99219 2.47266C4.75781 2.47266 4.5599 2.39453 4.39844 2.23828C4.24219 2.07682 4.16406 1.87891 4.16406 1.64453C4.16406 1.41536 4.24219 1.22005 4.39844 1.05859C4.5599 0.897135 4.75781 0.816406 4.99219 0.816406H15.5625C15.7917 0.816406 15.987 0.897135 16.1484 1.05859C16.3099 1.22005 16.3906 1.41536 16.3906 1.64453C16.3906 1.87891 16.3099 2.07682 16.1484 2.23828C15.987 2.39453 15.7917 2.47266 15.5625 2.47266H4.99219ZM4.99219 7.32422C4.75781 7.32422 4.5599 7.24349 4.39844 7.08203C4.24219 6.92057 4.16406 6.72526 4.16406 6.49609C4.16406 6.26693 4.24219 6.07422 4.39844 5.91797C4.5599 5.75651 4.75781 5.67578 4.99219 5.67578H15.5625C15.7917 5.67578 15.987 5.75651 16.1484 5.91797C16.3099 6.07422 16.3906 6.26693 16.3906 6.49609C16.3906 6.73047 16.3099 6.92839 16.1484 7.08984C15.987 7.24609 15.7917 7.32422 15.5625 7.32422H4.99219ZM4.99219 12.1758C4.75781 12.1758 4.5599 12.0977 4.39844 11.9414C4.24219 11.7799 4.16406 11.582 4.16406 11.3477C4.16406 11.1185 4.24219 10.9232 4.39844 10.7617C4.5599 10.6003 4.75781 10.5195 4.99219 10.5195H15.5625C15.7917 10.5195 15.987 10.6003 16.1484 10.7617C16.3099 10.9232 16.3906 11.1185 16.3906 11.3477C16.3906 11.582 16.3099 11.7799 16.1484 11.9414C15.987 12.0977 15.7917 12.1758 15.5625 12.1758H4.99219ZM1.1875 2.82422C0.859375 2.82422 0.578125 2.70964 0.34375 2.48047C0.114583 2.2513 0 1.97266 0 1.64453C0 1.31641 0.114583 1.03776 0.34375 0.808594C0.578125 0.579427 0.859375 0.464844 1.1875 0.464844C1.51042 0.464844 1.78906 0.579427 2.02344 0.808594C2.25781 1.03776 2.375 1.31641 2.375 1.64453C2.375 1.97266 2.25781 2.2513 2.02344 2.48047C1.78906 2.70964 1.51042 2.82422 1.1875 2.82422ZM1.1875 7.68359C0.859375 7.68359 0.578125 7.56641 0.34375 7.33203C0.114583 7.09766 0 6.81901 0 6.49609C0 6.17318 0.114583 5.89453 0.34375 5.66016C0.578125 5.42578 0.859375 5.30859 1.1875 5.30859C1.51042 5.30859 1.78906 5.42578 2.02344 5.66016C2.25781 5.89453 2.375 6.17318 2.375 6.49609C2.375 6.81901 2.25781 7.09766 2.02344 7.33203C1.78906 7.56641 1.51042 7.68359 1.1875 7.68359ZM1.1875 12.5352C0.859375 12.5352 0.578125 12.418 0.34375 12.1836C0.114583 11.9544 0 11.6758 0 11.3477C0 11.0195 0.114583 10.7409 0.34375 10.5117C0.578125 10.2826 0.859375 10.168 1.1875 10.168C1.51042 10.168 1.78906 10.2826 2.02344 10.5117C2.25781 10.7409 2.375 11.0195 2.375 11.3477C2.375 11.6758 2.25781 11.9544 2.02344 12.1836C1.78906 12.418 1.51042 12.5352 1.1875 12.5352Z" fill="black"/>
              </svg>
              Summary
            </h3>
            <div className="mb-4rounded-lg p-6">
              <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-3">
                <span className="font-bold text-xl flex items-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current text-gray-500 mr-1"
                    style={{ marginBottom: '-0.65em' }}>
                    <path d="M9.48438 10.7773C8.89583 10.7773 8.35938 10.6341 7.875 10.3477C7.39583 10.056 7.01042 9.67057 6.71875 9.19141C6.43229 8.70703 6.28906 8.17057 6.28906 7.58203C6.28906 6.99349 6.43229 6.45703 6.71875 5.97266C7.01042 5.48828 7.39583 5.10286 7.875 4.81641C8.35938 4.52474 8.89583 4.37891 9.48438 4.37891C10.0729 4.37891 10.6068 4.52474 11.0859 4.81641C11.5703 5.10286 11.9557 5.48828 12.2422 5.97266C12.5339 6.45703 12.6797 6.99349 12.6797 7.58203C12.6797 8.17057 12.5339 8.70703 12.2422 9.19141C11.9557 9.67057 11.5703 10.056 11.0859 10.3477C10.6068 10.6341 10.0729 10.7773 9.48438 10.7773ZM9.48438 9.98047C9.9375 9.98047 10.3411 9.8763 10.6953 9.66797C11.0547 9.45443 11.3385 9.16797 11.5469 8.80859C11.7604 8.44401 11.8672 8.03516 11.8672 7.58203C11.8672 7.12891 11.7604 6.72266 11.5469 6.36328C11.3333 5.9987 11.0469 5.70964 10.6875 5.49609C10.3333 5.28255 9.93229 5.17578 9.48438 5.17578C9.03646 5.17578 8.63281 5.28255 8.27344 5.49609C7.91927 5.70964 7.63802 5.9987 7.42969 6.36328C7.22135 6.72266 7.11719 7.12891 7.11719 7.58203C7.11719 8.03516 7.22135 8.44401 7.42969 8.80859C7.63802 9.16797 7.91927 9.45443 8.27344 9.66797C8.63281 9.8763 9.03646 9.98047 9.48438 9.98047ZM9.48438 3.57422C9.59375 3.57422 9.68229 3.61068 9.75 3.68359C9.81771 3.75651 9.85156 3.84505 9.85156 3.94922V5.81641C9.85156 5.92057 9.8151 6.00911 9.74219 6.08203C9.67448 6.15495 9.58854 6.19141 9.48438 6.19141C9.38021 6.19141 9.29167 6.15755 9.21875 6.08984C9.15104 6.01693 9.11719 5.92578 9.11719 5.81641V3.94922C9.11719 3.84505 9.15104 3.75651 9.21875 3.68359C9.29167 3.61068 9.38021 3.57422 9.48438 3.57422ZM11.2422 7.94922C11.138 7.94922 11.0495 7.91276 10.9766 7.83984C10.9089 7.76693 10.875 7.68099 10.875 7.58203C10.875 7.47266 10.9089 7.38411 10.9766 7.31641C11.0495 7.2487 11.138 7.21484 11.2422 7.21484H13.1172C13.2161 7.21484 13.3021 7.2513 13.375 7.32422C13.4479 7.39193 13.4844 7.47786 13.4844 7.58203C13.4844 7.68099 13.4479 7.76693 13.375 7.83984C13.3021 7.91276 13.2161 7.94922 13.1172 7.94922H11.2422ZM9.48438 11.5742C9.38542 11.5742 9.29948 11.5404 9.22656 11.4727C9.15365 11.3997 9.11719 11.3086 9.11719 11.1992V9.33203C9.11719 9.22786 9.15365 9.14193 9.22656 9.07422C9.29948 9.0013 9.38542 8.96484 9.48438 8.96484C9.59375 8.96484 9.68229 9.0013 9.75 9.07422C9.81771 9.14714 9.85156 9.23307 9.85156 9.33203V11.1992C9.85156 11.3086 9.8151 11.3997 9.74219 11.4727C9.67448 11.5404 9.58854 11.5742 9.48438 11.5742ZM5.85938 7.94922C5.75 7.94922 5.66146 7.91276 5.59375 7.83984C5.52604 7.76693 5.49219 7.68099 5.49219 7.58203C5.49219 7.47786 5.52865 7.39193 5.60156 7.32422C5.67448 7.2513 5.76042 7.21484 5.85938 7.21484H7.73438C7.83333 7.21484 7.91927 7.2487 7.99219 7.31641C8.0651 7.38411 8.10156 7.47266 8.10156 7.58203C8.10156 7.68099 8.0651 7.76693 7.99219 7.83984C7.91927 7.91276 7.83333 7.94922 7.73438 7.94922H5.85938ZM9.49219 8.13672C9.33594 8.13672 9.20312 8.08203 9.09375 7.97266C8.98438 7.86328 8.92969 7.73047 8.92969 7.57422C8.92969 7.42318 8.98438 7.29297 9.09375 7.18359C9.20312 7.07422 9.33594 7.01953 9.49219 7.01953C9.64323 7.01953 9.77083 7.07422 9.875 7.18359C9.98438 7.29297 10.0391 7.42318 10.0391 7.57422C10.0391 7.73047 9.98438 7.86328 9.875 7.97266C9.77083 8.08203 9.64323 8.13672 9.49219 8.13672ZM1.95312 14.2461C1.34375 14.2461 0.864583 14.0742 0.515625 13.7305C0.171875 13.3815 0 12.8997 0 12.2852V2.87891C0 2.26432 0.171875 1.78516 0.515625 1.44141C0.864583 1.09766 1.34375 0.925781 1.95312 0.925781H17.0156C17.625 0.925781 18.1016 1.09766 18.4453 1.44141C18.7943 1.78516 18.9688 2.26432 18.9688 2.87891V12.2852C18.9688 12.8997 18.7943 13.3815 18.4453 13.7305C18.1016 14.0742 17.625 14.2461 17.0156 14.2461H1.95312ZM2.03906 12.7461H16.9297C17.0911 12.7461 17.2214 12.6966 17.3203 12.5977C17.4193 12.4987 17.4688 12.3685 17.4688 12.207V2.97266C17.4688 2.80078 17.4193 2.66797 17.3203 2.57422C17.2214 2.47526 17.0911 2.42578 16.9297 2.42578H2.03906C1.8776 2.42578 1.7474 2.47526 1.64844 2.57422C1.54948 2.66797 1.5 2.80078 1.5 2.97266V12.207C1.5 12.3685 1.54948 12.4987 1.64844 12.5977C1.7474 12.6966 1.8776 12.7461 2.03906 12.7461ZM6.9375 16.0273V14.082H12.0312V16.0273H6.9375ZM6.89844 17.0742C6.70052 17.0742 6.53125 17.0039 6.39062 16.8633C6.25521 16.7227 6.1875 16.556 6.1875 16.3633C6.1875 16.1654 6.25521 15.9961 6.39062 15.8555C6.53125 15.7201 6.70052 15.6523 6.89844 15.6523H12.0703C12.2682 15.6523 12.4349 15.7201 12.5703 15.8555C12.7057 15.9961 12.7734 16.1654 12.7734 16.3633C12.7734 16.556 12.7057 16.7227 12.5703 16.8633C12.4349 17.0039 12.2682 17.0742 12.0703 17.0742H6.89844Z" fill="#5D9EA4"/>
                  </svg>
                  Centra
                </span>
                <div className="bg-[#CCE8EA] text-white rounded-lg px-8 py-2">
                  <span className="text-xl text-black">{centraCount}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-3">
                <span className="font-bold text-xl flex items-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current text-gray-500 mr-1"
                    style={{ marginBottom: '-0.65em' }}>
                    <path d="M12.8777 11.4269C12.658 11.6604 12.4908 11.9328 12.3764 12.2442C12.2619 12.5509 12.2047 12.8806 12.2047 13.2332C12.2047 13.3293 12.2115 13.4255 12.2253 13.5216H7.85027C7.86401 13.4301 7.87088 13.3362 7.87088 13.24C7.87088 12.8554 7.79762 12.496 7.6511 12.1617C7.50916 11.8229 7.30998 11.5276 7.05357 11.2758C6.80174 11.0193 6.50641 10.8202 6.16758 10.6782C5.83333 10.5317 5.47619 10.4584 5.09615 10.4584C4.71154 10.4584 4.34982 10.5317 4.01099 10.6782C3.67674 10.8202 3.38141 11.0193 3.125 11.2758C2.87317 11.5276 2.67399 11.8229 2.52747 12.1617C2.38553 12.496 2.31456 12.8554 2.31456 13.24C2.31456 13.3362 2.32143 13.4301 2.33516 13.5216H1.86813C1.46062 13.5216 1.11722 13.4507 0.837912 13.3087C0.563187 13.1714 0.354853 12.9653 0.212912 12.6906C0.0709707 12.4113 0 12.0679 0 11.6604V2.64938C0 2.03583 0.157967 1.57109 0.473901 1.25515C0.789835 0.939217 1.25458 0.78125 1.86813 0.78125H11.0096C11.6232 0.78125 12.0879 0.941506 12.4038 1.26202C12.7198 1.57795 12.8777 2.04041 12.8777 2.64938V11.4269ZM13.8187 4.57246H15.6456C15.9844 4.57246 16.2729 4.61825 16.511 4.70982C16.7491 4.8014 16.9712 4.95936 17.1772 5.18372L19.5124 7.82109C19.7047 8.03629 19.8329 8.24233 19.897 8.43922C19.9657 8.63152 20 8.89709 20 9.23592V11.6604C20 12.2648 19.8443 12.7249 19.533 13.0409C19.2216 13.3614 18.7637 13.5216 18.1593 13.5216H17.7404C17.7541 13.4255 17.761 13.3293 17.761 13.2332C17.761 12.8486 17.6854 12.4891 17.5343 12.1549C17.3878 11.816 17.1841 11.5207 16.9231 11.2689C16.6667 11.0125 16.369 10.8133 16.0302 10.6714C15.696 10.5248 15.3365 10.4516 14.9519 10.4516C14.7459 10.4516 14.5467 10.4791 14.3544 10.534C14.1621 10.5844 13.9835 10.6553 13.8187 10.7469V4.57246ZM15.5975 8.95433H18.6745C18.6607 8.87649 18.6355 8.80323 18.5989 8.73455C18.5623 8.66587 18.5165 8.60176 18.4615 8.54224L16.3668 6.19334C16.234 6.04224 16.1081 5.94609 15.989 5.90488C15.87 5.86367 15.7326 5.84306 15.5769 5.84306H14.9725V8.32933C14.9725 8.52163 15.0275 8.67502 15.1374 8.78949C15.2518 8.89938 15.4052 8.95433 15.5975 8.95433ZM5.09615 15.2181C4.72985 15.2181 4.3956 15.1288 4.09341 14.9502C3.79579 14.7716 3.55769 14.5313 3.37912 14.2291C3.20513 13.9314 3.11813 13.6018 3.11813 13.24C3.11813 12.8737 3.20513 12.5418 3.37912 12.2442C3.55769 11.942 3.79579 11.7039 4.09341 11.5299C4.3956 11.3513 4.72985 11.262 5.09615 11.262C5.45788 11.262 5.78755 11.3513 6.08516 11.5299C6.38736 11.7039 6.62775 11.942 6.80632 12.2442C6.98489 12.5418 7.07418 12.8737 7.07418 13.24C7.07418 13.6018 6.98489 13.9314 6.80632 14.2291C6.62775 14.5313 6.38965 14.7716 6.09203 14.9502C5.79441 15.1288 5.46245 15.2181 5.09615 15.2181ZM14.9794 15.2181C14.6177 15.2181 14.2857 15.1288 13.9835 14.9502C13.6859 14.7716 13.4478 14.5313 13.2692 14.2291C13.0907 13.9269 13.0014 13.5949 13.0014 13.2332C13.0014 12.8669 13.0907 12.5349 13.2692 12.2373C13.4478 11.9351 13.6859 11.697 13.9835 11.523C14.2857 11.3444 14.6177 11.2552 14.9794 11.2552C15.3457 11.2552 15.6777 11.3444 15.9753 11.523C16.2729 11.697 16.511 11.9351 16.6896 12.2373C16.8681 12.5349 16.9574 12.8669 16.9574 13.2332C16.9574 13.5995 16.8681 13.9314 16.6896 14.2291C16.5156 14.5313 16.2775 14.7716 15.9753 14.9502C15.6777 15.1288 15.3457 15.2181 14.9794 15.2181Z" fill="black" fillOpacity="0.6"/>
                  </svg>
                  Shipment
                </span>
                <div className="bg-[#CECECE] text-white rounded-lg px-8 py-2">
                  <span className="text-xl text-black">{totalShipments}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-3">
                <span className="font-bold text-xl flex items-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current text-gray-500 mr-1"
                    style={{ marginBottom: '-0.65em' }}>
                    <path d="M8.00641 17.0438V9.45876L14.9409 5.49621C14.9803 5.64407 15 5.83135 15 6.05807V11.8171C15 12.3543 14.9088 12.751 14.7265 13.0073C14.549 13.2587 14.2878 13.4829 13.9428 13.68L8.15426 16.9772C8.12962 16.992 8.10498 17.0043 8.08034 17.0142C8.05569 17.029 8.03105 17.0388 8.00641 17.0438ZM6.99359 17.0438C6.96895 17.0388 6.94431 17.029 6.91966 17.0142C6.89995 17.0043 6.87777 16.992 6.85313 16.9772L1.05717 13.68C0.717102 13.4829 0.45589 13.2587 0.273534 13.0073C0.0911779 12.751 0 12.3543 0 11.8171V6.05807C0 5.83135 0.0197141 5.64407 0.0591424 5.49621L6.99359 9.45876V17.0438ZM7.5037 8.57162L0.532282 4.61647C0.64071 4.5179 0.778709 4.42179 0.946279 4.32815L3.65944 2.78305L10.6604 6.78256L7.5037 8.57162ZM11.688 6.19853L4.65747 2.20642L6.15821 1.35624C6.61656 1.0901 7.06506 0.957031 7.5037 0.957031C7.93741 0.957031 8.38344 1.0901 8.84179 1.35624L14.0611 4.32815C14.2238 4.42179 14.3593 4.5179 14.4677 4.61647L11.688 6.19853Z" fill="#4D946D"/>
                  </svg>
                  Harbor Guard
                </span>
                <div className="bg-[#A1D3B7] text-white rounded-lg px-8 py-2">
                  <span className="text-xl text-black">{harborCount}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-3">
                <span className="font-bold text-xl flex items-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current text-gray-500 mr-1"
                    style={{ marginBottom: '-0.65em' }}>
                    <path d="M11.1034 14.5325V9.67337C11.1034 9.49867 11.051 9.35891 10.9462 9.25409C10.8414 9.14927 10.7016 9.09686 10.5269 9.09686H7.75667C7.58197 9.09686 7.43971 9.14927 7.3299 9.25409C7.22508 9.35891 7.17267 9.49867 7.17267 9.67337V14.5325H11.1034ZM2.42583 14.278V8.57277L8.68507 3.32429C8.98955 3.06473 9.29652 3.06473 9.60599 3.32429L15.8652 8.57277V14.278C15.8652 14.817 15.7055 15.2388 15.3861 15.5433C15.0666 15.8478 14.6323 16 14.0833 16H4.20777C3.65372 16 3.21697 15.8478 2.89752 15.5433C2.58306 15.2388 2.42583 14.817 2.42583 14.278ZM0 7.54703C0 7.31742 0.0973327 7.12026 0.291998 6.95554L8.09359 0.404305C8.41803 0.134768 8.76993 0 9.14927 0C9.52862 0 9.87802 0.134768 10.1975 0.404305L17.9916 6.95554C18.1862 7.11527 18.2836 7.31992 18.2836 7.56949C18.2836 7.78412 18.2087 7.95383 18.059 8.07861C17.9142 8.2034 17.7345 8.26579 17.5199 8.26579C17.4051 8.26579 17.2953 8.23834 17.1905 8.18343C17.0856 8.12853 16.9883 8.06614 16.8985 7.99626L9.47122 1.75948C9.3664 1.66963 9.25909 1.62471 9.14927 1.62471C9.03946 1.62471 8.93215 1.66963 8.82733 1.75948L1.39261 7.99626C1.29777 8.06614 1.19794 8.12853 1.09312 8.18343C0.993293 8.23834 0.885977 8.26579 0.771175 8.26579C0.531586 8.26579 0.341912 8.19591 0.202153 8.05615C0.0673842 7.9114 0 7.74169 0 7.54703ZM13.7688 3.91577V2.08142C13.7688 1.91671 13.8187 1.78443 13.9186 1.6846C14.0234 1.57978 14.1582 1.52737 14.3229 1.52737H15.3336C15.5034 1.52737 15.6381 1.57978 15.738 1.6846C15.8378 1.78443 15.8877 1.91671 15.8877 2.08142V5.69771L13.7688 3.91577Z" fill="#A7AD6F"/>
                  </svg>
                  XYZ
                </span>
                <div className="bg-[#F2F9A9] text-white rounded-lg px-8 py-2">
                  <span className="text-xl text-black">{xyzCount}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-3">
                <span className="font-bold text-xl flex items-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current text-gray-500 mr-1"
                    style={{ marginBottom: '-0.65em' }}>
                    <path d="M1.59763 17.0239C1.10059 17.0239 0.710059 16.9115 0.426036 16.6866C0.142012 16.4618 0 16.1541 0 15.7635C0 15.1896 0.171598 14.589 0.514793 13.9618C0.863905 13.3346 1.36391 12.7458 2.01479 12.1955C2.6716 11.6452 3.46154 11.1985 4.38462 10.8553C5.30769 10.5121 6.3432 10.3405 7.49112 10.3405C8.64497 10.3405 9.68343 10.5121 10.6065 10.8553C11.5296 11.1985 12.3166 11.6452 12.9675 12.1955C13.6243 12.7458 14.1272 13.3346 14.4763 13.9618C14.8254 14.589 15 15.1896 15 15.7635C15 16.1541 14.858 16.4618 14.574 16.6866C14.2899 16.9115 13.8994 17.0239 13.4024 17.0239H1.59763ZM7.5 8.76059C6.85503 8.76059 6.26036 8.58603 5.71598 8.23692C5.17751 7.88781 4.7426 7.41739 4.41124 6.82568C4.0858 6.23396 3.92308 5.57124 3.92308 4.83751C3.92308 4.11562 4.0858 3.46473 4.41124 2.88485C4.7426 2.29905 5.18047 1.83455 5.72485 1.49136C6.26923 1.14816 6.86095 0.976562 7.5 0.976562C8.14497 0.976562 8.73965 1.1452 9.28402 1.48248C9.8284 1.81976 10.2633 2.2813 10.5888 2.8671C10.9201 3.44698 11.0858 4.09786 11.0858 4.81976C11.0858 5.5594 10.9201 6.22804 10.5888 6.82568C10.2633 7.41739 9.8284 7.88781 9.28402 8.23692C8.73965 8.58603 8.14497 8.76059 7.5 8.76059Z" fill="#CD4848"/>
                  </svg>
                  User
                </span>
                <div className="bg-[#DF8A8A] text-white rounded-lg px-8 py-2">
                  <span className="text-xl text-black">{userCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3 mt-6">
          <div className="relative z-30">
            <button
              className="flex items-center text-[#A7AD6F] font-semibold"
              onClick={toggleConversionRateDropdown}
            >
              {selectedCentra.Address}
              <img src={ArrowDown} alt="Arrow Down" className="ml-2 w-4" />
            </button>
            {conversionRateDropdownVisible && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 shadow-md z-40">
                {centras.map((centra) => (
                  <button
                    key={centra.CentralID}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => selectConversionRate(centra)}
                  >
                    {centra.Address}
                  </button>
                ))}
              </div>
            )}
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg w-full p-6 lg:p-10">
              <h3 className="text-xl font-semibold mb-3">Conversion Rate</h3>
              <div className="flex items-center justify-center h-full">
                <div className="relative w-48 h-48">
                  <Doughnut data={chartData} options={gaugeOptions} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center mt-20">
                    <span className="text-4xl font-bold">{selectedConversionRate.conversionRate}%</span>
                    {/* <span className="text-[#A7AD6F] text-lg">^ {selectedConversionRate.rateChange}%</span> */}
                  </div>
                </div>
              </div>
              <div className="flex mt-3 flex-wrap">
                <div className="flex items-center mr-4">
                  <span className="inline-block w-3 h-3 bg-[#176E76] rounded-full mr-2"></span>
                  <span className="text-gray-700">{selectedConversionRate.wetToDry}% Wet to Dry Leaves</span>
                </div>
                <div className="flex items-center mr-4">
                  <span className="inline-block w-3 h-3 bg-[#4D946D] rounded-full mr-2"></span>
                  <span className="text-gray-700">{selectedConversionRate.dryToFloured}% Dry to Floured Leaves</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardContent;


