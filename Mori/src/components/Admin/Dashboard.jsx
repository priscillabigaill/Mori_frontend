import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import moriLogo from "../../assets/XYZ/BlackMori.png";
import semicircle from "../../assets/XYZ/semicircle.png";
import ArrowDown from "../../assets/XYZ/arrowdown.png";
import notifIcon from "../../assets/XYZ/notif.png";
import nonotifIcon from "../../assets/XYZ/nonotif.png";
import LeavesStatusCard from "./LeavesStatusCard";
import PersonInChargeBox from "./PersonInChargeBox";
import FlouringScheduleBox from "./FlouringScheduleBox";
import DryingMachineBox from "./DryingMachineBox";
import DryingMachineBoxDashboard from "./DryingMachineBox";
import LeavesStatusDashboard from "./LeavesStatusCard";
import FlouringMachineBoxDashboard from "./FlouringMachineBox";
import FlouringMachineBox from "./FlouringMachineBox";
import AdminShipmentDetails from "./AdminShipmentDetails/AdminShipmentDetails";
import CentraDetails from "./CentraDetails/CentraDetails";
import XyzDetails from "./XYZ/XyzDetails";
import HarbourDetails from "./HarbourGuard/HarbourDetails";
import Invoice from "../XYZ/Laptop/Invoice";
import DashboardContent from "./DashboardContent";
import Users from "./Users";


