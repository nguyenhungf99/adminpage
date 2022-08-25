import { useEffect, useState } from "react";
import "./FormAdmission.css";
import { useForm } from "react-hook-form";
import { TbEdit } from "react-icons/tb";

const fake_data = {
  title: "Admission for 2021",
  detail:
    "Disclaimer: This position is expected to start around Feb 2022 and continue through the entire Summer term. We ask for a minimum of 12 weeks, full-time, for most internships. Please consider before submitting an application. Devplus aims to provide students the chance to work with our clients and awesome mentors to level up your programing skillset in the RIGHT path. With your education and experience, you will be able to take on real-world challenges from day one.",
  bgImg: "https://devplus.edu.vn/assets/images/devplus/Admission_for_2021.png",
};
const FormAdmission = () => {
  const [data, setData] = useState(fake_data);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });
  const handleOpenWidget = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "images-devplus-dp03",
        uploadPreset: "e4zymksz",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          onSubmitBgImg(result.info.url);
        }
      }
    );
    myWidget.open();
  };

  const toggle = () => {
    setOpen(!open);
  };

  const onSubmit = (dataSubmit) => {
    let dataTemp = { ...data };
    dataTemp.title = dataSubmit.title;
    dataTemp.detail = dataSubmit.detail;
    setData(dataTemp);
    toggle();
  };
  const onSubmitBgImg = (url) => {
    let dataTemp = { ...data };
    dataTemp.bgImg = url;
    setData(dataTemp);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="adm-form">
      <div className="adm-content">
        <div className="adm-title">
          <div className="adm-header">
            <h2 style={{ fontWeight: "500" }}>Text content</h2>
            <TbEdit className="header-icon" onClick={toggle} />
          </div>
          <div className={open ? "adm-title-form active" : "adm-title-form"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Title</label>
              <input {...register("title")} placeholder="Title component" />
              <label>Detail</label>
              <textarea {...register("detail")} placeholder="Title component" />
              <input type="submit" value="submit" />
            </form>
          </div>
          <h3 style={{ fontWeight: "500", margin: "10px 0" }}>Title</h3>
          <div className="adm-title-header">
            <p>{data.title}</p>
          </div>
          <h3 style={{ fontWeight: "500", margin: "10px 0" }}>Detail</h3>
          <div className="adm-title-header">
            <p>{data.detail}</p>
          </div>
          <h2 style={{ fontWeight: "500", margin: "20px 0" }}>
            Background side image
          </h2>
          <hr></hr>
          <div className="adm-img-container">
            <div className="adm-img-header">
              <img src={data.bgImg} alt="st"></img>
              <div className="adm-icons-img">
                <TbEdit
                  className="adm-icon-img"
                  onClick={() => handleOpenWidget()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormAdmission;
