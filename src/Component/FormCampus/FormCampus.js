import { useEffect, useState } from "react";
import "./FormCampus.css";
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
  title: "Our main campus",
};
const fake_road_items = [
  {
    detail: "One plus (+) Programing foundation",
    img: "https://devplus.asia/assets/images/devplus/1.png",
  },
  {
    detail: "Two plus (++) Skill up to to get ready",
    img: "https://devplus.asia/assets/images/devplus/2.png",
  },
  {
    detail: "Three plus (+++) How to become a senior",
    img: "https://devplus.asia/assets/images/devplus/3.png",
  },
];

const FormCampus = () => {
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
    <div className="campus-form">
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
              <input {...registerItemEdit("detail")} placeholder="detail" />
              <input {...registerItemEdit("img")} placeholder="url image" />
              <input type="submit" value="Edit Item" />
            </form>
          ) : (
            <form onSubmit={handleSubmitItem(addItem)}>
              <input {...registerItem("detail")} placeholder="detail" />
              <input {...registerItem("img")} placeholder="url image" />
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
            Do you want delet this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseMess("dis")}>Disagree</Button>
          <Button onClick={() => handleCloseMess("agr")}>Agree</Button>
        </DialogActions>
      </Dialog>
      <div className="campus-content">
        <div className="campus-title">
          <div className="campus-title-header">
            <div className="campus-title-item">
              Title: <p>{title.title}</p>
            </div>
            <div className="campus-icons-down">
              <TbEdit className="campus-icon-down" onClick={() => toggle(1)} />
            </div>
          </div>
          <div
            className={
              selected === 1 ? `campus-title-form active` : "campus-title-form"
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
            selected === 3 ? `campus-items-wrap active` : "campus-items-wrap"
          }
        >
          <div className="campus-item-content">
            <p className="campus-content-col">Detail </p>
            <p className="campus-content-col">Url Image </p>
            <div className="campus-content-action" onClick={handleOpen}>
              Add new
            </div>
          </div>
          {Array.isArray(items)
            ? items.map((item, i) => (
                <div className="campus-item" key={i}>
                  <div className={"campus-item-header"}>
                    <div className="campus-item-col">{item.detail}</div>
                    <div className="campus-item-col">{item.img}</div>
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
