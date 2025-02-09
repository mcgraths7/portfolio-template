import { useState } from "react";

import { sendEmail } from "../app/actions/sendEmail";
import { EMAIL_REGEX } from "../app/constants";
import { FormData } from "../types/app";

const useContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    subject: "",
    message: "",
    apiResponse: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    subject: "",
    message: "",
    apiResponse: "",
  });

  const resetFormData = () => {
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      subject: "",
      message: "",
      apiResponse: "",
    });
    setErrors({
      email: "",
      firstName: "",
      lastName: "",
      subject: "",
      message: "",
      apiResponse: "",
    });
  }

  const validateField = (fieldName: string, value: string) => {
    let error = "";

    if (fieldName === "email") {
      if (!value) {
        error = "Email is required";
      } else if (!EMAIL_REGEX.test(value)) {
        error = "Invalid email address";
      }
    } else if (fieldName === "subject") {
      if (!value) {
        error = "Subject is required";
      } else if (value.length < 6) {
        error = "Subject must be at least 6 characters";
      }
    } else if (fieldName === "message") {
      if (!value) {
        error = "Message is required";
      } else if (value.length < 10) {
        error = "Message must be at least 10 characters";
      }
    } else if (fieldName === "firstName") {
      if (!value) {
        error = "First name is required";
      } else if (value.length < 2) {
        error = "First name must be at least 2 characters";
      }
    } else if (fieldName === "lastName") {
      if (!value) {
        error = "Last name is required";
      } else if (value.length < 2) {
        error = "Last name must be at least 2 characters";
      }
    }

    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await sendEmail(formData);
    if (response.error) {
      setErrors((prev) => ({ ...prev, apiResponse: response.error }));
    } else {
      resetFormData();
  }};

  return { formData, errors, handleChange, handleBlur, handleSubmit, resetFormData };
};

export default useContactForm;
