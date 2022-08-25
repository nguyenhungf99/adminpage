import { useEffect, useState } from "react";
import "./formSidebar.css";
import { useForm } from "react-hook-form";
import { TbEdit } from "react-icons/tb";
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormSideBar = () => {
  const [data, setData] = useState({});
  const [itemIndex, setItemIndex] = useState(null);
  const [selected, setSelected] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  const handleOpenWidget = (index) => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "images-devplus-dp03",
        uploadPreset: "e4zymksz",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          if (Number.isInteger(index)) {
            editItem(result.info.url, index);
          } else if (index === "map") {
            onSubmitMap(result.info.url);
          } else addItem(result.info.url);
        }
      }
    );
    myWidget.open();
  };

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
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

  const [openMess, setOpenMess] = useState(false);
  const handleOpenMess = (index) => {
    if (Number.isInteger(index)) {
      setItemIndex(index);
      setOpenMess(true);
    }
  };
  const handleCloseMess = (al) => {
    if (al === "agr") {
      deleteItem();
    }
    setOpenMess(false);
  };

  const onSubmit = (dataSubmit) => {
    let dataTemp = { ...data };
    dataTemp.text = dataSubmit.text;
    postApi(dataTemp, "Change success!");
  };
  const addItem = (submitItem) => {
    let obj = { url: submitItem };
    let dataTemp = { ...data };
    dataTemp.images.push(obj);
    postApi(dataTemp, "Add item success!");
  };
  const editItem = (submitItem, index) => {
    let obj = { url: submitItem };
    let dataTemp = { ...data };
    dataTemp.images[index] = obj;
    console.log(dataTemp);
    postApi(dataTemp, "Edit success!");
  };
  const deleteItem = () => {
    let dataTemp = { ...data };
    dataTemp.images.splice(itemIndex, 1);
    postApi(dataTemp, "Delete success!");
  };
  const onSubmitMap = (dataSubmit) => {
    let dataTemp = { ...data };
    dataTemp.map = dataSubmit;
    postApi(dataTemp, "Update map image success!");
  };
  const postApi = async (submit, alert) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/sidebar/edit",
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
    setItemIndex(null);
  };

  const getAllAbout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/sidebar/info/"
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
  useEffect(() => {
    if (data !== {}) {
      setValue("text", data.text);
    }
  }, [data]);

  return (
    <div className="fsidebar-form">
      <Dialog
        open={openMess}
        onClose={handleCloseMess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want delete this item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want delet this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseMess("dis")}>Disagree</Button>
          <Button onClick={() => handleCloseMess("agr")}>Agree</Button>
        </DialogActions>
      </Dialog>
      <div className="fsidebar-content">
        <h2 style={{ fontWeight: "500" }}>Text header</h2>
        <div className="fsidebar-title">
          <div className="fsidebar-title-header">
            <div className="fsidebar-title-item">
              <p>{data ? data.text : null}</p>
            </div>
            <div className="fsidebar-icons-down">
              <TbEdit
                className="fsidebar-icon-down"
                onClick={() => toggle(1)}
              />
            </div>
          </div>
          <div
            className={
              selected === 1
                ? `fsidebar-title-form active`
                : "fsidebar-title-form"
            }
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Title</label>
              <input {...register("text")} placeholder="Title component" />
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>
        <h2 style={{ fontWeight: "500" }}>Item images</h2>
        <div className="fsidebar-items-container">
          <div className="fsidebar-items-wrap">
            {Array.isArray(data.images)
              ? data.images.map((item, i) => (
                  <div className="fsidebar-item" key={i}>
                    <div className="fsidebar-item-header">
                      <img src={item.url} alt="st"></img>
                      <div className="fsidebar-icons">
                        <TbEdit
                          className="fsidebar-icon up"
                          onClick={() => handleOpenWidget(i)}
                        />
                        <MdOutlineDelete
                          className="fsidebar-icon det"
                          onClick={() => handleOpenMess(i)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              : null}
            <div
              className="fsidebar-items-add"
              onClick={() => handleOpenWidget(null)}
            >
              <FaPlusCircle className="fsidebar-icon-add"></FaPlusCircle>
            </div>
          </div>
        </div>
        <h2 style={{ fontWeight: "500" }}>Map image</h2>
        <div className="fsidebar-map-container">
          <div className="fsidebar-map-header">
            <img src={data.map} alt="st"></img>
            <div className="fsidebar-icons-map">
              <TbEdit
                className="fsidebar-icon-map"
                onClick={() => handleOpenWidget("map")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormSideBar;
