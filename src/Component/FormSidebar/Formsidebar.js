import { useEffect, useState } from "react";
import "./FormSideBar.css";
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
const fake_content = {
  title:
    "Devplus's mission is filling the gap between school and corporate, reduce in-house training cost and effort for IT companies.",
};
const fake_road_items = [
  { img: "https://devplus.asia/assets/images/devplus/1.png" },
  { img: "https://devplus.asia/assets/images/devplus/2.png" },
  { img: "https://devplus.asia/assets/images/devplus/3.png" },
  { img: "https://devplus.asia/assets/images/devplus/4.png" },
  { img: "https://devplus.asia/assets/images/devplus/5.png" },
  { img: "https://devplus.asia/assets/images/devplus/6.png" },
];

const FormSideBar = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(null);
  const [title, setTitle] = useState(fake_content);
  const [selected, setSelected] = useState(null);

  const { register, handleSubmit, setValue } = useForm({
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
    // try {
    //   const response = await axios.post(
    //     "https://api-devplus.herokuapp.com/api/receive",
    //     submitItem
    //   );
    //   if (response.data) {
    //     getAllAbout();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    resetFieldItem("img");
    resetFieldItem("detail");
    resetFieldItem("title");
    setOpen(false);
  };
  const editItem = async (submitItem) => {
    // try {
    //   const response = await axios.put(
    //     `https://api-devplus.herokuapp.com/api/receive/${item.id}`,
    //     submitItem
    //   );
    //   if (response.data) {
    //     getAllAbout();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    setItem(null);
    setOpen(false);
  };
  const deleteItem = async () => {
    // try {
    //   const response = await axios.delete(
    //     `https://api-devplus.herokuapp.com/api/receive/${item.id}`
    //   );
    //   if (response.data) {
    //     getAllAbout();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    setItem(null);
    setOpen(false);
  };

  const getAllAbout = async () => {
    setItems(fake_road_items);
    setTitle(fake_content);
    // try {
    //   const response = await axios.get(
    //     "https://api-devplus.herokuapp.com/api/receive"
    //   );
    //   if (response.data) {
    //     setItems(response.data);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  useEffect(() => {
    getAllAbout();
  }, []);
  useEffect(() => {
    if (item) {
      setValueItemEdit("img", item.img);
      setValueItemEdit("detail", item.detail);
      setValueItemEdit("title", item.title);
    }
  }, [item]);

  return (
    <div className="fsidebar-form">
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
              <input {...registerItemEdit("img")} placeholder="url img" />
              <input type="submit" value="Edit Image" />
            </form>
          ) : (
            <form onSubmit={handleSubmitItem(addItem)}>
              <input {...registerItem("img")} placeholder="url img" />
              <input type="submit" value="Add Image" />
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
      <div className="fsidebar-content">
        <div className="fsidebar-title">
          <div className="fsidebar-title-header">
            <div className="fsidebar-title-item">
              Title: <p>{title.title}</p>
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
              <input {...register("title")} placeholder="Title component" />
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>

        <div
          className={
            selected === 3
              ? `fsidebar-items-wrap active`
              : "fsidebar-items-wrap"
          }
        >
          <div className="fsidebar-item-content">
            <p className="fsidebar-content-col">Url Image </p>
            <div className="fsidebar-content-action" onClick={handleOpen}>
              Add new
            </div>
          </div>
          {Array.isArray(items)
            ? items.map((item, i) => (
                <div className="fsidebar-item" key={i}>
                  <div className={"fsidebar-item-header"}>
                    <div className="fsidebar-item-col">{item.img}</div>
                    <div className="fsidebar-icons">
                      <TbEdit
                        className="fsidebar-icon up"
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
export default FormSideBar;
