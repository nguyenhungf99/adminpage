import { useEffect, useState } from "react";
import "./FormSideBar.css";
import { useForm } from "react-hook-form";
import { TbEdit } from "react-icons/tb";
import { FaPlusCircle } from "react-icons/fa";
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

const FormSideBar = () => {
  const [data, setData] = useState({});
  const [item, setItem] = useState(null);
  const [itemIndex, setItemIndex] = useState(null);
  const [selected, setSelected] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  const {
    register: registerMap,
    handleSubmit: handleSubmitMap,
    setValue: setValueMap,
  } = useForm();
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
      setItem(data.images.at(index));
      setItemIndex(index);
    }
    setOpen(true);
  };
  const handleClose = () => {
    setItem(null);
    setItemIndex(null);
    setOpen(false);
  };
  const [openMap, setOpenMap] = useState(false);
  const handleOpenMap = () => {
    setOpenMap(true);
  };
  const handleCloseMap = () => {
    setOpenMap(false);
  };

  const [openMess, setOpenMess] = useState(false);
  const handleOpenMess = (index) => {
    if (Number.isInteger(index)) {
      setItem(data.images.at(index));
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
    dataTemp.text = dataSubmit.text;
    postApi(dataTemp);
  };
  const onSubmitMap = (dataSubmit) => {
    let dataTemp = { ...data };
    dataTemp.map = dataSubmit.map;
    postApi(dataTemp);
  };

  const addItem = (submitItem) => {
    let dataTemp = { ...data };
    dataTemp.images.push(submitItem);
    postApi(dataTemp);
    resetFieldItem("url");
    setOpen(false);
  };
  const editItem = (submitItem) => {
    let dataTemp = { ...data };
    dataTemp.images[itemIndex] = submitItem;
    postApi(dataTemp);
    resetFieldItem("url");
    setOpen(false);
  };
  const deleteItem = () => {
    let dataTemp = { ...data };
    dataTemp.images.splice(itemIndex);
    postApi(dataTemp);
    resetFieldItem("url");
    setOpen(false);
  };
  const postApi = async (submit) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/sidebar/edit",
        submit
      );
      if (response.data) {
        getAllAbout();
      }
    } catch (error) {
      console.log(error);
    }

    setItem(null);
    setItemIndex(null);
    setOpen(false);
    setOpenMap(false);
  };

  const getAllAbout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/sidebar/info/"
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
      setValue("text", data.text);
      setValueMap("map", data.map);
    }
  }, [data]);
  useEffect(() => {
    if (item) {
      setValueItemEdit("url", item.url);
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
              <input {...registerItemEdit("url")} placeholder="url img" />
              <input type="submit" value="Edit Image" />
            </form>
          ) : (
            <form onSubmit={handleSubmitItem(addItem)}>
              <input {...registerItem("url")} placeholder="url img" />
              <input type="submit" value="Add Image" />
            </form>
          )}
        </Box>
      </Modal>

      <Modal
        open={openMap}
        onClose={handleCloseMap}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmitMap(onSubmitMap)}>
            <label>Image</label>
            <input {...registerMap("map")} placeholder="Map" />
            <input type="submit" value="Edit Image" />
          </form>
        </Box>
      </Modal>

      <Dialog
        open={openMess}
        onClose={handleCloseMess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want delete this item?"}
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
        <h2 style={{ "font-weight": "500" }}>Text header</h2>
        <div className="fsidebar-title">
          <div className="fsidebar-title-header">
            <div className="fsidebar-title-item">
              <p>{data ? data.text : null}</p>
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
              <input {...register("text")} placeholder="Title component" />
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>
        <h2 style={{ "font-weight": "500" }}>Item images</h2>
        <div className="fsidebar-items-container">
          <div className="fsidebar-items-wrap">
            {Array.isArray(data.images)
              ? data.images.map((item, i) => (
                  <div className="fsidebar-item" key={i}>
                    <div className="fsidebar-item-header">
                      <img src={item.url} alt="st"></img>
                      <div className="fsidebar-icons">
                        <TbEdit
                          className="fsidebar-icon up"
                          onClick={() => handleOpen(i)}
                        />
                        <MdOutlineDelete
                          className="fsidebar-icon det"
                          onClick={() => handleOpenMess(i)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              : null}
            <div className="fsidebar-items-add" onClick={handleOpen}>
              <FaPlusCircle className="fsidebar-icon-add"></FaPlusCircle>
            </div>
          </div>
        </div>
        <h2 style={{ "font-weight": "500" }}>Map image</h2>
        <div className="fsidebar-map-container">
          <div className="fsidebar-map-header">
            <img src={data.map} alt="st"></img>
            <div className="fsidebar-icons-map">
              <TbEdit className="fsidebar-icon-map" onClick={handleOpenMap} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormSideBar;
