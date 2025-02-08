import type React from "react";

import useContactForm from "@/hooks/useContactForm";
import { Input, Textarea } from "@/app/components/Input";
import { ButtonPrimary } from "@/app/components/Button";
import PageTitle from "@/app/components/PageTitle";
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
      <PageTitle title={pageTitle} emphasisText={emphasisText} />
      <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
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
            placeholder="What's this about?"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
          )}
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
            placeholder="Your message here..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
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
