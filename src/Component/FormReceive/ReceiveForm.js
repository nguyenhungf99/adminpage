import { useEffect, useState } from "react";
import "./ReceiveForm.css";
import { useForm } from "react-hook-form";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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

const fake_data = [
  {
    img: "https://devplus.edu.vn/assets/images/categories/icons/1.png",
    title: "Programing foundation",
    detail: "Algorithm, Design patte",
  },
  {
    img: "https://devplus.edu.vn/assets/images/categories/icons/2.png",
    title: "Database",
    detail: "SQL Syntax",
  },
  {
    img: "https://devplus.edu.vn/assets/images/categories/icons/3.png",
    title: "Testing",
    detail: "Unit testing, TDD",
  },
  {
    img: "https://devplus.edu.vn/assets/images/categories/icons/4.png",
    title: "Front-end",
    detail: "HTM/CSS/JS , ReactJS/VueJS",
  },
  {
    img: "https://devplus.edu.vn/assets/images/categories/icons/5.png",
    title: "Back-end",
    detail: "PHP, NodeJS",
  },
  {
    img: "https://devplus.edu.vn/assets/images/categories/icons/6.png",
    title: "Agile Stable Team",
    detail: "Agile/Scrum",
  },
  {
    img: "https://devplus.edu.vn/assets/images/categories/icons/7.png",
    title: "English",
    detail: "Basic conversion",
  },
  {
    img: "https://devplus.edu.vn/assets/images/categories/icons/8.png",
    title: "Communication",
    detail: "HORENSO",
  },
  {
    img: "https://devplus.edu.vn/assets/images/categories/icons/9.png",
    title: "Career path",
    detail: "Work ethic, Integrity",
  },
];
const ReceiveForm = () => {
  const [data, setData] = useState(fake_data);
  const [selected, setSelected] = useState(null);
  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });
  const { register: registerItem, handleSubmit: handleSubmitItem } = useForm();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  const onSubmit = (dataSubmit) => {
    setData(dataSubmit);
  };
  const addItem = (submitItem) => {
    setData(data.items.push(submitItem));
    console.log(data);
  };

  // const getAllReceive = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/api/receive/");
  //     if (response.data) {
  //       setData(response.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getAllReceive();
  //   console.log(data);
  // }, []);

  return (
    <div className="receive-form">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmitItem(addItem)}>
            <input {...registerItem("img")} placeholder="Image url" />
            <input {...registerItem("title")} placeholder="Item title" />
            <input {...registerItem("detail")} placeholder="Detail" />
            <input type="submit" value="Add item" />
          </form>
        </Box>
      </Modal>

      <div className="receive-content">
        <div className="receive-title">
          <div className="receive-title-header">
            <p>Title:</p>
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
          {data.map((item, i) => (
            <div className="receive-item" key={i}>
              <div className={"rc-item-header"}>
                <div className="rc-item-col">{item.title}</div>
                <p className="rc-item-col">{item.detail}</p>
                <p className="rc-item-col">{item.img}</p>
                <div className="receive-icons">
                  <TbEdit className="receive-icon up" onClick={handleOpen} />
                  <MdOutlineDelete style={{ color: "red" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ReceiveForm;
