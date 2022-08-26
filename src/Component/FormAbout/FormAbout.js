import { useEffect, useState } from "react";
import "./FormAbout.css";
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

const FormAbout = () => {
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
  const [data, setData] = useState([]);
  const [item, setItem] = useState(null);
  const [itemIndex, setItemIndex] = useState(null);
  const [selected, setSelected] = useState(null);

  const { register, handleSubmit, setValue } = useForm();

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
      setItem(data.items.at(index));
      setItemIndex(index);
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

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  const onSubmit = (dataSubmit) => {
    let dataTemp = { ...data };
    dataTemp.title = dataSubmit.title;
    dataTemp.content = dataSubmit.content;
    postApi(dataTemp, "Change success!");
  };

  const addItem = (submitItem) => {
    let dataTemp = { ...data };
    dataTemp.items.push(submitItem);
    postApi(dataTemp, "Add item success!");
  };
  const editItem = (submitItem) => {
    let dataTemp = { ...data };
    dataTemp.items[itemIndex] = submitItem;
    postApi(dataTemp, "Edit success!");
  };
  const deleteItem = () => {
    let dataTemp = { ...data };
    dataTemp.items.splice(itemIndex, 1);
    postApi(dataTemp, "Delete success!");
  };

  const postApi = async (submit, alert) => {
    try {
      const response = await axios.post(
        "https://dev-page-server.herokuapp.com/api/admin/about/edit",
        submit
      );
      if (response.data) {
        getAllAbout();
        notify(alert, 1000);
      }
    } catch (error) {
      console.log(error);
    }
    toggle(null);
    setOpen(false);
    setItem(null);
    resetFieldItem("item");
  };

  const getAllAbout = async () => {
    try {
      const response = await axios.get(
        "https://dev-page-server.herokuapp.com/api/admin/about/info/"
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
    if (item) {
      setValueItemEdit("item", item.item);
    }
  }, [item]);
  useEffect(() => {
    if (data != {}) {
      setValue("content", data.content);
      setValue("title", data.title);
    }
  }, [data]);

  return (
    <div className="ab-form">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {item ? (
            <form onSubmit={handleSubmitItemEdit(editItem)}>
              <label>Title</label>
              <input {...registerItemEdit("item")} placeholder="Item name" />
              <input type="submit" value="Edit item" />
            </form>
          ) : (
            <form onSubmit={handleSubmitItem(addItem)}>
              <input {...registerItem("item")} placeholder="Item name" />
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
      <div className="ab-content">
        <div className="ab-title">
          <div className="ab-title-header">
            <div className="ab-title-item">
              Title: <p>{data.title}</p>
              Content: <p>{data.content}</p>
            </div>
            <div className="ab-icons-down">
              <TbEdit className="ab-icon-down" onClick={() => toggle(1)} />
            </div>
          </div>
          <div
            className={
              selected === 1 ? `ab-title-form active` : "ab-title-form"
            }
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Title</label>
              <input {...register("title")} placeholder="Title component" />
              <label>Content</label>
              <textarea {...register("content")} placeholder="Content" />
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>

        <div
          className={selected === 3 ? `ab-items-wrap active` : "ab-items-wrap"}
        >
          <div className="ab-item-content">
            <p className="ab-content-col">Name of item</p>
            <div className="ab-content-action" onClick={handleOpen}>
              Add new
            </div>
          </div>
          {Array.isArray(data.items)
            ? data.items.map((item, i) => (
                <div className="ab-item" key={i}>
                  <div className={"ab-item-header"}>
                    <div className="ab-item-col">{item.item}</div>
                    <div className="ab-icons">
                      <TbEdit
                        className="ab-icon up"
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
export default FormAbout;
