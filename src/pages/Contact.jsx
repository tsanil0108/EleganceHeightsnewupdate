import { useState } from 'react';
import './Contact.css';

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shakeField, setShakeField] = useState(null);

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name] || errors.submit) {
      setErrors((previous) => ({
        ...previous,
        [name]: '',
        submit: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = 'Please enter a valid email address';
    }

    const cleanedPhone = formData.phone.replace(/[\s()+-]/g, '');

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10,15}$/.test(cleanedPhone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      const firstField = Object.keys(newErrors)[0];
      setShakeField(firstField);

      setTimeout(() => {
        setShakeField(null);
      }, 500);

      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitted(false);

    try {
      if (!accessKey) {
        throw new Error(
          'Web3Forms access key is missing. Please restart the development server.'
        );
      }

      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,

            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),

            message:
              formData.message.trim() || 'No message provided.',

            subject: `New Elegance Heights Enquiry - ${formData.name.trim()}`,
            from_name: 'Elegance Heights Website',

            project: 'Elegance Heights',
            location: 'Malad East, Mumbai',
            source: 'Website Contact Form',

            botcheck: '',
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Unable to send your enquiry.'
        );
      }

      setSubmitted(true);
      setFormData(INITIAL_FORM_DATA);

      // Fire Google Ads conversion event only on successful form submit
      window.gtag?.('event', 'conversion', {
        send_to: 'AW-18372892151/CONVERSION_LABEL',
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);

      setErrors({
        submit:
          error.message ||
          'Failed to submit your enquiry. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your name',
      autoComplete: 'name',
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email',
      autoComplete: 'email',
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter your phone number',
      autoComplete: 'tel',
      inputMode: 'tel',
    },
  ];

  const infoItems = [
    {
      label: 'Address',
      content: (
        <p>
          Elegance Heights, Next to Shankar Mandir, Opp. Shree Raj
          Medical &amp; Bhagvati Gen. Store, Shivaji Nagar, Kurar
          Village,
          <br />
          Malad East, Mumbai 400 097
        </p>
      ),
    },
    {
      label: 'Phone',
      content: (
        <a href="tel:+919833324444">+91 9833324444</a>
      ),
    },
    {
      label: 'Email',
      content: (
        <a href="mailto:Sales@eleganceheights.com">
          Sales@eleganceheights.com
        </a>
      ),
    },
    {
      label: 'RERA Registration',
      content: <p>P51800034810</p>,
    },
    {
      label: 'Business Hours',
      content: (
        <p>
          Monday - Sunday
          <br />
          10:00 AM - 6:00 PM
        </p>
      ),
    },
  ];

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1 className="contact-hero__title">
            Get in Touch
          </h1>

          <p className="contact-hero__subtitle">
            Have questions about Elegance Heights? We&apos;re here
            to help you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-content">
          <div className="contact-form-wrapper">
            <h2>Quick Enquiry</h2>

            {submitted && (
              <div
                className="form-success"
                role="status"
                aria-live="polite"
              >
                ✓ Thank you! Your enquiry has been sent
                successfully. We&apos;ll contact you shortly.
              </div>
            )}

            {errors.submit && (
              <div
                className="form-error"
                role="alert"
                aria-live="assertive"
              >
                ✗ {errors.submit}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="contact-form"
              noValidate
            >
              <input
                type="checkbox"
                name="botcheck"
                className="contact-form__botcheck"
                tabIndex="-1"
                autoComplete="off"
              />

              {fields.map((field, index) => (
                <div
                  className={`form-group ${
                    shakeField === field.name
                      ? 'form-group--shake'
                      : ''
                  }`}
                  key={field.name}
                  style={{ '--i': index }}
                >
                  <label htmlFor={field.name}>
                    {field.label} *
                  </label>

                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={
                      errors[field.name] ? 'input-error' : ''
                    }
                    placeholder={field.placeholder}
                    disabled={isSubmitting}
                    autoComplete={field.autoComplete}
                    inputMode={field.inputMode}
                    aria-invalid={Boolean(errors[field.name])}
                    aria-describedby={
                      errors[field.name]
                        ? `${field.name}-error`
                        : undefined
                    }
                  />

                  {errors[field.name] && (
                    <span
                      id={`${field.name}-error`}
                      className="error-message"
                    >
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))}

              <div
                className="form-group"
                style={{ '--i': 3 }}
              >
                <label htmlFor="message">
                  Message
                  <span className="optional-text">
                    {' '}
                    (Optional)
                  </span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us about your interest in Elegance Heights..."
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                className={`btn btn--primary btn--lg ${
                  isSubmitting ? 'is-loading' : ''
                }`}
                disabled={isSubmitting}
                style={{ '--i': 4 }}
              >
                {isSubmitting && (
                  <span
                    className="btn__spinner"
                    aria-hidden="true"
                  />
                )}

                {isSubmitting
                  ? 'Sending...'
                  : 'Send Enquiry'}
              </button>
            </form>
          </div>

          <div className="contact-info">
            <h2>Contact Information</h2>

            {infoItems.map((item, index) => (
              <div
                className="info-item"
                key={item.label}
                style={{ '--i': index }}
              >
                <span className="info-label">
                  {item.label}
                </span>

                {item.content}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}