"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import {
  transliterateToLatin,
  formatDateMask,
  isValidUSDate,
} from "@/lib/translit";
import { BUSINESS } from "@/lib/constants";

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  streetAddress: string;
  applianceType: string;
  problemDescription: string;
  insuranceCompany: string;
  preferredDate: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const APPLIANCE_TYPES = [
  "Refrigerator",
  "Dryer",
  "Dishwasher",
  "Microwave",
  "Beverage Cooler",
  "Other",
];

const INSURANCE_COMPANIES = [
  "None",
  "State Farm",
  "Allstate",
  "Geico",
  "USAA",
  "Other",
];

// Name shown in the Netlify Forms dashboard and used to route submissions.
const FORM_NAME = "repair-request";

const INITIAL_FORM: FormData = {
  fullName: "",
  phone: "",
  email: "",
  streetAddress: "",
  applianceType: "",
  problemDescription: "",
  insuranceCompany: "None",
  preferredDate: "",
};

// Simple US phone validation: accepts (813) 555-0123, 813-555-0123, 8135550123, etc.
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData): Errors {
  const errors: Errors = {};

  if (data.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }
  if (!PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (data.streetAddress.trim().length < 5) {
    errors.streetAddress = "Please enter your street address (Tampa Bay area).";
  }
  if (!data.applianceType) {
    errors.applianceType = "Please select your appliance type.";
  }
  if (data.problemDescription.trim().length < 10) {
    errors.problemDescription =
      "Please describe the issue (at least 10 characters).";
  }
  // Preferred date is optional, but if filled it must be a real MM/DD/YYYY date
  if (data.preferredDate && !isValidUSDate(data.preferredDate)) {
    errors.preferredDate = "Please enter a valid date (MM/DD/YYYY).";
  }

  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Errors>({});
  // Submission lifecycle: idle -> submitting -> success | error
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Per-field input transforms applied on every keystroke:
  // - Cyrillic is auto-converted to Latin letters
  // - Preferred date is masked as MM/DD/YYYY
  const FIELD_TRANSFORMS: Partial<
    Record<keyof FormData, (value: string) => string>
  > = {
    fullName: transliterateToLatin,
    streetAddress: transliterateToLatin,
    problemDescription: transliterateToLatin,
    preferredDate: formatDateMask,
  };

  const update =
    (field: keyof FormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const transform = FIELD_TRANSFORMS[field];
      const value = transform ? transform(e.target.value) : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      // Clear the error as soon as the user starts fixing the field
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Focus the first invalid field for a smooth mobile UX
      const firstErrorField = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setStatus("submitting");
    setSubmitError(null);

    // IMPORTANT: payload keys must exactly match the HTML input `name`
    // attributes below. Netlify maps submission values onto the detected
    // form schema by field name — any mismatch shows up as empty fields
    // in the Netlify UI and notification emails.
    // Netlify Forms requires a URL-encoded body (JSON is not supported).
    const payload = new URLSearchParams();
    payload.append("form-name", FORM_NAME);
    payload.append("fullName", form.fullName.trim());
    payload.append("phone", form.phone.trim());
    payload.append("email", form.email.trim());
    payload.append("streetAddress", form.streetAddress.trim());
    payload.append("applianceType", form.applianceType);
    payload.append("problemDescription", form.problemDescription.trim());
    payload.append("insuranceCompany", form.insuranceCompany);
    payload.append(
      "preferredDate",
      form.preferredDate.trim() || "As soon as possible"
    );

    console.log("=== NEW REPAIR REQUEST ===", form);

    // Netlify Forms is only available on the deployed site. On localhost the
    // request would hit our static preview server, so simulate success instead.
    const isLocalhost = ["localhost", "127.0.0.1"].includes(
      window.location.hostname
    );

    if (isLocalhost) {
      console.warn(
        "Netlify Forms is not available locally. Skipping the network request — this is a simulated success."
      );
      setStatus("success");
      return;
    }

    try {
      // POST to the site root: Netlify routes it to the form named FORM_NAME.
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      if (!response.ok) {
        throw new Error(`Netlify responded with status ${response.status}`);
      }

      setStatus("success");
    } catch (error) {
      console.error("Lead submission failed:", error);
      setStatus("error");
    }
  }

  // Success state
  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-card">
        <CheckCircle2 className="mx-auto h-16 w-16 text-brand-500" aria-hidden />
        <h3 className="mt-4 text-2xl font-extrabold text-pine-900">
          Thank you! We&apos;ll call you within 30 minutes.
        </h3>
        <p className="mt-2 text-slate-600">
          Your request is in. Keep your phone nearby — a real person will reach
          out shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(INITIAL_FORM);
            setStatus("idle");
          }}
          className="mt-6 text-sm font-semibold text-brand-600 underline underline-offset-4 hover:text-brand-700"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      // Netlify Forms: `name` + `data-netlify` enable serverless submissions,
      // `netlify-honeypot` quietly flags bots that fill the hidden field.
      name={FORM_NAME}
      method="post"
      data-netlify="true"
      netlify-honeypot="bot-field"
      action="/thank-you"
      className="rounded-2xl bg-white p-6 shadow-card sm:p-8"
    >
      {/* Required by Netlify when the form is rendered by React */}
      <input type="hidden" name="form-name" value={FORM_NAME} />
      {/* Honeypot: invisible for humans, bots fill it in and get flagged */}
      <p className="hidden" aria-hidden>
        <label>
          Don&apos;t fill this out if you&apos;re human:
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {status === "error" && (
        <div
          role="alert"
          className="mb-5 rounded-xl border-2 border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <p className="font-bold">Couldn&apos;t send your request.</p>
          <p className="mt-1">
            Please try again, or call us right now at{" "}
            <a href={BUSINESS.phoneHref} className="font-bold underline">
              {BUSINESS.phone}
            </a>
            .
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="field-label">
            Full Name *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="John Smith"
            value={form.fullName}
            onChange={update("fullName")}
            className={`field-input ${errors.fullName ? "field-input-error" : ""}`}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-sm font-medium text-red-600">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Phone — type="tel" brings up the numeric keypad on iPhone */}
        <div>
          <label htmlFor="phone" className="field-label">
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(813) 555-0123"
            value={form.phone}
            onChange={update("phone")}
            className={`field-input ${errors.phone ? "field-input-error" : ""}`}
          />
          {errors.phone && (
            <p className="mt-1.5 text-sm font-medium text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="field-label">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={update("email")}
            className={`field-input ${errors.email ? "field-input-error" : ""}`}
          />
          {errors.email && (
            <p className="mt-1.5 text-sm font-medium text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Street Address */}
        <div>
          <label htmlFor="streetAddress" className="field-label">
            Street Address *
          </label>
          <input
            id="streetAddress"
            name="streetAddress"
            type="text"
            autoComplete="street-address"
            placeholder="123 Bayshore Blvd, Tampa, FL"
            value={form.streetAddress}
            onChange={update("streetAddress")}
            className={`field-input ${errors.streetAddress ? "field-input-error" : ""}`}
          />
          {errors.streetAddress && (
            <p className="mt-1.5 text-sm font-medium text-red-600">
              {errors.streetAddress}
            </p>
          )}
        </div>

        {/* Appliance Type */}
        <div>
          <label htmlFor="applianceType" className="field-label">
            Appliance Type *
          </label>
          <select
            id="applianceType"
            name="applianceType"
            value={form.applianceType}
            onChange={update("applianceType")}
            className={`field-input ${errors.applianceType ? "field-input-error" : ""} ${
              form.applianceType === "" ? "text-slate-400" : ""
            }`}
          >
            <option value="" disabled>
              Select appliance...
            </option>
            {APPLIANCE_TYPES.map((type) => (
              <option key={type} value={type} className="text-slate-800">
                {type}
              </option>
            ))}
          </select>
          {errors.applianceType && (
            <p className="mt-1.5 text-sm font-medium text-red-600">
              {errors.applianceType}
            </p>
          )}
        </div>

        {/* Insurance Company */}
        <div>
          <label htmlFor="insuranceCompany" className="field-label">
            Insurance Company
          </label>
          <select
            id="insuranceCompany"
            name="insuranceCompany"
            value={form.insuranceCompany}
            onChange={update("insuranceCompany")}
            className="field-input"
          >
            {INSURANCE_COMPANIES.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        {/* Problem Description */}
        <div className="sm:col-span-2">
          <label htmlFor="problemDescription" className="field-label">
            Problem Description *
          </label>
          <textarea
            id="problemDescription"
            name="problemDescription"
            rows={4}
            placeholder="Describe the issue..."
            value={form.problemDescription}
            onChange={update("problemDescription")}
            className={`field-input resize-y ${errors.problemDescription ? "field-input-error" : ""}`}
          />
          {errors.problemDescription && (
            <p className="mt-1.5 text-sm font-medium text-red-600">
              {errors.problemDescription}
            </p>
          )}
        </div>

        {/* Preferred Date (optional) — masked text input instead of type="date",
            because the native date placeholder is rendered in the visitor's OS
            language (e.g. "дд.мм.гггг") and cannot be overridden. */}
        <div className="sm:col-span-2">
          <label htmlFor="preferredDate" className="field-label">
            Preferred Date <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="MM/DD/YYYY"
            value={form.preferredDate}
            onChange={update("preferredDate")}
            className={`field-input ${errors.preferredDate ? "field-input-error" : ""}`}
          />
          {errors.preferredDate && (
            <p className="mt-1.5 text-sm font-medium text-red-600">
              {errors.preferredDate}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary mt-8 w-full text-xl disabled:cursor-wait disabled:opacity-80"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden />
            Submit Request
          </>
        )}
      </button>

      <p className="mt-3 text-center text-xs text-slate-500">
        We respect your privacy. Your info is only used to schedule your repair.
      </p>
    </form>
  );
}
