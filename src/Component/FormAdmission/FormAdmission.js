import { useState } from "react";
import "./FormAdmission.css";
import { useForm } from "react-hook-form";

const fake_data = {
  title: "Admission for 2021",
  detail:
    "Disclaimer: This position is expected to start around Feb 2022 and continue through the entire Summer term. We ask for a minimum of 12 weeks, full-time, for most internships. Please consider before submitting an application. Devplus aims to provide students the chance to work with our clients and awesome mentors to level up your programing skillset in the RIGHT path. With your education and experience, you will be able to take on real-world challenges from day one.",
  bgImg: "https://devplus.edu.vn/assets/images/devplus/Admission_for_2021.png",
};
const FormAdmission = () => {
  const [data, setData] = useState(fake_data);
  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });

  const onSubmit = (dataSubmit) => {
    setData(dataSubmit);
  };

  return (
    <div className="adm-form">
      <div className="adm-content">
        <div className="adm-title">
          <div className="adm-title-header">
            <h3>Admission</h3>
          </div>
          <div className={"adm-title-form"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Title</label>
              <input {...register("title")} placeholder="Title component" />
              <label>Detail</label>
              <textarea {...register("detail")} placeholder="Title component" />
              <label>Background image url</label>
              <input {...register("bgImg")} placeholder="Title component" />
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormAdmission;
