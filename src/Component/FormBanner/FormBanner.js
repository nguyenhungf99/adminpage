import { useState } from "react";
import "./FormBanner.css";
import { useForm } from "react-hook-form";

const fake_data = {
  title:
    "Devplus Will Support The Early Stage Developers Go The Right Career Path",
  detail:
    "Devplus is not a training center, it’s battle campus for you to level up your skillsets and ready to onboard any projects in our “kindest” companies listing",
  bgImg: "https://devplus.edu.vn/assets/images/devplus/Devplus_missions.png",
};
const FormBanner = () => {
  const [data, setData] = useState(fake_data);
  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });

  const onSubmit = (dataSubmit) => {
    setData(dataSubmit);
  };

  return (
    <div className="banner-form">
      <div className="banner-content">
        <div className="banner-title">
          <div className="banner-title-header">
            <h3>Banner</h3>
          </div>
          <div className={"banner-title-form"}>
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
export default FormBanner;
