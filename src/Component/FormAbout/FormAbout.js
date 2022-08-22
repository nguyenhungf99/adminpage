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
    "The Fact: Skilled labour shortage for software companies but full of freshers and low level juniors",
  content:
    "Our responsibility is filling the gap between the quality of graduate students and the quality of engineers. Devplus will help reducing the cost of re-training and accelerating the skill-up progress of students and freshers.",
};
const fake_road_items = [
  { name: "Apply devplus" },
  { name: "Testing and Interview" },
  { name: "1st plus (+) campus" },
  { name: "1st plus (+) campus" },
  { name: "1st plus (+) campus" },
];

const FormAbout = () => {
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
              <input {...registerItemEdit("name")} placeholder="Item name" />
              <input type="submit" value="Edit item" />
            </form>
          ) : (
            <form onSubmit={handleSubmitItem(addItem)}>
              <input {...registerItem("name")} placeholder="Item name" />
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
              Title: <p>{title.title}</p>
              Content: <p>{title.content}</p>
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
          {Array.isArray(items)
            ? items.map((item, i) => (
                <div className="ab-item" key={i}>
                  <div className={"ab-item-header"}>
                    <div className="ab-item-col">{item.name}</div>
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
