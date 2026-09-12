"use client";

import { useState } from "react";
import {
  Calculator,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";

export default function FreelanceRateCalculator({ className = "" }) {
  // Mode: "monthly" vs "annual"
  const [mode, setMode] = useState("monthly");

  // Tax input type: default to "amount" ($) as requested
  const [taxType, setTaxType] = useState("amount");

  // Inputs initialized to empty string (no hardcoded defaults)
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [taxVal, setTaxVal] = useState("");
  const [billableHours, setBillableHours] = useState("");

  const [copied, setCopied] = useState(false);

  // Mode Switch Handler (Annual <-> Monthly)
  const handleModeChange = (newMode) => {
    if (newMode === mode) return;

    if (newMode === "monthly") {
      setIncome((prev) => (prev ? Math.round(Number(prev) / 12).toString() : ""));
      setExpenses((prev) => (prev ? Math.round(Number(prev) / 12).toString() : ""));
      setBillableHours((prev) => (prev ? Math.round(Number(prev) / 12).toString() : ""));
      if (taxType === "amount") {
        setTaxVal((prev) => (prev ? Math.round(Number(prev) / 12).toString() : ""));
      }
    } else {
      setIncome((prev) => (prev ? Math.round(Number(prev) * 12).toString() : ""));
      setExpenses((prev) => (prev ? Math.round(Number(prev) * 12).toString() : ""));
      setBillableHours((prev) => (prev ? Math.round(Number(prev) * 12).toString() : ""));
      if (taxType === "amount") {
        setTaxVal((prev) => (prev ? Math.round(Number(prev) * 12).toString() : ""));
      }
    }
    setMode(newMode);
  };

  // Tax Type Switch Handler (% <-> $)
  const handleTaxTypeChange = (newType) => {
    if (newType === taxType) return;
    setTaxType(newType);
    setTaxVal(""); // Clear value for fresh entry
  };

  // Reset all fields to blank
  const handleReset = () => {
    setMode("monthly");
    setTaxType("amount");
    setIncome("");
    setExpenses("");
    setTaxVal("");
    setBillableHours("");
  };

  // Numeric Input Values
  const numIncome = Number(income) || 0;
  const numExpenses = Number(expenses) || 0;
  const numTax = Number(taxVal) || 0;
  const numHours = Number(billableHours) || 0;

  // Formula Calculation based on Active Mode (Annual vs Monthly)
  let targetRevenuePeriod = 0;
  if (taxType === "percent") {
    const subtotal = numIncome + numExpenses;
    const taxMultiplier = numTax >= 100 ? 0.99 : numTax / 100;
    targetRevenuePeriod = Math.round(
      taxMultiplier > 0 ? subtotal / Math.max(0.05, 1 - taxMultiplier) : subtotal
    );
  } else {
    // Direct Dollar Amount Mode ($)
    targetRevenuePeriod = Math.round(numIncome + numExpenses + numTax);
  }

  const hasValidInputs = numIncome > 0 && numHours > 0;
  const hourlyRate = hasValidInputs ? Math.max(1, Math.round(targetRevenuePeriod / numHours)) : 0;
  const dayRate = Math.round(hourlyRate * 8);

  const annualTarget = mode === "monthly" ? Math.round(targetRevenuePeriod * 12) : targetRevenuePeriod;
  const monthlyRevenue = mode === "monthly" ? targetRevenuePeriod : Math.round(targetRevenuePeriod / 12);

  // Copy Result Summary
  const handleCopy = () => {
    if (!hasValidInputs) return;
    const summary = `Freelance Rate: $${hourlyRate}/hr ($${dayRate}/day) | Monthly Target: $${monthlyRevenue.toLocaleString()}/mo | Annual Target: $${annualTarget.toLocaleString()}/yr`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full font-inter ${className}`}>
      {/* Flexible Clean Card - Fits in Sidebar or Container */}
      <div className="w-full bg-bg-surface border border-brandborder rounded-3xl p-4 sm:p-4.5 xl:p-5 shadow-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-brandborder/60">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-brand/10 text-brand">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-brand font-heading leading-tight">
                Freelance Rate Calculator
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="p-1 rounded-lg text-text-muted hover:text-text-main hover:bg-bg-subtle transition cursor-pointer"
            title="Reset form"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mode Selector (Monthly vs Annual) */}
        <div className="grid grid-cols-2 p-0.5 bg-bg-subtle/70 rounded-xl border border-brandborder text-xs font-bold">
          <button
            type="button"
            onClick={() => handleModeChange("monthly")}
            className={`py-1.5 rounded-lg transition-all text-[11px] cursor-pointer ${
              mode === "monthly"
                ? "bg-brand text-white shadow-2xs"
                : "text-text-muted hover:text-text-main"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("annual")}
            className={`py-1.5 rounded-lg transition-all text-[11px] cursor-pointer ${
              mode === "annual"
                ? "bg-brand text-white shadow-2xs"
                : "text-text-muted hover:text-text-main"
            }`}
          >
            Annual
          </button>
        </div>

        {/* Form Inputs (Vertical Stack for Flexible Widths) */}
        <div className="space-y-3 text-xs">
          {/* Target Net Income (Required) */}
          <div>
            <label className="block font-bold text-text-main mb-1">
              Target Net Income ({mode === "monthly" ? "Monthly" : "Annual"}) <span className="text-brand">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-text-muted">
                $
              </span>
              <input
                type="number"
                min="0"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder={mode === "monthly" ? "e.g. 5,000" : "e.g. 60,000"}
                className="w-full pl-7 pr-3 py-1.5 rounded-xl border border-brandborder bg-bg-surface text-text-main font-semibold focus:outline-none focus:ring-2 focus:ring-brand/40 text-xs"
              />
            </div>
          </div>

          {/* Business Expenses (Optional) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-text-main">
                Expenses ({mode === "monthly" ? "Monthly" : "Annual"})
              </label>
              <span className="text-[10px] text-text-muted font-medium uppercase">
                Optional
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-text-muted">
                $
              </span>
              <input
                type="number"
                min="0"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                placeholder={mode === "monthly" ? "e.g. 400" : "e.g. 5,000"}
                className="w-full pl-7 pr-3 py-1.5 rounded-xl border border-brandborder bg-bg-surface text-text-main font-semibold focus:outline-none focus:ring-2 focus:ring-brand/40 text-xs"
              />
            </div>
          </div>

          {/* Tax & Savings Buffer (Optional) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-text-main truncate">
                Tax & Savings ({mode === "monthly" && taxType === "amount" ? "Monthly" : mode === "annual" && taxType === "amount" ? "Annual" : "%"})
              </label>
              {/* TOGGLE SELECTOR ($ vs %) */}
              <div className="inline-flex bg-bg-subtle p-0.5 rounded-lg border border-brandborder font-bold shrink-0">
                <button
                  type="button"
                  onClick={() => handleTaxTypeChange("amount")}
                  title="Dollar Amount ($)"
                  className={`px-1.5 py-0.5 rounded text-[10px] transition cursor-pointer ${
                    taxType === "amount"
                      ? "bg-brand text-white shadow-2xs"
                      : "text-text-muted hover:text-text-main"
                  }`}
                >
                  $
                </button>
                <button
                  type="button"
                  onClick={() => handleTaxTypeChange("percent")}
                  title="Percentage (%)"
                  className={`px-1.5 py-0.5 rounded text-[10px] transition cursor-pointer ${
                    taxType === "percent"
                      ? "bg-brand text-white shadow-2xs"
                      : "text-text-muted hover:text-text-main"
                  }`}
                >
                  %
                </button>
              </div>
            </div>

            <div className="relative">
              {taxType === "amount" && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-text-muted">
                  $
                </span>
              )}

              <input
                type="number"
                min="0"
                max={taxType === "percent" ? 50 : undefined}
                value={taxVal}
                onChange={(e) => setTaxVal(e.target.value)}
                placeholder={
                  taxType === "percent"
                    ? "e.g. 25"
                    : mode === "monthly"
                    ? "e.g. 500"
                    : "e.g. 6,000"
                }
                className={`w-full py-1.5 rounded-xl border border-brandborder bg-bg-surface text-text-main font-semibold focus:outline-none focus:ring-2 focus:ring-brand/40 text-xs ${
                  taxType === "amount" ? "pl-7 pr-3" : "pl-3 pr-7"
                }`}
              />

              {taxType === "percent" && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-text-muted">
                  %
                </span>
              )}
            </div>
          </div>

          {/* Billable Hours */}
          <div>
            <label className="block font-bold text-text-main mb-1 truncate">
              Billable Hours / {mode === "monthly" ? "Month" : "Year"} <span className="text-brand">*</span>
            </label>
            <input
              type="number"
              min="1"
              max={mode === "monthly" ? 400 : 4000}
              value={billableHours}
              onChange={(e) => setBillableHours(e.target.value)}
              placeholder={mode === "monthly" ? "e.g. 100" : "e.g. 1000"}
              className="w-full px-3 py-1.5 rounded-xl border border-brandborder bg-bg-surface text-text-main font-semibold focus:outline-none focus:ring-2 focus:ring-brand/40 text-xs"
            />
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className="bg-gradient-to-br from-brand/10 via-bg-subtle/50 to-brand/5 border border-brand/30 rounded-2xl p-3 text-center space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
            Calculated Hourly Rate
          </div>
          <div className="text-2xl sm:text-3xl font-black text-text-main font-heading tracking-tight">
            {hasValidInputs ? (
              <>
                ${hourlyRate}
                <span className="text-xs font-bold text-brand ml-1">/ hr</span>
              </>
            ) : (
              <span className="text-text-muted text-xl font-bold">$0 / hr</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-brandborder/60 text-xs">
            <div className="p-1.5 rounded-lg bg-bg-surface border border-brandborder text-center">
              <span className="text-text-muted text-[10px] block">Day Rate (8h)</span>
              <strong className="text-text-main font-extrabold text-xs">
                {hasValidInputs ? `$${dayRate.toLocaleString()}` : "$0"}
              </strong>
            </div>
            <div className="p-1.5 rounded-lg bg-bg-surface border border-brandborder text-center">
              <span className="text-text-muted text-[10px] block">Monthly Target</span>
              <strong className="text-brand font-extrabold text-xs">
                {hasValidInputs ? `$${monthlyRevenue.toLocaleString()}` : "$0"}
              </strong>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!hasValidInputs}
            className={`w-full mt-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs ${
              hasValidInputs
                ? "bg-brand hover:bg-brand-dark text-white cursor-pointer active:scale-95"
                : "bg-bg-subtle text-text-muted border border-brandborder cursor-not-allowed"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Copied Result</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Result</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
