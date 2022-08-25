import { useEffect, useState } from "react";
import "./FormBanner.css";
import { useForm } from "react-hook-form";
import { TbEdit } from "react-icons/tb";

const fake_data = {
  title:
    "Devplus Will Support The Early Stage Developers Go The Right Career Path",
  detail:
    "Devplus is not a training center, it’s battle campus for you to level up your skillsets and ready to onboard any projects in our “kindest” companies listing",
  bgImg: "https://devplus.edu.vn/assets/images/devplus/Devplus_missions.png",
};
const FormBanner = () => {
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
    <div className="banner-form">
      <div className="banner-content">
        <div className="banner-title">
          <div className="banner-header">
            <h2 style={{ fontWeight: "500" }}>Text content</h2>
            <TbEdit className="header-icon" onClick={toggle} />
          </div>
          <div
            className={open ? "banner-title-form active" : "banner-title-form"}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Title</label>
              <input {...register("title")} placeholder="Title component" />
              <label>Detail</label>
              <textarea {...register("detail")} placeholder="Title component" />
              <input type="submit" value="submit" />
            </form>
          </div>
          <h3 style={{ fontWeight: "500", margin: "10px 0" }}>Title</h3>
          <div className="banner-title-header">
            <p>{data.title}</p>
          </div>
          <h3 style={{ fontWeight: "500", margin: "10px 0" }}>Detail</h3>
          <div className="banner-title-header">
            <p>{data.detail}</p>
          </div>
          <h2 style={{ fontWeight: "500", margin: "20px 0" }}>
            Background image
          </h2>
          <hr></hr>
          <div className="banner-img-container">
            <div className="banner-img-header">
              <img src={data.bgImg} alt="st"></img>
              <div className="banner-icons-img">
                <TbEdit
                  className="banner-icon-img"
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
export default FormBanner;
