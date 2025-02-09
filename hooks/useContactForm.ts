import { useState } from "react";

interface ContactFormData {
  email: string;
  firstName: string;
  lastName: string;
  subject: string;
  message: string;
}

const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    email: "",
    firstName: "",
    lastName: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    subject: "",
    message: "",
  });

  const validateField = (fieldName: string, value: string) => {
    let error = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fieldName === "email") {
      if (!value) {
        error = "Email is required";
      } else if (!emailRegex.test(value)) {
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
    // For now, just log the form data
    console.log("Form submitted:", formData);
    // TODO: Implement actual email sending functionality
  };

  return { formData, errors, handleChange, handleBlur, handleSubmit };
};

export default useContactForm;
