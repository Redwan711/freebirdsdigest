"use client";

import { useState } from "react";
import Image from "next/image";
import {
  QUIZ_QUESTIONS,
  calculateRecommendation,
} from "@/data/vpn-quiz-data";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Award,
  Star,
  CheckCircle2,
} from "lucide-react";

export default function VpnFinderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    q1: [], // Multi-select array
    q2: "", // Single-select string
    q3: "", // Single-select string
    q4: [], // Multi-select array
    q5: "", // Single-select string
  });
  const [recommendationResult, setRecommendationResult] = useState(null);

  const currentQuestion = QUIZ_QUESTIONS[currentStep];
  const isLastQuestion = currentStep === QUIZ_QUESTIONS.length - 1;
  const isResultsPage = currentStep >= QUIZ_QUESTIONS.length;

  // Toggle multi-select checkmark option
  const toggleMultiSelectOption = (questionId, optionId) => {
    setAnswers((prev) => {
      const currentList = prev[questionId] || [];
      const updatedList = currentList.includes(optionId)
        ? currentList.filter((id) => id !== optionId)
        : [...currentList, optionId];
      return { ...prev, [questionId]: updatedList };
    });
  };

  // Select single radio option
  const selectSingleOption = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  // Check if current question has at least 1 selection
  const canProceed = () => {
    if (!currentQuestion) return false;
    const currentAnswer = answers[currentQuestion.id];
    if (currentQuestion.multiSelect) {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }
    return Boolean(currentAnswer);
  };

  const handleNext = () => {
    if (!canProceed()) return;

    if (isLastQuestion) {
      const result = calculateRecommendation(answers);
      setRecommendationResult(result);
      setCurrentStep(QUIZ_QUESTIONS.length);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({
      q1: [],
      q2: "",
      q3: "",
      q4: [],
      q5: "",
    });
    setRecommendationResult(null);
    setCurrentStep(0);
  };

  const progressPercent = Math.round(
    ((currentStep + 1) / QUIZ_QUESTIONS.length) * 100
  );

  return (
    <main className="min-h-screen bg-bg-base text-text-main py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-3xl mx-auto">
        {/* Header Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Recommendation Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight mb-3 font-heading">
            Find Your Best VPN Match
          </h1>
          <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto">
            Answer a few quick questions about your streaming, privacy, and device requirements to get a personalized VPN recommendation.
          </p>
        </div>

        {/* Wizard View */}
        {!isResultsPage && currentQuestion && (
          <div className="bg-bg-surface backdrop-blur border border-brandborder rounded-3xl p-6 sm:p-8 shadow-xl">
            {/* Progress Bar Header */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-medium text-text-muted mb-2">
                <span>
                  Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span>{progressPercent}% Complete</span>
              </div>
              <div className="w-full h-2 bg-bg-subtle rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand to-brand-dark transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Title */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-text-main mb-1 font-heading">
                {currentQuestion.title}
              </h2>
              <p className="text-text-muted text-sm">
                {currentQuestion.subtitle}
                {currentQuestion.multiSelect && (
                  <span className="text-brand ml-1 font-semibold">
                    (Select all that apply)
                  </span>
                )}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option) => {
                const isMulti = currentQuestion.multiSelect;
                const currentAnswer = answers[currentQuestion.id];
                const isSelected = isMulti
                  ? Array.isArray(currentAnswer) && currentAnswer.includes(option.id)
                  : currentAnswer === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      isMulti
                        ? toggleMultiSelectOption(currentQuestion.id, option.id)
                        : selectSingleOption(currentQuestion.id, option.id)
                    }
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                      isSelected
                        ? "bg-brand/10 border-brand text-text-main ring-1 ring-brand/40 shadow-sm shadow-brand/10"
                        : "bg-bg-subtle/50 border-brandborder hover:border-brand/40 hover:bg-bg-subtle text-text-main"
                    }`}
                  >
                    {/* Icon Container */}
                    <div className="text-2xl pt-0.5 shrink-0">{option.icon}</div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm sm:text-base font-bold text-text-main mb-0.5">
                        {option.label}
                      </div>
                      <div className="text-xs sm:text-sm text-text-muted">
                        {option.description}
                      </div>
                    </div>

                    {/* Radio / Checkbox Indicator */}
                    <div className="pt-1 shrink-0">
                      {isMulti ? (
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-brand border-brand text-white"
                              : "border-brandborder bg-bg-surface"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      ) : (
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-brand bg-brand/20"
                              : "border-brandborder bg-bg-surface"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-brand" />
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-brandborder">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${
                  currentStep === 0
                    ? "opacity-0 cursor-default"
                    : "text-text-muted hover:text-text-main hover:bg-bg-subtle"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  canProceed()
                    ? "bg-brand hover:bg-brand-dark text-white shadow-lg shadow-brand/20 active:scale-95 cursor-pointer"
                    : "bg-bg-subtle text-text-muted cursor-not-allowed border border-brandborder"
                }`}
              >
                <span>{isLastQuestion ? "See My Recommendation" : "Next Question"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Results View */}
        {isResultsPage && recommendationResult && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Action Bar */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-text-main flex items-center gap-2 font-heading">
                <Award className="w-6 h-6 text-brand" />
                <span>Your Top VPN Matches</span>
              </h2>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-bg-subtle text-text-main hover:bg-bg-subtle/80 text-xs font-semibold border border-brandborder transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>

            {/* #1 BEST MATCH CARD */}
            <div className="relative bg-bg-surface border-2 border-brand rounded-3xl p-6 sm:p-8 shadow-xl shadow-brand/10">
              {/* Ribbon Badge */}
              <div className="absolute -top-3.5 left-6 bg-brand text-white px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <Star className="w-3.5 h-3.5 fill-white" />
                <span>🏆 #1 Best Match ({recommendationResult.topMatch.matchPercentage}%)</span>
              </div>

              {/* Provider Main Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2 pb-6 border-b border-brandborder">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 relative bg-white p-3 rounded-2xl shrink-0 flex items-center justify-center border border-slate-200 shadow-sm">
                    <Image
                      src={recommendationResult.topMatch.logo}
                      alt={recommendationResult.topMatch.name}
                      width={70}
                      height={70}
                      className="object-contain max-h-14"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-text-main font-heading">
                      {recommendationResult.topMatch.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2.5 py-0.5 rounded-md bg-brand/10 border border-brand/20 text-brand text-xs font-bold">
                        {recommendationResult.topMatch.badge}
                      </span>
                      <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
                        ★ {recommendationResult.topMatch.rating} Rating
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="w-full sm:w-auto text-left sm:text-right shrink-0">
                  <div className="text-2xl font-black text-text-main font-heading">
                    {recommendationResult.topMatch.price}
                  </div>
                  <div className="text-xs text-text-muted mb-3">
                    {recommendationResult.topMatch.billingInfo}
                  </div>
                  <a
                    href={recommendationResult.topMatch.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-brand hover:bg-brand-dark text-white font-bold text-sm transition shadow-lg shadow-brand/25"
                  >
                    <span>Get {recommendationResult.topMatch.name}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* WHY THIS MATCHES YOU SECTION */}
              <div className="mt-6">
                <h4 className="text-sm font-bold text-brand uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Why This Is Best For You:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recommendationResult.topMatch.reasons.map((reason, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-brand/5 border border-brand/15 text-xs sm:text-sm text-text-main flex items-start gap-2.5"
                    >
                      <Check className="w-4 h-4 text-brand shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features List */}
              <div className="mt-6 pt-6 border-t border-brandborder">
                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
                  Included Features & Highlights:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-main">
                  {recommendationResult.topMatch.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* #2 RUNNER UP CARD */}
            {recommendationResult.runnerUp && (
              <div className="bg-bg-surface border border-brandborder rounded-3xl p-6 shadow-md">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 relative bg-white p-2 rounded-xl shrink-0 flex items-center justify-center border border-slate-200">
                      <Image
                        src={recommendationResult.runnerUp.logo}
                        alt={recommendationResult.runnerUp.name}
                        width={50}
                        height={50}
                        className="object-contain max-h-10"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-text-muted">
                          🥈 Runner-Up ({recommendationResult.runnerUp.matchPercentage}% Match)
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-text-main font-heading">
                        {recommendationResult.runnerUp.name}
                      </h4>
                      <div className="text-xs text-text-muted">
                        {recommendationResult.runnerUp.badge} • {recommendationResult.runnerUp.price}
                      </div>
                    </div>
                  </div>

                  <a
                    href={recommendationResult.runnerUp.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-subtle hover:bg-bg-subtle/80 text-text-main text-xs font-bold border border-brandborder transition"
                  >
                    <span>View {recommendationResult.runnerUp.name}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
