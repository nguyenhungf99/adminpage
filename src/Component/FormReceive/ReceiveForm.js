import { useEffect, useState } from "react";
import "./ReceiveForm.css";
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

const ReceiveForm = () => {
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
    resetFieldItem("detail");
    resetFieldItem("title");
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
        "https://dev-page-server.herokuapp.com/api/admin/receive/create",
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
    resetFieldItem("detail");
    resetFieldItem("title");
    setImageSelected(null);
    setOpen(false);
  };
  const editItem = async (submitItem) => {
    try {
      const response = await axios.put(
        `https://dev-page-server.herokuapp.com/api/admin/receive/edit/${item._id}`,
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
        `https://dev-page-server.herokuapp.com/api/admin/receive/delete/${item._id}`
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
        "https://dev-page-server.herokuapp.com/api/admin/receive/infoAll"
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
      setValueItemEdit("title", item.title);
      setValueItemEdit("detail", item.detail);
    }
  }, [item]);
  useEffect(() => {
    if (imageSelected) {
      setValueItemEdit("image", imageSelected);
    }
  }, [imageSelected]);

  return (
    <div className="receive-form">
      <ToastContainer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="receive-box-modal" sx={style}>
          {item ? (
            <form onSubmit={handleSubmitItemEdit(editItem)}>
              <label>Title</label>
              <input {...registerItemEdit("title")} placeholder="Item title" />
              <label>Detail</label>
              <input {...registerItemEdit("detail")} placeholder="Detail" />
              <label>Image</label>
              <input
                style={{ display: "none" }}
                {...registerItemEdit("image")}
                placeholder="image"
              />
              <div
                className="rc-edit-img"
                style={
                  imageSelected
                    ? { background: `url(${imageSelected}) center/cover` }
                    : { background: `url(${item.image}) center/cover` }
                }
                onClick={() => handleOpenWidget()}
              >
                <TbEdit className="rc-icon-add" />
              </div>
              <input type="submit" value="Edit item" />
            </form>
          ) : (
            <form onSubmit={handleSubmitItem(addItem)}>
              <label>Title</label>
              <input {...registerItem("title")} placeholder="Item title" />
              <label>Detail</label>
              <input {...registerItem("detail")} placeholder="Detail" />
              <label>Image</label>
              <input
                style={{ display: "none" }}
                {...registerItem("image")}
                placeholder="image"
              />
              <div
                className={imageSelected ? "rc-edit-img" : "rc-add-img"}
                style={{ background: `url(${imageSelected}) center/cover` }}
                onClick={() => handleOpenWidget()}
              >
                {imageSelected ? (
                  <TbEdit className="rc-icon-add" />
                ) : (
                  <GoPlus className="rc-icon-add" />
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
      <div className="receive-content">
        <div className={"items-wrap"}>
          <div className="receive-item-content">
            <p className="rc-content-col">Title</p>
            <p className="rc-content-col">Detail</p>
            <p className="rc-content-col">Image url</p>
            <div className="rc-content-action" onClick={handleOpen}>
              Add new
            </div>
          </div>
          {Array.isArray(items)
            ? items.map((item, i) => (
                <div className="receive-item" key={i}>
                  <div className={"rc-item-header"}>
                    <div className="rc-item-col">{item.title}</div>
                    <p className="rc-item-col">{item.detail}</p>
                    <p className="rc-item-col">
                      <div className="rc-backrout-img">
                        <img src={item.image} alt=""></img>
                      </div>
                    </p>
                    <div className="receive-icons">
                      <TbEdit
                        className="receive-icon up"
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
export default ReceiveForm;
