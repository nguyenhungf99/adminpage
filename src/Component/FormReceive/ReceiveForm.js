import { useState, useEffect } from "react";
import "./ReceiveForm.css";
import { useForm } from "react-hook-form";
import { TbEdit } from "react-icons/tb";
import {
  FiArrowDownCircle,
  FiArrowRightCircle,
  FiPlusCircle,
} from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

const fake_data = {
  title: "What an engineer after Devplus will must have?",
  items: [
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
  ],
};
const ReceiveForm = () => {
  const [data, setData] = useState(fake_data);
  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });
  const { register: registerItem, handleSubmit: handleSubmitItem } = useForm();

  const [itemSelected, setItemSelected] = useState(null);
  const [selected, setSelected] = useState(null);
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  const itemToggle = (i) => {
    if (itemSelected === i) {
      return setItemSelected(null);
    }
    setItemSelected(i);
  };
  const onSubmit = (dataSubmit) => {
    setData(dataSubmit);
  };
  const addItem = (submitItem) => {
    setData(data.items.push(submitItem));
    console.log(data);
  };

  return (
    <div className="receive-form">
      <div className="receive-content">
        <div className="receive-title">
          <div className="receive-title-header">
            <p>Title</p>
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

        <div className="receive-title">
          <div className="receive-title-header">
            <p>Items</p>
            <div className="receive-icons">
              <FiPlusCircle
                className="receive-icon add"
                onClick={() => toggle(2)}
              ></FiPlusCircle>
              {selected === 3 ? (
                <FiArrowDownCircle
                  className="receive-icon"
                  onClick={() => toggle(3)}
                />
              ) : (
                <FiArrowRightCircle
                  className="receive-icon"
                  onClick={() => toggle(3)}
                />
              )}
            </div>
          </div>
          <div
            className={
              selected === 2
                ? `receive-title-form active`
                : "receive-title-form"
            }
          >
            <form onSubmit={handleSubmitItem(addItem)}>
              <input {...registerItem("img")} placeholder="Image path" />
              <input {...registerItem("title")} placeholder="Title" />
              <input {...registerItem("detail")} placeholder="Detail" />
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>

        <div className={selected === 3 ? `items-wrap active` : "items-wrap"}>
          {data.items.map((item, i) => (
            <div className="receive-item" key={i}>
              <div
                className={
                  itemSelected === i
                    ? "rc-item-header active"
                    : "rc-item-header"
                }
              >
                {item.title}
                <div className="receive-icons">
                  <TbEdit
                    className="receive-icon up"
                    onClick={() => itemToggle(i)}
                  />
                  <MdOutlineDelete style={{ color: "red" }} />
                </div>
              </div>
              <div
                className={
                  itemSelected === i ? `answer-show active` : "answer-show"
                }
              >
                <form
                  className="rc-item-form"
                  onSubmit={handleSubmitItem(addItem)}
                >
                  <input {...registerItem("img")} placeholder="Image path" />
                  <input {...registerItem("title")} placeholder="Title" />
                  <input {...registerItem("detail")} placeholder="Detail" />
                  <input type="submit" value="submit" />
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ReceiveForm;
