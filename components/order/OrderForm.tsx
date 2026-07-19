"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";

type SampleFormat = "discovery" | "aromatic";
type SubmitStatus = "idle" | "submitting" | "success" | "error";
type Step = 1 | 2;

type FormState = {
  companyName: string;
  structureType: string;
  fullName: string;
  position: string;
  email: string;
  phone: string;
  sampleFormat: SampleFormat | null;
  origins: string[];
  annualVolume: string;
  requirements: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-md border border-[#d9c8b4] bg-[#fbeee0] px-4 py-3 font-apparel text-sm text-heading placeholder:text-body/50 outline-none ring-1 ring-transparent focus:ring-orange/60";

function createInitialForm(defaultVolume: string): FormState {
  return {
    companyName: "",
    structureType: "",
    fullName: "",
    position: "",
    email: "",
    phone: "",
    sampleFormat: null,
    origins: [],
    annualVolume: defaultVolume,
    requirements: "",
  };
}

export function OrderForm() {
  const t = useTranslations();
  const order = t.order;
  const { locale } = useLocale();

  const [form, setForm] = useState<FormState>(() =>
    createInitialForm(order.annualVolumeOptions[0]),
  );
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [formError, setFormError] = useState(false);

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleOrigin = (origin: string) => {
    setForm((prev) => ({
      ...prev,
      origins: prev.origins.includes(origin)
        ? prev.origins.filter((item) => item !== origin)
        : [...prev.origins, origin],
    }));
  };

  const isStep1Valid = () =>
    form.companyName.trim() &&
    form.fullName.trim() &&
    form.position.trim() &&
    EMAIL_PATTERN.test(form.email.trim()) &&
    form.phone.trim();

  const goToStep2 = () => {
    if (!isStep1Valid()) {
      setFormError(true);
      return;
    }
    setFormError(false);
    setStep(2);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.sampleFormat || form.origins.length === 0) {
      setFormError(true);
      return;
    }
    setFormError(false);
    setStatus("submitting");

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleNewRequest = () => {
    setForm(createInitialForm(order.annualVolumeOptions[0]));
    setStep(1);
    setStatus("idle");
    setFormError(false);
  };

  if (status === "success") {
    return (
      <div className="flex w-full max-w-3xl flex-col items-center gap-4 rounded-2xl bg-[#fbeee0]/50 p-10 text-center">
        <CheckCircle2 className="text-green" size={48} />
        <h2 className="font-lovelace text-xl font-bold text-heading">
          {order.successHeading}
        </h2>
        <p className="max-w-md font-apparel text-sm leading-snug text-body">
          {order.successMessage}
        </p>
        <button
          type="button"
          onClick={handleNewRequest}
          className="mt-4 cursor-pointer rounded-md bg-green px-6 py-3 font-lovelace text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          {order.newRequestButton}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-3xl flex-col gap-8 rounded-2xl bg-[#fbeee0]/50 p-6 homesection:p-10"
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-2">
          <span
            className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-orange" : "bg-orange/20"}`}
          />
          <span
            className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-orange" : "bg-orange/20"}`}
          />
        </div>
        <span className="whitespace-nowrap font-apparel text-xs uppercase tracking-wide text-body">
          {step === 1 ? order.step1Label : order.step2Label}
        </span>
      </div>

      {step === 1 && (
        <>
          <div className="flex flex-col gap-5">
            <h2 className="font-lovelace text-base font-bold text-green">
              {order.section1Title}
            </h2>
            <div className="grid grid-cols-1 gap-5 homesection:grid-cols-2">
              <label className="flex flex-col gap-2 font-apparel text-xs text-heading">
                <span>
                  {order.companyNameLabel}{" "}
                  <span className="text-orange">*</span>
                </span>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-2 font-apparel text-xs text-heading">
                {order.structureTypeLabel}
                <input
                  type="text"
                  value={form.structureType}
                  onChange={(e) => updateField("structureType", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="font-lovelace text-base font-bold text-green">
              {order.section2Title}
            </h2>
            <div className="grid grid-cols-1 gap-5 homesection:grid-cols-2">
              <label className="flex flex-col gap-2 font-apparel text-xs text-heading">
                <span>
                  {order.fullNameLabel} <span className="text-orange">*</span>
                </span>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-2 font-apparel text-xs text-heading">
                <span>
                  {order.positionLabel} <span className="text-orange">*</span>
                </span>
                <input
                  type="text"
                  value={form.position}
                  onChange={(e) => updateField("position", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-2 font-apparel text-xs text-heading">
                <span>
                {order.emailAddressLabel} <span className="text-orange">*</span></span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-2 font-apparel text-xs text-heading">
                <span>
                {order.phoneLabel} <span className="text-orange">*</span></span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
          </div>

          {formError && (
            <p className="font-apparel text-xs text-red-600">
              {order.requiredFieldsError}
            </p>
          )}

          <button
            type="button"
            onClick={goToStep2}
            className="w-full cursor-pointer rounded-md bg-green py-4 font-lovelace text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            {order.nextButton}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="flex flex-col gap-5">
            <h2 className="font-lovelace text-base font-bold text-green">
              {order.section3Title}{" "}
              <span className="text-orange">{order.section3Suffix}</span>
            </h2>

            <div className="grid grid-cols-1 gap-4 homesection:grid-cols-2">
              {[
                {
                  value: "discovery" as const,
                  title: order.formatDiscoveryTitle,
                  weight: order.formatDiscoveryWeight,
                  description: order.formatDiscoveryDescription,
                },
                {
                  value: "aromatic" as const,
                  title: order.formatAromaticTitle,
                  weight: order.formatAromaticWeight,
                  description: order.formatAromaticDescription,
                },
              ].map((option) => {
                const isSelected = form.sampleFormat === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField("sampleFormat", option.value)}
                    className={`flex cursor-pointer flex-col gap-1 rounded-lg p-4 text-left transition-colors ${
                      isSelected
                        ? "bg-white ring-2 ring-orange"
                        : "bg-white/60 ring-1 ring-transparent hover:bg-white"
                    }`}
                  >
                    <span className="font-apparel text-sm font-bold text-heading">
                      {option.title}{" "}
                      <span className="font-normal text-orange">
                        {option.weight}
                      </span>
                    </span>
                    <span className="font-apparel text-xs leading-snug text-body">
                      {option.description}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-lovelace text-sm font-bold text-green">
                {order.originLabel}
              </span>
              <div className="grid grid-cols-1 gap-3 homesection:grid-cols-3">
                {order.originOptions.map((origin) => {
                  const isChecked = form.origins.includes(origin);
                  return (
                    <label
                      key={origin}
                      className={`flex cursor-pointer items-center gap-2 rounded-md p-3 font-apparel text-xs text-heading transition-colors ${
                        isChecked
                          ? "bg-white ring-1 ring-orange/60"
                          : "bg-white/60 hover:bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleOrigin(origin)}
                        className="h-3.5 w-3.5 accent-orange"
                      />
                      {origin}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="font-lovelace text-base font-bold text-green">
              {order.section4Title}
            </h2>
            <label className="flex flex-col gap-2 font-apparel text-xs text-heading">
              {order.annualVolumeLabel}
              <select
                value={form.annualVolume}
                onChange={(e) => updateField("annualVolume", e.target.value)}
                className={inputClass}
              >
                {order.annualVolumeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 font-apparel text-xs text-heading">
              {order.requirementsLabel}
              <textarea
                rows={3}
                value={form.requirements}
                onChange={(e) => updateField("requirements", e.target.value)}
                placeholder={order.requirementsPlaceholder}
                className={`${inputClass} resize-none`}
              />
            </label>
          </div>

          {formError && (
            <p className="font-apparel text-xs text-red-600">
              {order.requiredFieldsError}
            </p>
          )}
          {status === "error" && (
            <p className="font-apparel text-xs text-red-600">
              {order.errorMessage}
            </p>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="cursor-pointer rounded-md border border-heading/20 px-6 py-4 font-lovelace text-sm font-bold text-heading transition-colors hover:border-heading/40"
            >
              {order.backButton}
            </button>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex-1 cursor-pointer rounded-md bg-green py-4 font-lovelace text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting"
                ? order.submittingButton
                : order.submitButton}
            </button>
          </div>

          <div className="flex items-start gap-3 border-t border-heading/10 pt-5">
            <span aria-hidden="true" className="text-orange">
              🔒
            </span>
            <p className="font-apparel text-xs leading-snug text-body">
              <span className="font-bold text-orange">
                {order.guaranteeLabel}
              </span>{" "}
              {order.guaranteeText}
            </p>
          </div>
        </>
      )}
    </form>
  );
}
