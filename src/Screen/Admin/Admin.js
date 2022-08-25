import { useState } from "react";
import "./Admin.css";
import ReceiveForm from "../../Component/FormReceive/ReceiveForm";
import { RiDashboardLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { MdPreview } from "react-icons/md";
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
import FormSideBar from "../../Component/FormSideBar/Formsidebar";
import FormReview from "../../Component/FormReview/FormReview";

const Admin = () => {
  const [com, setCom] = useState(null);

  const [checked, setChecked] = useState(null);
  const toggleDrop = (i) => {
    if (checked === i) {
      return setChecked(null);
    }
    setChecked(i);
  };

  const [pageActive, setPageActive] = useState(null);
  const toggleActive = (i, comp) => {
    setPageActive(i);
    setCom(comp);
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
              <h3>Dashboard</h3>
            </div>
            {checked ? (
              <IoIosArrowDown className="item-icon" />
            ) : (
              <IoIosArrowForward className="item-icon" />
            )}
          </div>

          <ul
            className={checked === 1 ? `sidebar-title active` : `sidebar-title`}
          >
            <li
              className={
                pageActive === "side_bar" ? "sidebar-row active" : "sidebar-row"
              }
              onClick={() => toggleActive("Sidebar", <FormSideBar />)}
            >
              <BiBarcode className="icon-re"></BiBarcode>
              <h4>SideBar</h4>
            </li>

            <li
              className={
                pageActive === "banner" ? "sidebar-row active" : "sidebar-row"
              }
              onClick={() => toggleActive("banner", <FormBanner />)}
            >
              <BiBookBookmark className="icon-re"></BiBookBookmark>
              <h4>Banner</h4>
            </li>

            <li
              className={
                pageActive === "about" ? "sidebar-row active" : "sidebar-row"
              }
              onClick={() => toggleActive("about", <FormAbout />)}
            >
              <BiChip className="icon-re"></BiChip>
              <h4>About</h4>
            </li>

            <li
              className={
                pageActive === "receive" ? "sidebar-row active" : "sidebar-row"
              }
              onClick={() => toggleActive("receive", <ReceiveForm />)}
            >
              <BiFoodMenu className="icon-re"></BiFoodMenu>
              <h4>Receive</h4>
            </li>

            <li
              className={
                pageActive === "campus" ? "sidebar-row active" : "sidebar-row"
              }
              onClick={() => toggleActive("campus", <FormCampus />)}
            >
              <BiGrid className="icon-re"></BiGrid>
              <h4>CamPus</h4>
            </li>
            <li
              className={
                pageActive === "admin" ? "sidebar-row active" : "sidebar-row"
              }
              onClick={() => toggleActive("admin", <FormAdmission />)}
            >
              <BiDetail className="icon-re"></BiDetail>
              <h4>Admission</h4>
            </li>

            <li
              className={
                pageActive === "common" ? "sidebar-row active" : "sidebar-row"
              }
              onClick={() => toggleActive("common", <FormCommon />)}
            >
              <BiGrid className="icon-re"></BiGrid>
              <h4>Common</h4>
            </li>

            <li
              className={
                pageActive === "review" ? "sidebar-row active" : "sidebar-row"
              }
              onClick={() => toggleActive("review", <FormReview />)}
            >
              <MdPreview className="icon-re"></MdPreview>
              <h4>Review</h4>
            </li>
          </ul>
        </div>
      </div>
      <div className="form-container">{com}</div>
    </div>
  );
};
export default Admin;
