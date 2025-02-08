import { useState } from "react"

interface ContactFormData {
  email: string
  subject: string
  message: string
}

const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState({
    email: "",
    subject: "",
    message: "",
  })

  const validateField = (name: string, value: string) => {
    let error = ""
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (name === "email") {
      if (!value) {
        error = "Email is required"
      } else if (!emailRegex.test(value)) {
        error = "Invalid email address"
      }
    } else if (name === "subject") {
      if (!value) {
        error = "Subject is required"
      } else if (value.length < 6) {
        error = "Subject must be at least 6 characters"
      }
    } else if (name === "message") {
      if (!value) {
        error = "Message is required"
      } else if (value.length < 10) {
        error = "Message must be at least 10 characters"
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    validateField(name, value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // For now, just log the form data
    console.log("Form submitted:", formData)
    // TODO: Implement actual email sending functionality
  }

  return { formData, errors, handleChange, handleBlur, handleSubmit }
}

export default useContactForm;