const MainXYZ = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Editable user state
  const initialUserState = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "123123123",
    gender: "Male",
    birthdate: { day: "08", month: "December", year: "2004" },
    role: "XYZ Admin",
    location: "Bekasi",
  };

  const [userState, setUserState] = useState(initialUserState);
  const [tempUserState, setTempUserState] = useState(initialUserState);

  const user = {
    ...userState,
    loginDate: new Date(),
    hasNotification: true,
  };

  const formattedDate = user.loginDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="flex">
      <div className="fixed flex flex-col w-64 h-screen bg-white border-r-2">
        <div className="flex items-center justify-center mt-10 mr-24">
          <img src={moriLogo} alt="Mori Logo" className="h-10" />
        </div>
        <nav className="mt-10 ">
          <div className="px-6 mb-1">
            <h2 className="text-sm font-semibold text-gray-700 ml-[-0.1rem]">
              MAIN
            </h2>
          </div>
          <ul>
            {[
              {
                name: "Dashboard",
                icon: "M14.4691 3.62567C13.0181 2.48359 11.3067 1.70394 9.52121 1.74042C7.66861 1.77828 5.94565 2.69211 4.58463 4.51396C2.29282 7.58178 1.11666 12.4088 3.80837 17.0417L4.01635 17.3997C4.06218 17.4786 4.13533 17.5361 4.22145 17.5611L4.6122 17.6744C9.68784 19.1462 14.0799 16.4896 16.1977 13.6547C17.5269 11.8755 17.9253 9.93451 17.4995 8.09473C17.0866 6.31039 15.9386 4.7824 14.4691 3.62567ZM6.80744 6.26357C7.68867 5.08396 8.61835 4.68117 9.50609 4.66303C10.4609 4.64352 11.5776 5.0685 12.7197 5.96743C13.8431 6.85173 14.5222 7.8683 14.7475 8.84183C14.96 9.75992 14.8078 10.7901 13.9749 11.9051C12.7672 13.5217 10.5565 15.0425 7.90309 15.1593C7.61363 15.172 7.46442 14.8343 7.64346 14.5946L11.609 9.28637C11.7322 9.12137 11.7052 8.88768 11.5486 8.76441L10.3375 7.81114C10.1809 7.68786 9.95397 7.72169 9.83071 7.88668L5.88037 13.1746C5.7018 13.4136 5.3461 13.3545 5.28135 13.0655C4.70108 10.4756 5.50012 8.01354 6.80744 6.26357Z",
              },
              {
                name: "Centra Details",
                icon: "M9.48438 10.7236C8.89583 10.7236 8.35938 10.5804 7.875 10.2939C7.39583 10.0023 7.01042 9.61686 6.71875 9.1377C6.43229 8.65332 6.28906 8.11686 6.28906 7.52832C6.28906 6.93978 6.43229 6.40332 6.71875 5.91895C7.01042 5.43457 7.39583 5.04915 7.875 4.7627C8.35938 4.47103 8.89583 4.3252 9.48438 4.3252C10.0729 4.3252 10.6068 4.47103 11.0859 4.7627C11.5703 5.04915 11.9557 5.43457 12.2422 5.91895C12.5339 6.40332 12.6797 6.93978 12.6797 7.52832C12.6797 8.11686 12.5339 8.65332 12.2422 9.1377C11.9557 9.61686 11.5703 10.0023 11.0859 10.2939C10.6068 10.5804 10.0729 10.7236 9.48438 10.7236ZM9.48438 9.92676C9.9375 9.92676 10.3411 9.82259 10.6953 9.61426C11.0547 9.40072 11.3385 9.11426 11.5469 8.75488C11.7604 8.3903 11.8672 7.98145 11.8672 7.52832C11.8672 7.0752 11.7604 6.66895 11.5469 6.30957C11.3333 5.94499 11.0469 5.65592 10.6875 5.44238C10.3333 5.22884 9.93229 5.12207 9.48438 5.12207C9.03646 5.12207 8.63281 5.22884 8.27344 5.44238C7.91927 5.65592 7.63802 5.94499 7.42969 6.30957C7.22135 6.66895 7.11719 7.0752 7.11719 7.52832C7.11719 7.98145 7.22135 8.3903 7.42969 8.75488C7.63802 9.11426 7.91927 9.40072 8.27344 9.61426C8.63281 9.82259 9.03646 9.92676 9.48438 9.92676ZM9.48438 3.52051C9.59375 3.52051 9.68229 3.55697 9.75 3.62988C9.81771 3.7028 9.85156 3.79134 9.85156 3.89551V5.7627C9.85156 5.86686 9.8151 5.9554 9.74219 6.02832C9.67448 6.10124 9.58854 6.1377 9.48438 6.1377C9.38021 6.1377 9.29167 6.10384 9.21875 6.03613C9.15104 5.96322 9.11719 5.87207 9.11719 5.7627V3.89551C9.11719 3.79134 9.15104 3.7028 9.21875 3.62988C9.29167 3.55697 9.38021 3.52051 9.48438 3.52051ZM11.2422 7.89551C11.138 7.89551 11.0495 7.85905 10.9766 7.78613C10.9089 7.71322 10.875 7.62728 10.875 7.52832C10.875 7.41895 10.9089 7.3304 10.9766 7.2627C11.0495 7.19499 11.138 7.16113 11.2422 7.16113H13.1172C13.2161 7.16113 13.3021 7.19759 13.375 7.27051C13.4479 7.33822 13.4844 7.42415 13.4844 7.52832C13.4844 7.62728 13.4479 7.71322 13.375 7.78613C13.3021 7.85905 13.2161 7.89551 13.1172 7.89551H11.2422ZM9.48438 11.5205C9.38542 11.5205 9.29948 11.4867 9.22656 11.4189C9.15365 11.346 9.11719 11.2549 9.11719 11.1455V9.27832C9.11719 9.17415 9.15365 9.08822 9.22656 9.02051C9.29948 8.94759 9.38542 8.91113 9.48438 8.91113C9.59375 8.91113 9.68229 8.94759 9.75 9.02051C9.81771 9.09342 9.85156 9.17936 9.85156 9.27832V11.1455C9.85156 11.2549 9.8151 11.346 9.74219 11.4189C9.67448 11.4867 9.58854 11.5205 9.48438 11.5205ZM5.85938 7.89551C5.75 7.89551 5.66146 7.85905 5.59375 7.78613C5.52604 7.71322 5.49219 7.62728 5.49219 7.52832C5.49219 7.42415 5.52865 7.33822 5.60156 7.27051C5.67448 7.19759 5.76042 7.16113 5.85938 7.16113H7.73438C7.83333 7.16113 7.91927 7.19499 7.99219 7.2627C8.0651 7.3304 8.10156 7.41895 8.10156 7.52832C8.10156 7.62728 8.0651 7.71322 7.99219 7.78613C7.91927 7.85905 7.83333 7.89551 7.73438 7.89551H5.85938ZM9.49219 8.08301C9.33594 8.08301 9.20312 8.02832 9.09375 7.91895C8.98438 7.80957 8.92969 7.67676 8.92969 7.52051C8.92969 7.36947 8.98438 7.23926 9.09375 7.12988C9.20312 7.02051 9.33594 6.96582 9.49219 6.96582C9.64323 6.96582 9.77083 7.02051 9.875 7.12988C9.98438 7.23926 10.0391 7.36947 10.0391 7.52051C10.0391 7.67676 9.98438 7.80957 9.875 7.91895C9.77083 8.02832 9.64323 8.08301 9.49219 8.08301ZM1.95312 14.1924C1.34375 14.1924 0.864583 14.0205 0.515625 13.6768C0.171875 13.3278 0 12.846 0 12.2314V2.8252C0 2.21061 0.171875 1.73145 0.515625 1.3877C0.864583 1.04395 1.34375 0.87207 1.95312 0.87207H17.0156C17.625 0.87207 18.1016 1.04395 18.4453 1.3877C18.7943 1.73145 18.9688 2.21061 18.9688 2.8252V12.2314C18.9688 12.846 18.7943 13.3278 18.4453 13.6768C18.1016 14.0205 17.625 14.1924 17.0156 14.1924H1.95312ZM2.03906 12.6924H16.9297C17.0911 12.6924 17.2214 12.6429 17.3203 12.5439C17.4193 12.445 17.4688 12.3148 17.4688 12.1533V2.91895C17.4688 2.74707 17.4193 2.61426 17.3203 2.52051C17.2214 2.42155 17.0911 2.37207 16.9297 2.37207H2.03906C1.8776 2.37207 1.7474 2.42155 1.64844 2.52051C1.54948 2.61426 1.5 2.74707 1.5 2.91895V12.1533C1.5 12.3148 1.54948 12.445 1.64844 12.5439C1.7474 12.6429 1.8776 12.6924 2.03906 12.6924ZM6.9375 15.9736V14.0283H12.0312V15.9736H6.9375ZM6.89844 17.0205C6.70052 17.0205 6.53125 16.9502 6.39062 16.8096C6.25521 16.6689 6.1875 16.5023 6.1875 16.3096C6.1875 16.1117 6.25521 15.9424 6.39062 15.8018C6.53125 15.6663 6.70052 15.5986 6.89844 15.5986H12.0703C12.2682 15.5986 12.4349 15.6663 12.5703 15.8018C12.7057 15.9424 12.7734 16.1117 12.7734 16.3096C12.7734 16.5023 12.7057 16.6689 12.5703 16.8096C12.4349 16.9502 12.2682 17.0205 12.0703 17.0205H6.89844Z",
              },
              {
                name: "Shipment Details",
                icon: "M12.8777 11.5066C12.658 11.7491 12.4908 12.0321 12.3764 12.3555C12.2619 12.6742 12.2047 13.0167 12.2047 13.3829C12.2047 13.4828 12.2115 13.5827 12.2253 13.6825H7.85028C7.86401 13.5874 7.87088 13.4899 7.87088 13.39C7.87088 12.9905 7.79762 12.6171 7.6511 12.2699C7.50916 11.918 7.30998 11.6112 7.05357 11.3496C6.80174 11.0832 6.50641 10.8763 6.16758 10.7289C5.83333 10.5767 5.47619 10.5006 5.09615 10.5006C4.71154 10.5006 4.34982 10.5767 4.01099 10.7289C3.67674 10.8763 3.38141 11.0832 3.125 11.3496C2.87317 11.6112 2.67399 11.918 2.52747 12.2699C2.38553 12.6171 2.31456 12.9905 2.31456 13.39C2.31456 13.4899 2.32143 13.5874 2.33516 13.6825H1.86813C1.46062 13.6825 1.11722 13.6088 0.837912 13.4614C0.563187 13.3187 0.354853 13.1047 0.212912 12.8193C0.0709707 12.5291 0 12.1724 0 11.7491V2.3888C0 1.75146 0.157967 1.2687 0.473901 0.940515C0.789835 0.612333 1.25458 0.448242 1.86813 0.448242H11.0096C11.6232 0.448242 12.0879 0.614711 12.4038 0.94765C12.7198 1.27583 12.8777 1.75621 12.8777 2.3888V11.5066ZM13.8187 4.38643H15.6456C15.9844 4.38643 16.2729 4.43399 16.511 4.52911C16.7491 4.62424 16.9712 4.78833 17.1772 5.02139L19.5124 7.76099C19.7047 7.98454 19.8329 8.19857 19.897 8.40309C19.9657 8.60285 20 8.87872 20 9.23068V11.7491C20 12.3769 19.8443 12.855 19.533 13.1831C19.2216 13.5161 18.7637 13.6825 18.1593 13.6825H17.7404C17.7541 13.5827 17.761 13.4828 17.761 13.3829C17.761 12.9834 17.6854 12.61 17.5343 12.2628C17.3878 11.9108 17.1841 11.6041 16.9231 11.3425C16.6667 11.0761 16.369 10.8692 16.0302 10.7218C15.696 10.5696 15.3365 10.4935 14.9519 10.4935C14.7459 10.4935 14.5467 10.522 14.3544 10.5791C14.1621 10.6314 13.9835 10.7051 13.8187 10.8002V4.38643ZM15.5975 8.93817H18.6745C18.6607 8.85731 18.6355 8.78121 18.5989 8.70987C18.5623 8.63853 18.5165 8.57194 18.4615 8.51011L16.3668 6.07014C16.234 5.91319 16.1081 5.81331 15.989 5.7705C15.87 5.72769 15.7326 5.70629 15.5769 5.70629H14.9725V8.28894C14.9725 8.4887 15.0275 8.64804 15.1374 8.76694C15.2518 8.88109 15.4052 8.93817 15.5975 8.93817ZM5.09615 15.4447C4.72985 15.4447 4.3956 15.352 4.09341 15.1665C3.79579 14.981 3.55769 14.7313 3.37912 14.4174C3.20513 14.1082 3.11813 13.7658 3.11813 13.39C3.11813 13.0095 3.20513 12.6647 3.37912 12.3555C3.55769 12.0416 3.79579 11.7943 4.09341 11.6136C4.3956 11.4281 4.72985 11.3353 5.09615 11.3353C5.45788 11.3353 5.78755 11.4281 6.08517 11.6136C6.38736 11.7943 6.62775 12.0416 6.80632 12.3555C6.98489 12.6647 7.07418 13.0095 7.07418 13.39C7.07418 13.7658 6.98489 14.1082 6.80632 14.4174C6.62775 14.7313 6.38965 14.981 6.09203 15.1665C5.79441 15.352 5.46245 15.4447 5.09615 15.4447ZM14.9794 15.4447C14.6177 15.4447 14.2857 15.352 13.9835 15.1665C13.6859 14.981 13.4478 14.7313 13.2692 14.4174C13.0907 14.1035 13.0014 13.7586 13.0014 13.3829C13.0014 13.0024 13.0907 12.6576 13.2692 12.3484C13.4478 12.0345 13.6859 11.7872 13.9835 11.6064C14.2857 11.4209 14.6177 11.3282 14.9794 11.3282C15.3457 11.3282 15.6777 11.4209 15.9753 11.6064C16.2729 11.7872 16.511 12.0345 16.6896 12.3484C16.8681 12.6576 16.9574 13.0024 16.9574 13.3829C16.9574 13.7634 16.8681 14.1082 16.6896 14.4174C16.5156 14.7313 16.2775 14.981 15.9753 15.1665C15.6777 15.352 15.3457 15.4447 14.9794 15.4447Z",
              },
              {
                name: "Harbor Guard",
                icon: "M8.00641 16.9359V9.35085L14.9409 5.3883C14.9803 5.53616 15 5.72344 15 5.95016V11.7092C15 12.2464 14.9088 12.6431 14.7265 12.8994C14.549 13.1507 14.2878 13.375 13.9428 13.5721L8.15426 16.8693C8.12962 16.8841 8.10498 16.8964 8.08033 16.9063C8.05569 16.9211 8.03105 16.9309 8.00641 16.9359ZM6.99359 16.9359C6.96895 16.9309 6.94431 16.9211 6.91966 16.9063C6.89995 16.8964 6.87777 16.8841 6.85313 16.8693L1.05717 13.5721C0.717102 13.375 0.45589 13.1507 0.273534 12.8994C0.0911779 12.6431 0 12.2464 0 11.7092V5.95016C0 5.72344 0.0197141 5.53616 0.0591424 5.3883L6.99359 9.35085V16.9359ZM7.5037 8.46371L0.532282 4.50856C0.64071 4.40999 0.778709 4.31388 0.946279 4.22024L3.65944 2.67514L10.6604 6.67465L7.5037 8.46371ZM11.688 6.09062L4.65747 2.09851L6.15821 1.24833C6.61656 0.982192 7.06506 0.849121 7.5037 0.849121C7.93741 0.849121 8.38344 0.982192 8.84179 1.24833L14.0611 4.22024C14.2238 4.31388 14.3593 4.40999 14.4677 4.50856L11.688 6.09062Z",
              },
              {
                name: "XYZ",
                icon: "M11.1034 15.4788V10.6197C11.1034 10.445 11.051 10.3052 10.9462 10.2004C10.8414 10.0956 10.7016 10.0432 10.5269 10.0432H7.75667C7.58197 10.0432 7.43971 10.0956 7.3299 10.2004C7.22508 10.3052 7.17267 10.445 7.17267 10.6197V15.4788H11.1034ZM2.42583 15.2242V9.51905L8.68507 4.27058C8.98955 4.01102 9.29652 4.01102 9.60599 4.27058L15.8652 9.51905V15.2242C15.8652 15.7633 15.7055 16.1851 15.3861 16.4896C15.0666 16.7941 14.6323 16.9463 14.0833 16.9463H4.20777C3.65372 16.9463 3.21697 16.7941 2.89752 16.4896C2.58306 16.1851 2.42583 15.7633 2.42583 15.2242ZM0 8.49332C0 8.26371 0.0973327 8.06655 0.291998 7.90183L8.09359 1.35059C8.41803 1.08106 8.76993 0.946289 9.14927 0.946289C9.52862 0.946289 9.87802 1.08106 10.1975 1.35059L17.9916 7.90183C18.1862 8.06156 18.2836 8.26621 18.2836 8.51578C18.2836 8.73041 18.2087 8.90012 18.059 9.0249C17.9142 9.14969 17.7345 9.21208 17.5199 9.21208C17.4051 9.21208 17.2953 9.18463 17.1905 9.12972C17.0856 9.07482 16.9883 9.01243 16.8985 8.94255L9.47122 2.70576C9.3664 2.61592 9.25909 2.571 9.14927 2.571C9.03946 2.571 8.93215 2.61592 8.82733 2.70576L1.39261 8.94255C1.29777 9.01243 1.19794 9.07482 1.09312 9.12972C0.993293 9.18463 0.885977 9.21208 0.771175 9.21208C0.531586 9.21208 0.341912 9.1422 0.202153 9.00244C0.0673842 8.85769 0 8.68798 0 8.49332ZM13.7688 4.86206V3.02771C13.7688 2.86299 13.8187 2.73072 13.9186 2.63089C14.0234 2.52607 14.1582 2.47366 14.3229 2.47366H15.3336C15.5034 2.47366 15.6381 2.52607 15.738 2.63089C15.8378 2.73072 15.8877 2.86299 15.8877 3.02771V6.644L13.7688 4.86206Z",
              },
              {
                name: "Users",
                icon: "M1.59763 16.9702C1.10059 16.9702 0.710059 16.8578 0.426036 16.6329C0.142012 16.4081 0 16.1004 0 15.7098C0 15.1359 0.171598 14.5353 0.514793 13.9081C0.863905 13.2808 1.36391 12.6921 2.01479 12.1418C2.6716 11.5915 3.46154 11.1447 4.38462 10.8016C5.30769 10.4584 6.3432 10.2868 7.49112 10.2868C8.64497 10.2868 9.68343 10.4584 10.6065 10.8016C11.5296 11.1447 12.3166 11.5915 12.9675 12.1418C13.6243 12.6921 14.1272 13.2808 14.4763 13.9081C14.8254 14.5353 15 15.1359 15 15.7098C15 16.1004 14.858 16.4081 14.574 16.6329C14.2899 16.8578 13.8994 16.9702 13.4024 16.9702H1.59763ZM7.5 8.70688C6.85503 8.70688 6.26035 8.53232 5.71598 8.18321C5.17752 7.8341 4.7426 7.36368 4.41124 6.77196C4.0858 6.18025 3.92308 5.51753 3.92308 4.7838C3.92308 4.06191 4.0858 3.41102 4.41124 2.83114C4.7426 2.24534 5.18047 1.78084 5.72485 1.43764C6.26923 1.09445 6.86095 0.922852 7.5 0.922852C8.14497 0.922852 8.73965 1.09149 9.28402 1.42877C9.8284 1.76605 10.2633 2.22759 10.5888 2.81338C10.9201 3.39327 11.0858 4.04415 11.0858 4.76605C11.0858 5.50569 10.9201 6.17433 10.5888 6.77196C10.2633 7.36368 9.8284 7.8341 9.28402 8.18321C8.73965 8.53232 8.14497 8.70688 7.5 8.70688Z",
              },
            ].map((item) => (
              <li
                key={item.name}
                className="relative flex items-center rounded-md hover:bg-gray-200 p-2"
              >
                <div
                  className={`flex items-center cursor-pointer ${
                    activePage === item.name
                      ? "bg-white-100 font-bold"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => setActivePage(item.name)}
                >
                  {activePage === item.name && (
                    <img
                      src={semicircle}
                      alt="Semicircle"
                      className="mr-2 h-5"
                    />
                  )}
                  <svg
                    width="16"
                    height="18"
                    viewBox="0 0 16 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={
                      activePage === item.name
                        ? "fill-current text-[#A7AD6F] ml-3"
                        : "fill-current text-[#A9A9A9] ml-5 mt-1"
                    }
                  >
                    <path d={item.icon} />
                  </svg>
                  <span className="ml-2">{item.name}</span>
                  {activePage === item.name && (
                    <div className="absolute left-0 top-0 bottom-0 w-2" />
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="px-6 mt-10 mb-1">
            <h2 className="text-sm font-semibold text-gray-700 ml-[-0.1rem]">
              SUPPORT
            </h2>
          </div>
          <ul>
            {[
              {
                name: "Settings",
                icon: "M6.83971 15.3926C6.65311 15.3926 6.49522 15.3399 6.36603 15.2347C6.23684 15.1342 6.15072 14.9907 6.10766 14.8041L5.73445 13.2251C5.59569 13.1773 5.45933 13.127 5.32536 13.0744C5.19139 13.0218 5.06459 12.9667 4.94498 12.9093L3.56699 13.7562C3.40909 13.8519 3.24641 13.8926 3.07895 13.8782C2.91627 13.8639 2.77033 13.7921 2.64115 13.6629L1.72249 12.7443C1.5933 12.6151 1.51914 12.4643 1.5 12.2921C1.48565 12.1199 1.5311 11.9572 1.63636 11.8041L2.47608 10.4332C2.41866 10.3088 2.36364 10.1821 2.311 10.0529C2.25837 9.92368 2.21292 9.79449 2.17464 9.66531L0.58134 9.28492C0.394737 9.24664 0.251196 9.16291 0.150718 9.03373C0.0502392 8.90454 0 8.74664 0 8.56004V7.261C0 7.07918 0.0502392 6.92368 0.150718 6.79449C0.251196 6.66531 0.394737 6.58157 0.58134 6.5433L2.16029 6.16291C2.20335 6.01459 2.2512 5.87583 2.30383 5.74665C2.36124 5.61746 2.41388 5.49545 2.46172 5.38062L1.62201 3.98827C1.51675 3.83516 1.47129 3.67727 1.48565 3.51459C1.5 3.34712 1.57416 3.1988 1.70813 3.06961L2.64115 2.14377C2.77512 2.01937 2.91866 1.9476 3.07177 1.92846C3.22967 1.90932 3.38756 1.94521 3.54545 2.03612L4.9378 2.89736C5.05742 2.83516 5.18421 2.77775 5.31818 2.72511C5.45694 2.6677 5.59569 2.61507 5.73445 2.56722L6.10766 0.981095C6.15072 0.799277 6.23684 0.655736 6.36603 0.550473C6.49522 0.44521 6.65311 0.392578 6.83971 0.392578H8.16029C8.34689 0.392578 8.50478 0.44521 8.63397 0.550473C8.76316 0.655736 8.84689 0.799277 8.88517 0.981095L9.25837 2.58157C9.4067 2.62942 9.54545 2.67966 9.67464 2.73229C9.80861 2.78492 9.93301 2.84234 10.0478 2.90454L11.4545 2.03612C11.6124 1.94521 11.7679 1.91172 11.9211 1.93564C12.0742 1.95478 12.2177 2.02416 12.3517 2.14377L13.2919 3.06961C13.4258 3.1988 13.4976 3.34712 13.5072 3.51459C13.5215 3.67727 13.4785 3.83516 13.378 3.98827L12.5311 5.38062C12.5789 5.49545 12.6292 5.61746 12.6818 5.74665C12.7392 5.87583 12.7919 6.01459 12.8397 6.16291L14.4187 6.5433C14.6005 6.58157 14.7416 6.66531 14.8421 6.79449C14.9474 6.92368 15 7.07918 15 7.261V8.56004C15 8.74664 14.9474 8.90454 14.8421 9.03373C14.7416 9.16291 14.6005 9.24664 14.4187 9.28492L12.8254 9.66531C12.7823 9.79449 12.7345 9.92368 12.6818 10.0529C12.634 10.1821 12.5789 10.3088 12.5167 10.4332L13.3636 11.8041C13.4689 11.9572 13.512 12.1199 13.4928 12.2921C13.4785 12.4643 13.4067 12.6151 13.2775 12.7443L12.3517 13.6629C12.2225 13.7921 12.0742 13.8639 11.9067 13.8782C11.744 13.8926 11.5861 13.8519 11.433 13.7562L10.0478 12.9093C9.92823 12.9667 9.80144 13.0218 9.66746 13.0744C9.53349 13.127 9.39713 13.1773 9.25837 13.2251L8.88517 14.8041C8.84689 14.9907 8.76316 15.1342 8.63397 15.2347C8.50478 15.3399 8.34689 15.3926 8.16029 15.3926H6.83971ZM7.5 10.4261C7.96412 10.4261 8.38756 10.3112 8.77034 10.0816C9.1579 9.85191 9.46412 9.54569 9.689 9.16291C9.91866 8.77535 10.0335 8.34952 10.0335 7.8854C10.0335 7.42129 9.91866 7.00023 9.689 6.62224C9.46412 6.23947 9.1579 5.93325 8.77034 5.70358C8.38756 5.47392 7.96412 5.35909 7.5 5.35909C7.03589 5.35909 6.61244 5.47392 6.22967 5.70358C5.84689 5.93325 5.54067 6.23947 5.31101 6.62224C5.08134 7.00023 4.96651 7.42129 4.96651 7.8854C4.96651 8.34952 5.07895 8.77535 5.30383 9.16291C5.53349 9.54569 5.83971 9.85191 6.22249 10.0816C6.61005 10.3112 7.03589 10.4261 7.5 10.4261Z",
              },
            ].map((item) => (
              <li
                key={item.name}
                className="relative flex items-center rounded-md hover:bg-gray-200 p-2"
              >
                <div
                  className={`flex items-center cursor-pointer ${
                    activePage === item.name
                      ? "bg-white-100 font-bold"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => setActivePage(item.name)}
                >
                  {activePage === item.name && (
                    <img
                      src={semicircle}
                      alt="Semicircle"
                      className="mr-2 h-5"
                    />
                  )}
                  <svg
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={
                      activePage === item.name
                        ? "fill-current text-[#A7AD6F] ml-3"
                        : "fill-current text-[#A9A9A9] ml-5"
                    }
                  >
                    <path d={item.icon} />
                  </svg>
                  <span className="ml-2">{item.name}</span>
                  {activePage === item.name && (
                    <div className="absolute left-0 top-0 bottom-0 w-2" />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex-1 ml-64">
        <header className="flex items-center justify-between p-7 border-b-2 bg-white fixed top-0 left-64 right-0 z-10">
          <div>
            <h1 className="text-2xl font-bold ml-3">
              Welcome back, {user.name}
            </h1>
            <p className="text-sm text-gray-500 ml-3">{formattedDate}</p>
          </div>
          <div className="relative flex items-center">
            <button className="relative">
              <img
                src={user.hasNotification ? notifIcon : nonotifIcon}
                alt="Notification Icon"
                className="w-6 h-6 text-gray-600 mr-4"
              />
              {user.hasNotification && <span className=""></span>}
            </button>
            <div className="mx-2 h-5 border-l border-gray-400"></div>
            <div className="ml-4 flex items-center">
              <span className="font-bold text-gray-600 mr-2">{user.name}</span>
              <button className="ml-2 mr-12" onClick={toggleDropdown}>
                <img src={ArrowDown} alt="Arrow Down" className="w-4" />
              </button>
            </div>
            {isDropdownVisible && (
              <div className="absolute right-0 top-12 mt-4 w-96 h-48 bg-white border border-gray-300 shadow-md z-50">
                <div className="p-4 mt-3">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-red-500"></div>
                    <div className="ml-4">
                      <h2 className="text-xl font-bold text-[#852222]">
                        {user.name}
                      </h2>
                      <p className="text-lg text-gray-600">{user.email}</p>
                      <p className="text-lg text-gray-600">{user.phone}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between w-full">
                    <button className="w-1/2 px-4 py-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg">
                      EDIT PROFILE
                    </button>
                    <button className="w-1/2 px-4 py-2 ml-2 text-sm font-semibold text-white bg-[#852222] rounded-lg">
                      LOGOUT
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>
        <main className="max-w-[4096px] mt-32 px-12">
          {activePage === "Dashboard" && <DashboardContent/>}

          {/* Centra Details Page */}
          {activePage === "Centra Details" && <CentraDetails />}
          {/* (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-black text-[28px] font-extrabold font-['Be Vietnam Pro'] mb-4">
                  Centra Semang, Kupang
                </h1>
              </div>

              <div>
                <LeavesStatusDashboard />
              </div>

              <div className="mt-6 flex gap-6">
                <div className="flex-grow flex flex-col gap-6">
                  <div className="flex gap-6">
                    <PersonInChargeBox
                      name="John Doe"
                      email="john.doe@example.com"
                    />
                    <FlouringScheduleBox every={3} nearest={"2"} />
                  </div>
                </div>
              </div>

              <div className="mt-4 text-black text-[28px] font-extrabold font-['Be Vietnam Pro'] mb-4">
                Drying Machine
              </div>

              <div className="mt-6 flex gap-6">
                <DryingMachineBoxDashboard />
              </div>

              <div className="mt-4 text-black text-[28px] font-extrabold font-['Be Vietnam Pro'] mb-4">
                Flouring Machine
              </div>

              <div className="mt-6 flex gap-6">
                <FlouringMachineBoxDashboard />
              </div>
            </div>
          ) */}
          

          {/* Shipping Information Page */}
          {activePage === "Shipment Details" && <AdminShipmentDetails />}

          {activePage === "Harbor Guard" && <HarbourDetails />}
          {activePage === "XYZ" && <XyzDetails />}
          {activePage === "Users" && <Users />}
          {activePage === "Settings" && <div>Settings Content</div>}
        </main>
      </div>
    </div>
  );
};

export default MainXYZ;
