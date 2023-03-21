import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../components/modalCSS.css";

const InRoutine = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [request, setRequest] = useState({
    bloodType: "",
    bloodAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const onSubmit = async () => {
    const { bloodType, bloodAmount } = request;
    console.log(request.bloodType);
    await axios.post("http://localhost:5000/inRoutine", request).then((res) => {
      console.log(res.data.message);
      setErrorMessage(res.data.message);
    });
  };

  const closeModal = () => {
    setErrorMessage(false);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>For which blood type is the application required?</h1>
        <label htmlFor="bloodType">Blood type:</label>
        <select
          id="bloodType"
          {...register("bloodType", { required: "This field is required" })}
          value={request.bloodType}
          name="bloodType"
          onChange={handleChange}
        >
          <option value="">Select blood type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        {errors?.bloodType?.message && (
          <div className="validationError">{errors?.bloodType?.message}</div>
        )}

        <label htmlFor="bloodAmount">Blood amount (in packets): </label>
        <input
          type="number"
          id="bloodAmount"
          {...register("bloodAmount", {
            required: "This field is required",
            min: { value: 1, message: "The minimum required is 1" },
          })}
          onChange={handleChange}
          name="bloodAmount"
          value={request.bloodAmount}
        />
        {errors?.bloodAmount?.message && (
          <div className="validationError">{errors?.bloodAmount?.message}</div>
        )}
        <div className="btn-container">
          <button className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
      {errorMessage && (
        <div className="modal">
          <div className="flex">
            <button className="btn-close" onClick={closeModal}>
              ⨉
            </button>
            <div className="modal-text">{errorMessage}</div>
            <button className="btn-ok" onClick={closeModal}>
              Okay
            </button>
          </div>
        </div>
      )}
      <div className="overlay hidden"></div>
    </div>
  );
};
export default InRoutine;
