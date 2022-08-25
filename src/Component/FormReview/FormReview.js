import { useEffect, useState } from "react";
import "./FormReview.css";
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
import { toast } from "react-toastify";
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

const FormReview = () => {
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
    resetFieldItem("author");
    resetFieldItem("job");
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
        "http://localhost:8000/api/admin/review/create",
        submitItem
      );
      if (response.data) {
        getAllAbout();
        notify(alert, 1000);
      }
    } catch (error) {
      console.log(error);
    }
    resetFieldItem("image");
    resetFieldItem("author");
    resetFieldItem("job");
    resetFieldItem("title");
    setImageSelected(null);
    setOpen(false);
  };
  const editItem = async (submitItem) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/admin/review/edit/${item._id}`,
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
        `http://localhost:8000/api/admin/review/delete/${item._id}`
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
        "http://localhost:8000/api/admin/review/infoAll"
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
      setValueItemEdit("author", item.author);
      setValueItemEdit("job", item.job);
      setValueItemEdit("title", item.title);
    }
  }, [item]);
  useEffect(() => {
    if (imageSelected) {
      setValueItemEdit("image", imageSelected);
    }
  }, [imageSelected]);

  return (
    <div className="review-form">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="review-box-modal" sx={style}>
          {/* Form input of edit and add item */}
          {item ? (
            <form onSubmit={handleSubmitItemEdit(editItem)}>
              <label>Author</label>
              <input {...registerItemEdit("author")} placeholder="author" />
              <label>Job</label>
              <input {...registerItemEdit("job")} placeholder="job" />
              <label>Title</label>
              <textarea
                {...registerItemEdit("title")}
                placeholder="title here"
              />
              <label>Image</label>
              <input
                style={{ display: "none" }}
                {...registerItemEdit("image")}
                placeholder="image"
              />
              <div
                className="rv-edit-img"
                style={
                  imageSelected
                    ? { background: `url(${imageSelected}) center/cover` }
                    : { background: `url(${item.image}) center/cover` }
                }
                onClick={() => handleOpenWidget()}
              >
                <TbEdit className="rv-icon-add" />
              </div>

              <input type="submit" value="Edit Item" />
            </form>
          ) : (
            <form onSubmit={handleSubmitItem(addItem)}>
              <input {...registerItem("author")} placeholder="author" />
              <input {...registerItem("job")} placeholder="job" />
              <textarea {...registerItem("title")} placeholder="title" />
              <label>Image</label>
              <input
                style={{ display: "none" }}
                {...registerItem("image")}
                placeholder="image"
              />
              <div
                className={imageSelected ? "rv-edit-img" : "rv-add-img"}
                style={{ background: `url(${imageSelected}) center/cover` }}
                onClick={() => handleOpenWidget()}
              >
                {imageSelected ? (
                  <TbEdit className="rv-icon-add" />
                ) : (
                  <GoPlus className="rv-icon-add" />
                )}
              </div>
              <input type="submit" value="Add Item" />
            </form>
          )}
        </Box>
      </Modal>
      {/* Confirm dialog */}
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
      <div className="review-content">
        <div className={"review-items-wrap"}>
          <div className="review-item-content">
            <p className="review-content-col col1">Author </p>
            <p className="review-content-col col2">Image </p>
            <p className="review-content-col col3">Job </p>
            <p className="review-content-col col4">Title </p>
            <div className="review-content-action" onClick={handleOpen}>
              Add new
            </div>
          </div>
          {Array.isArray(items)
            ? items.map((item, i) => (
                <div className="review-item" key={i}>
                  <div className={"review-item-header"}>
                    <div className="review-item-col col1">{item.author}</div>
                    <div className="review-item-col col2">
                      <img src={item.image} alt=""></img>
                    </div>
                    <div className="review-item-col col3">{item.job}</div>
                    <div className="review-item-col col4">{item.title}</div>
                    <div className="review-icons">
                      <TbEdit
                        className="review-icon up"
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
export default FormReview;
