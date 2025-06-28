import { useState } from "react";

export function useValidation(requiredFields = []) {
  const [errors, setErrors] = useState({});

  const validate = (form) => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!form[field] || form[field].toString().trim() === "") {
        newErrors[field] = "This field is required";
      }
    });
    if (form.student_id && !/^\d{12}$/.test(form.student_id)) {
      newErrors.student_id = "Student ID must be 12 digits (numbers only)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const resetErrors = () => setErrors({});
  return { errors, validate, resetErrors };
}