import { useState } from "react";
import "./Admin.css";
import ReceiveForm from "../../Component/FormReceive/ReceiveForm";
import { RiDashboardLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import {
  BiBarcode,
  BiBookBookmark,
  BiChip,
  BiFoodMenu,
  BiGrid,
  BiDetail,
} from "react-icons/bi";
import FormCommon from "../../Component/FormCommon/FormCommon";
import FormAdmission from "../../Component/FormAdmission/FormAdmission";
import FormCampus from "../../Component/FormCampus/FormCampus";
import FormAbout from "../../Component/FormAbout/FormAbout";
import FormBanner from "../../Component/FormBanner/FormBanner";

const Admin = () => {
  const [com, setCom] = useState(<ReceiveForm />);

  const [checked, setChecked] = useState(null);
  const toggleDrop = (i) => {
    if (checked === i) {
      return setChecked(null);
    }
    setChecked(i);
  };

  return (
    <div className="wrap">
      <div className="side-bar">
        <div className="sidebar-container">
          <div className="container-row">
            <img
              src="https://devplus.asia/assets/images/Artboard_2.png"
              alt="logo"
            />
            <h2>ADMIN</h2>
          </div>
          <div className="title-row">
            <div className="row-botton"></div>
          </div>

          <div className="sidebar-logo">
            <div className="sidebar-icon">
              <RiDashboardLine></RiDashboardLine>
            </div>
            <div className="sidebar-item" onClick={() => toggleDrop(1)}>
              <h3>Dashborad</h3>
            </div>
            <IoIosArrowForward className="item-icon"></IoIosArrowForward>
          </div>

          <ul
            className={checked === 1 ? `sidebar-title active` : `sidebar-title`}
          >
            <li className="sidebar-row">
              <BiBarcode className="icon-re"></BiBarcode>
              <h4 onClick={() => setCom()}>SideBar</h4>
            </li>

            <li className="sidebar-row">
              <BiBookBookmark className="icon-re"></BiBookBookmark>
              <h4 onClick={() => setCom(<FormBanner />)}>Banner</h4>
            </li>

            <li className="sidebar-row">
              <BiChip className="icon-re"></BiChip>
              <h4 onClick={() => setCom(<FormAbout />)}>About</h4>
            </li>

            <li className="sidebar-row">
              <BiFoodMenu className="icon-re"></BiFoodMenu>
              <h4 onClick={() => setCom(<ReceiveForm />)}>Receive</h4>
            </li>

            <li className="sidebar-row">
              <BiGrid className="icon-re"></BiGrid>
              <h4 onClick={() => setCom(<FormCampus />)}>CamPus</h4>
            </li>
            <li className="sidebar-row">
              <BiDetail className="icon-re"></BiDetail>
              <h4 onClick={() => setCom(<FormAdmission />)}>Admission</h4>
            </li>

            <li className="sidebar-row">
              <BiGrid className="icon-re"></BiGrid>
              <h4 onClick={() => setCom(<FormCommon />)}>Common</h4>
            </li>
          </ul>
        </div>
      </div>
      <div className="form-container">{com}</div>
    </div>
  );
};
export default Admin;
