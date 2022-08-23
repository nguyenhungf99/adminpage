import { useEffect, useState } from "react";
import "./FormReview.css";
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
  title: "What alumni review",
};
const fake_road_items = [
  {
    author: "Quynh Nga",
    img: "https://devplus.edu.vn/assets/images/devplus/person2.png",
    job: "Menber DevPlus ++",
    title:
      "I learnt a lot of knowledge from experienced seniors of Dev plus. They help me to understand the procedure in running a real project. Additionally, taking part in activities such as workshops promote my soft skills.",
  },
  {
    author: "Thatsadaphone Inthapakdy",
    img: "https://devplus.edu.vn/assets/images/devplus/person3.png",
    job: "Menber DevPlus ++",
    title:
      "Dev plus help me to re-train about knowledge with technology, experience how to do the real project with senior developers by testing their current project, and share more experience with them. enjoy more events and workshops.",
  },
  {
    author: "Tien Thinh",
    img: "https://devplus.edu.vn/assets/images/devplus/person1.png",
    job: "Menber DevPlus ++",
    title:
      "This is an awesome programme which supports me too much in enhancing my skills and knowledge to become a developer. I feel very lucky because of joining Devplus.",
  },
];

const FormReview = () => {
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
    <div className="review-form">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {item ? (
            <form onSubmit={handleSubmitItemEdit(editItem)}>
              <label>Author</label>
              <input {...registerItemEdit("author")} placeholder="author" />
              <label>Image</label>
              <input {...registerItemEdit("img")} placeholder="img" />
              <label>Job</label>
              <input {...registerItemEdit("job")} placeholder="job" />
              <label>Title</label>
              <input {...registerItemEdit("title")} placeholder="title" />
              <input type="submit" value="Edit Item" />
            </form>
          ) : (
            <form onSubmit={handleSubmitItem(addItem)}>
              <input {...registerItem("author")} placeholder="author" />
              <input {...registerItem("img")} placeholder="url image" />
              <input {...registerItem("job")} placeholder="job" />
              <input {...registerItem("title")} placeholder="title" />
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
      <div className="review-content">
        <div className="review-title">
          <div className="review-title-header">
            <div className="review-title-item">
              Title: <p>{title.title}</p>
            </div>
            <div className="review-icons-down">
              <TbEdit className="review-icon-down" onClick={() => toggle(1)} />
            </div>
          </div>
          <div
            className={
              selected === 1 ? `review-title-form active` : "review-title-form"
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
            selected === 3 ? `review-items-wrap active` : "review-items-wrap"
          }
        >
          <div className="review-item-content">
            <p className="review-content-col col1">Author </p>
            <p className="review-content-col col2">Url Image </p>
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
                    <div className="review-item-col col2">{item.img}</div>
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
