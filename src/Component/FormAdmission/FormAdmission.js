import { useEffect, useState } from "react";
import "./FormAdmission.css";
import { useForm } from "react-hook-form";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import axios from "axios";

const FormAdmission = () => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
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

  const notify = (i, time) =>
    toast.info(i, {
      position: "top-right",
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const toggle = () => {
    setOpen(!open);
  };

  const onSubmit = (dataSubmit) => {
    let dataTemp = { ...data };
    dataTemp.title = dataSubmit.title;
    dataTemp.detail = dataSubmit.detail;
    postApi(dataTemp, "Update text success!");
    toggle();
  };
  const onSubmitBgImg = (url) => {
    let dataTemp = { ...data };
    dataTemp.image = url;
    postApi(dataTemp, "background update!");
  };

  const postApi = async (submit, alert) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/admission/edit",
        submit
      );
      if (response.data) {
        getAllAbout();
        notify(alert, 1000);
      }
    } catch (error) {
      console.log(error);
    }
    toggle(0);
  };

  const getAllAbout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/admission/info/"
      );
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAbout();
  }, []);

  //Set form input when get data
  useEffect(() => {
    if (data !== {}) {
      setValue("title", data.title);
      setValue("detail", data.detail);
    }
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
              <img src={data.image} alt="st"></img>
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
