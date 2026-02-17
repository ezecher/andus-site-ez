"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/(site)/contact/actions";
import type { ContactFormState } from "@/app/(site)/contact/actions";

const initialState: ContactFormState = {
  success: false,
  error: null,
};

const orgSizeOptions = [
  "1-50",
  "51-200",
  "201-500",
  "501-1000",
  "1001-5000",
  "5000+",
];

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  if (state.success) {
    return (
      <div className="p-8 border-2 border-periwinkle bg-periwinkle/10">
        <h3 className="font-heading font-bold text-violet text-xl mb-2">
          Thank you.
        </h3>
        <p className="text-violet/70">
          We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          required
          className="w-full px-0 py-4 border-0 border-b-2 border-periwinkle bg-transparent text-violet placeholder:text-cinerous font-heading focus:outline-none focus:border-violet transition-colors"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email*"
          required
          className="w-full px-0 py-4 border-0 border-b-2 border-periwinkle bg-transparent text-violet placeholder:text-cinerous font-heading focus:outline-none focus:border-violet transition-colors"
        />
      </div>
      <div>
        <input
          type="text"
          name="company"
          placeholder="Company*"
          required
          className="w-full px-0 py-4 border-0 border-b-2 border-periwinkle bg-transparent text-violet placeholder:text-cinerous font-heading focus:outline-none focus:border-violet transition-colors"
        />
      </div>
      <div>
        <select
          name="orgSize"
          className="w-full px-0 py-4 border-0 border-b-2 border-periwinkle bg-transparent text-cinerous font-heading focus:outline-none focus:border-violet transition-colors appearance-none cursor-pointer"
          defaultValue=""
        >
          <option value="" disabled>
            Organization size
          </option>
          {orgSizeOptions.map((size) => (
            <option key={size} value={size} className="text-violet">
              {size}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          name="message"
          placeholder="What are you looking to solve?"
          rows={3}
          className="w-full px-0 py-4 border-0 border-b-2 border-periwinkle bg-transparent text-violet placeholder:text-cinerous font-heading focus:outline-none focus:border-violet transition-colors resize-y"
        />
      </div>

      {state.error && (
        <p className="text-orange text-sm">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="font-heading text-sm tracking-wide px-6 py-3 bg-orange text-cream border-2 border-orange hover:bg-orange-hover hover:border-orange-hover transition-all duration-300 disabled:opacity-50 cursor-pointer"
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
