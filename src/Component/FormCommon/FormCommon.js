import { useEffect, useState } from "react";
import "./FormCommon.css";
import { useForm } from "react-hook-form";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
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

const FormCommon = () => {
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
  const [item, setItem] = useState(null);
  const [data, setData] = useState({});
  const [selected, setSelected] = useState(null);

  const { register, handleSubmit, setValue } = useForm({});
  const {
    register: registerItemEdit,
    handleSubmit: handleSubmitItemEdit,
    setValue: setValueItemEdit,
  } = useForm();
  const {
    register: registerItem,
    handleSubmit: handleSubmitItem,
    resetField: resetFieldItem,
  } = useForm();

  const [open, setOpen] = useState(false);
  const handleOpen = (index) => {
    if (Number.isInteger(index)) {
      setItem(data.concerns.at(index));
    }
    setOpen(true);
  };
  const handleClose = () => {
    setItem(null);
    setOpen(false);
  };

  const [openMess, setOpenMess] = useState(false);
  const handleOpenMess = (index) => {
    if (Number.isInteger(index)) {
      setItem(data.concerns.at(index));
      setOpenMess(true);
    }
  };
  const handleCloseMess = (al) => {
    if (al === "agr") {
      deleteItem();
    }
    setOpenMess(false);
  };

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  const onSubmit = (dataSubmit) => {
    let dataTemp = { ...data };
    dataTemp.video = dataSubmit.video;
    dataTemp.title = dataSubmit.title;
    postApi(dataTemp);
  };
  const postApi = async (submit) => {
    try {
      const response = await axios.post(
        "https://dev-page-server.herokuapp.com/api/admin/common/edit",
        submit
      );
      if (response.data) {
        getAllAbout();
        notify("Update succes!", 1000);
      }
    } catch (error) {
      console.log(error);
    }
    toggle();
  };

  const addItem = async (submitItem) => {
    try {
      const response = await axios.put(
        "https://dev-page-server.herokuapp.com/api/admin/common/addConcern/",
        submitItem
      );
      if (response.data) {
        getAllAbout();
        notify("Add item success!", 1000);
      }
    } catch (error) {
      console.log(error);
    }
    resetFieldItem("content");
    resetFieldItem("detail");
    setOpen(false);
  };
  const editItem = async (submitItem) => {
    try {
      const response = await axios.put(
        `https://dev-page-server.herokuapp.com/api/admin/common/editConcern/${item._id}`,
        submitItem
      );
      if (response.data) {
        getAllAbout();
        notify("Edit item succes!", 1000);
      }
    } catch (error) {
      console.log(error);
    }

    setItem(null);
    setOpen(false);
  };
  const deleteItem = async () => {
    try {
      const response = await axios.put(
        `https://dev-page-server.herokuapp.com/api/admin/common/delete/${item._id}`
      );
      if (response.data) {
        getAllAbout();
        notify("Delete succes!", 1000);
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
        "https://dev-page-server.herokuapp.com/api/admin/common/infoAll/"
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
      setValue("title", data.title);
      setValue("video", data.video);
    }
  }, [data]);
  useEffect(() => {
    if (item) {
      setValueItemEdit("content", item.content);
      setValueItemEdit("detail", item.detail);
    }
  }, [item]);

  return (
    <div className="common-form">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {item ? (
            <form onSubmit={handleSubmitItemEdit(editItem)}>
              <label>Content</label>
              <input {...registerItemEdit("content")} placeholder="content" />
              <label>Detail</label>
              <textarea {...registerItemEdit("detail")} placeholder="detail" />
              <input type="submit" value="Edit Item" />
            </form>
          ) : (
            <form onSubmit={handleSubmitItem(addItem)}>
              <input {...registerItem("content")} placeholder="content item" />
              <textarea {...registerItem("detail")} placeholder="detail item" />
              <input type="submit" value="Add Item" />
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
            Do you want delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseMess("dis")}>Disagree</Button>
          <Button onClick={() => handleCloseMess("agr")}>Agree</Button>
        </DialogActions>
      </Dialog>
      <div className="common-content">
        <div className="common-title">
          <div className="common-title-header">
            <div className="common-title-item">
              Title: <p>{data.title}</p>
            </div>
            <div className="common-title-item">
              Video url: <p>{data.video}</p>
            </div>
            <div className="common-icons-down">
              <TbEdit className="common-icon-down" onClick={() => toggle(1)} />
            </div>
          </div>
          <div
            className={
              selected === 1 ? `common-title-form active` : "common-title-form"
            }
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("title")} placeholder="Title component" />
              <input {...register("video")} placeholder="Video component" />
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>

        <div
          className={
            selected === 3 ? `common-items-wrap active` : "common-items-wrap"
          }
        >
          <div className="common-item-content">
            <p className="common-content-col">Content</p>
            <p className="common-content-col">Detail </p>
            <div className="common-content-action" onClick={handleOpen}>
              Add new
            </div>
          </div>
          {Array.isArray(data.concerns)
            ? data.concerns.map((item, i) => (
                <div className="common-item" key={i}>
                  <div className={"common-item-header"}>
                    <div className="common-item-col">{item.content}</div>
                    <div className="common-item-col">{item.detail}</div>
                    <div className="common-icons">
                      <TbEdit
                        className="common-icon up"
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
export default FormCommon;
