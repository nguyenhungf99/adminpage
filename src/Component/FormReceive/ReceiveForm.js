import { useEffect, useState } from "react";
import "./ReceiveForm.css";
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
const fake_title = { title: "What an engineer after Devplus will must have?" };

const ReceiveForm = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(null);
  const [title, setTitle] = useState(fake_title);
  const [selected, setSelected] = useState(null);

  const { register, handleSubmit } = useForm({
    defaultValues: title,
  });
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
      setItem(items.at(index));
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

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  const onSubmit = (dataSubmit) => {
    setTitle(dataSubmit);
  };

  const addItem = async (submitItem) => {
    try {
      const response = await axios.post(
        "https://api-devplus.herokuapp.com/api/receive",
        submitItem
      );
      if (response.data) {
        getAllReceive();
      }
    } catch (error) {
      console.log(error);
    }
    resetFieldItem("img");
    resetFieldItem("detail");
    resetFieldItem("title");
    setOpen(false);
  };
  const editItem = async (submitItem) => {
    try {
      const response = await axios.put(
        `https://api-devplus.herokuapp.com/api/receive/${item.id}`,
        submitItem
      );
      if (response.data) {
        getAllReceive();
      }
    } catch (error) {
      console.log(error);
    }

    setItem(null);
    setOpen(false);
  };
  const deleteItem = async () => {
    try {
      const response = await axios.delete(
        `https://api-devplus.herokuapp.com/api/receive/${item.id}`
      );
      if (response.data) {
        getAllReceive();
      }
    } catch (error) {
      console.log(error);
    }

    setItem(null);
    setOpen(false);
  };
  const getAllReceive = async () => {
    console.log("re");
    try {
      const response = await axios.get(
        "https://api-devplus.herokuapp.com/api/receive"
      );
      if (response.data) {
        setItems(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllReceive();
  }, []);
  useEffect(() => {
    if (item) {
      setValueItemEdit("img", item.img);
      setValueItemEdit("detail", item.detail);
      setValueItemEdit("title", item.title);
      console.log(`https://api-devplus.herokuapp.com/api/receive/${item.id}`);
    }
  }, [item]);

  return (
    <div className="receive-form">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {item ? (
            <form onSubmit={handleSubmitItemEdit(editItem)}>
              <label>Image url</label>
              <input {...registerItemEdit("img")} placeholder="Image url" />
              <label>Title</label>
              <input {...registerItemEdit("title")} placeholder="Item title" />
              <label>Detail</label>
              <input {...registerItemEdit("detail")} placeholder="Detail" />
              <input type="submit" value="Edit item" />
            </form>
          ) : (
            <form onSubmit={handleSubmitItem(addItem)}>
              <input {...registerItem("img")} placeholder="Image url" />
              <input {...registerItem("title")} placeholder="Item title" />
              <input {...registerItem("detail")} placeholder="Detail" />
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
        <div className="receive-title">
          <div className="receive-title-header">
            <p>Title: {title.title}</p>
            <div className="receive-icons">
              <TbEdit style={{ color: "white" }} />
              <TbEdit className="receive-icon up" onClick={() => toggle(1)} />
            </div>
          </div>
          <div
            className={
              selected === 1
                ? `receive-title-form active`
                : "receive-title-form"
            }
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("title")} placeholder="Title component" />
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>

        <div className={selected === 3 ? `items-wrap active` : "items-wrap"}>
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
                    <p className="rc-item-col">{item.img}</p>
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
