import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../components/Login.css";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // bloodType: "",
    // health: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSelectChange = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        bloodType: e.target.value,
      };
    });
  };

  const onSubmit = async () => {
    const { firstName, lastName, email, password } = user;
    await axios
      .post("http://localhost:5000/api/users/signup", user)
      .then((res) => {
        navigate("/login");
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          id="firstname"
          onChange={handleChange}
          name="firstName"
          value={user.firstName}
        />

        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          id="lastname"
          onChange={handleChange}
          name="lastName"
          value={user.lastName}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />

        {/* <label htmlFor="bloodType">Select your blood type:</label>
        <select
          id="bloodType"
          {...register("bloodType", { required: "This field is required" })}
          value={user.bloodType}
          name="bloodType"
          onChange={handleSelectChange}
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
        )} */}

        {/* <div className="form-check">
          <input
            type="checkbox"
            name="selectCheckbox"
            id="selectCheckbox"
            {...register("health", { required: "This field is required" })}
            className={`form-check-label ${errors?.health ? "is-invalid" : ""}`}
            onChange={handleChange}
          />
          <a href="/HealthDec" className="form-check-label">
            Health declaration
          </a>
          <div className="validationError">{errors?.health?.message}</div>
        </div> */}

        <div className="btn-container">
          <button className="btn">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
