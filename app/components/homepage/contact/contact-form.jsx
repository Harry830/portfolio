"use client";

import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    }
    if (error.email) return;

    setError({ ...error, required: false });

    try {
      setIsLoading(true);
      await axios.post(`/api/contact`, userInput);
      toast.success("Message sent — I'll get back to you shortly.");
      setUserInput({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSendMail}
      noValidate
      className="surface-paper p-6 lg:p-8 flex flex-col gap-5"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="field-label">
          Your name
        </label>
        <input
          id="contact-name"
          type="text"
          maxLength={100}
          required
          className="field-input"
          value={userInput.name}
          onChange={(e) =>
            setUserInput({ ...userInput, name: e.target.value })
          }
          onBlur={checkRequired}
          autoComplete="name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="field-label">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          maxLength={100}
          required
          className="field-input"
          value={userInput.email}
          onChange={(e) =>
            setUserInput({ ...userInput, email: e.target.value })
          }
          onBlur={() => {
            checkRequired();
            setError({
              ...error,
              email: !isValidEmail(userInput.email),
            });
          }}
          autoComplete="email"
        />
        {error.email && (
          <p className="text-sm text-[var(--amber-deep)]">
            Please provide a valid email.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="field-label">
          Message
        </label>
        <textarea
          id="contact-message"
          maxLength={500}
          required
          rows={5}
          className="field-textarea"
          value={userInput.message}
          onChange={(e) =>
            setUserInput({ ...userInput, message: e.target.value })
          }
          onBlur={checkRequired}
        />
      </div>

      {error.required && (
        <p className="text-sm text-[var(--amber-deep)]">
          All fields are required.
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary mt-1 self-start disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span>Sending…</span>
        ) : (
          <span className="flex items-center gap-2">
            Send message
            <TbMailForward size={18} />
          </span>
        )}
      </button>
    </form>
  );
}
