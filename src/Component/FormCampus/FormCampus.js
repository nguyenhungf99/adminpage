import { useEffect, useState } from "react";
import "./FormCampus.css";
import { useForm } from "react-hook-form";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #fff",
  minWidth: 500,
  boxShadow: 24,
  p: 4,
};

const FormCampus = () => {
  //toastifi setting
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

  const [items, setItems] = useState([]);
  const [item, setItem] = useState(null);
  const [imageSelected, setImageSelected] = useState();

  // form setup
  const {
    register: registerItemEdit,
    handleSubmit: handleSubmitItemEdit,
    setValue: setValueItemEdit,
  } = useForm();
  const {
    register: registerItem,
    handleSubmit: handleSubmitItem,
    resetField: resetFieldItem,
    setValue: setValueItem,
  } = useForm();

  // upload file
  const handleOpenWidget = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "images-devplus-dp03",
        uploadPreset: "e4zymksz",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImageSelected(result.info.url);
          setValueItem("image", result.info.url);
        }
      }
    );
    myWidget.open();
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (index) => {
    if (Number.isInteger(index)) {
      setItem(items.at(index));
      setImageSelected(items.at(index).image);
    }
    setOpen(true);
  };
  const handleClose = () => {
    setItem(null);
    setImageSelected(null);
    setOpen(false);
    resetFieldItem("image");
    resetFieldItem("text");
  };

  const [openMess, setOpenMess] = useState(false);
  const handleOpenMess = (index) => {
    if (Number.isInteger(index)) {
      setItem(items.at(index));
      setOpenMess(true);
    }
  };
  const handleCloseMess = (al) => {
    if (al === "agr") {
      deleteItem();
    }
    setOpenMess(false);
  };

  const addItem = async (submitItem) => {
    console.log(submitItem);
    try {
      const response = await axios.post(
        "https://dev-page-server.herokuapp.com/api/admin/campus/create",
        submitItem
      );
      if (response.data) {
        getAllAbout();
        notify("Add item success!", 1000);
      }
    } catch (error) {
      console.log(error);
    }
    resetFieldItem("image");
    resetFieldItem("text");
    setImageSelected(null);
    setOpen(false);
  };
  const editItem = async (submitItem) => {
    try {
      const response = await axios.put(
        `https://dev-page-server.herokuapp.com/api/admin/campus/edit/${item._id}`,
        submitItem
      );
      if (response.data) {
        getAllAbout();
        notify("update success!", 1000);
      }
    } catch (error) {
      console.log(error);
    }

    setItem(null);
    setImageSelected(null);
    setOpen(false);
  };
  const deleteItem = async () => {
    try {
      const response = await axios.delete(
        `https://dev-page-server.herokuapp.com/api/admin/campus/delete/${item._id}`
      );
      if (response.data) {
        getAllAbout();
        notify("Delete success!", 1000);
      }
    } catch (error) {
      console.log(error);
    }
    setItem(null);
    setOpen(false);
  };

  const getAllAbout = async () => {
    try {
      const response = await axios.get(
        "https://dev-page-server.herokuapp.com/api/admin/campus/infoAll"
      );
      if (response.data) {
        setItems(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAbout();
  }, []);

  useEffect(() => {
    if (item) {
      setValueItemEdit("text", item.text);
    }
  }, [item]);
  useEffect(() => {
    if (imageSelected) {
      setValueItemEdit("image", imageSelected);
    }
  }, [imageSelected]);

  return (
    <div className="campus-form">
      <ToastContainer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="campus-box-modal" sx={style}>
          {item ? (
            <form onSubmit={handleSubmitItemEdit(editItem)}>
              <label>Title</label>
              <input {...registerItemEdit("text")} placeholder="Item title" />
              <label>Image</label>
              <input
                style={{ display: "none" }}
                {...registerItemEdit("image")}
                placeholder="image"
              />
              <div
                className="cp-edit-img"
                style={
                  imageSelected
                    ? { background: `url(${imageSelected}) center/cover` }
                    : { background: `url(${item.image}) center/cover` }
                }
                onClick={() => handleOpenWidget()}
              >
                <TbEdit className="cp-icon-add" />
              </div>
              <input type="submit" value="Edit item" />
            </form>
          ) : (
            <form onSubmit={handleSubmitItem(addItem)}>
              <label>Title</label>
              <input {...registerItem("text")} placeholder="Item title" />
              <label>Image</label>
              <input
                style={{ display: "none" }}
                {...registerItem("image")}
                placeholder="image"
              />
              <div
                className={imageSelected ? "cp-edit-img" : "cp-add-img"}
                style={{ background: `url(${imageSelected}) center/cover` }}
                onClick={() => handleOpenWidget()}
              >
                {imageSelected ? (
                  <TbEdit className="cp-icon-add" />
                ) : (
                  <GoPlus className="cp-icon-add" />
                )}
              </div>
              <input type="submit" value="Add item" />
            </form>
          )}
        </Box>
      </Modal>
      <Dialog
        open={openMess}
        onClose={handleCloseMess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want delet this item?"}
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
      <div className="campus-content">
        <div className={"items-wrap"}>
          <div className="campus-item-content">
            <p className="cp-content-col">Title</p>
            <p className="cp-content-col i">Image</p>
            <div className="cp-content-action" onClick={handleOpen}>
              Add new
            </div>
          </div>
          {Array.isArray(items)
            ? items.map((item, i) => (
                <div className="campus-item" key={i}>
                  <div className={"cp-item-header"}>
                    <div className="cp-item-col">{item.text}</div>
                    <div className="cp-item-col">
                      <div className="cp-backrout-img">
                        <img src={item.image} alt=""></img>
                      </div>
                    </div>
                    <div className="campus-icons">
                      <TbEdit
                        className="campus-icon up"
                        onClick={() => handleOpen(i)}
                      />
                      <MdOutlineDelete
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleOpenMess(i)}
                      />
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
export default FormCampus;
