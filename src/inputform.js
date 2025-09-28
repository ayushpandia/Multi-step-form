import { useState } from "react";
import formData from "./formdata.js";

export default function InputForm() {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (currentStepIdx + 1 === formData.length) {
      alert("Data submitted", userData);
      return;
    }
    setCurrentStepIdx((prev) => prev + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setCurrentStepIdx((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const stepId = e.target.getAttribute("data-id");
    // ============ METHOD 1 ==============
    // let obj = {};
    // if (stepId === "name") {
    //   obj = { name: e.target.value };
    // } else if (stepId === "email") {
    //   obj = { email: e.target.value };
    // } else if (stepId === "date") {
    //   obj = { date: e.target.value };
    // } else if (stepId === "password") {
    //   obj = { password: e.target.value };
    // }
    // setUserData({ ...userData, ...obj });

    // ============ METHOD 2 ==============
    const userDataCopy = { ...userData };
    userDataCopy[stepId] = e.target.value;
    setUserData(userDataCopy);
  };

  return (
    <div className="container">
      {currentStepIdx > 0 && (
        <a onClick={handleBack} href="">
          Back
        </a>
      )}
      <form onSubmit={handleClick}>
        <div className="form-component">
          <label> {formData[currentStepIdx].labelText} </label>
          <input
            required
            placeholder={formData[currentStepIdx].placeholder}
            data-id={formData[currentStepIdx].id}
            value={userData[formData[currentStepIdx].id]}
            onChange={handleChange}
            type={formData[currentStepIdx].type}
          />
          <button>{formData[currentStepIdx].buttonText}</button>
        </div>
      </form>
    </div>
  );
}
