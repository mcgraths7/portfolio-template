import type React from "react";

import useContactForm from "@/hooks/useContactForm";
import { Input, Textarea } from "@/app/components/inputs/Input";
import { ButtonPrimary } from "@/app/components/inputs/Button";
import PageTitle from "@/app/components/typography/PageTitle";
import useFetchData from "@/hooks/useFetchData";
import { getPageScaffold } from "@/sanity/queries/pageScaffolds";
import { PageScaffold } from "@/types/sanity";

const ContactForm: React.FC = () => {
  const { formData, errors, handleChange, handleBlur, handleSubmit } = useContactForm();
  const { data, loading, error } = useFetchData<PageScaffold>(
    getPageScaffold,
    "contact"
  );

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!data) return <div>Error: Page with slug &quot;contact&quot; not found...</div>;

  const { pageTitle, emphasisText } = data;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageTitle title={pageTitle} emphasisText={emphasisText} inverted={false} />
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <div className="w-1/2">
            <Input
              label="First Name"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={errors.firstName}
            />
          </div>
          <div className="w-1/2">
            <Input
              label="Last Name"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={errors.lastName}
            />
          </div>
        </div>
        <div>
          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            error={errors.email}
          />
        </div>
        <div>
          <Input
            label="Subject"
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            error={errors.subject}
          />
        </div>
        <div>
          <Textarea
            label="Message"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            rows={5}
            error={errors.message}
          />
        </div>
        <div className="flex justify-end">
          <ButtonPrimary type="submit" className="px-8 py-3">
            Send Message
          </ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
