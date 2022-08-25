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
  video: "https://youtu.be/mUjhiT0zSKI",
};
const fake_road_items = [
  {
    content: "Do i need  to be fulltime during the campus",
    detail:
      "Yes, it’s mandatory. Fulltime as well as full commitment in order to obtain the best achievement.",
  },
  {
    content: "Do i need  to be fulltime during the campus",
    detail:
      "Yes, it’s kind of a scholarship. But, you need to pass our challenge through test and interview round.",
  },
  {
    content: "Do i need  to be fulltime during the campus",
    detail:
      "The first plus (+) course is designed to students who would like to join the OJT (on-job-train) programme. Next level, the second plus (++) course will suitable for one who got the first plus or fresher, who would like to be trained in order to ready to onboard the real projects. The third plus (+++) course is intended to the alumni of the second plus degree or junior who would like to reach a specific tech-stack: AI, Blockchain, Devops...",
  },
  {
    content: "Do i need  to be fulltime during the campus",
    detail:
      "Yes, it’s could be a good job. Once you get the second plus (++) you will ready to onboard the projects of our partners, the most highly recommended places to work.",
  },
];

const FormCommon = () => {
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
    resetFieldItem("content");
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
              <input {...registerItem("content")} placeholder="content" />
              <input {...registerItem("detail")} placeholder="detail" />
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
      <div className="common-content">
        <div className="common-title">
          <div className="common-title-header">
            <div className="common-title-item">
              Video url: <p>{title.video}</p>
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
              <input {...register("video")} placeholder="Title component" />
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
          {Array.isArray(items)
            ? items.map((item, i) => (
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
