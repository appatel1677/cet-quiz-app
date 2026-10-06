'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { kasoti1Data } from '@/data/kasoti1';
import { kasoti2Data } from '@/data/kasoti2';
import { kasoti3Data } from '@/data/kasoti3';
import { kasoti4Data } from '@/data/kasoti4';
import { kasoti5Data } from '@/data/kasoti5';
import { kasoti6Data } from '@/data/kasoti6';
import { kasoti7Data } from '@/data/kasoti7';

const kasotiMap = {
    '1': { title: 'અનુભવ કસોટી - ૧', data: kasoti1Data },
    '2': { title: 'અનુભવ કસોટી - ૨', data: kasoti2Data },
    '3': { title: 'અનુભવ કસોટી - ૩', data: kasoti3Data },
    '4': { title: 'અનુભવ કસોટી - ૪', data: kasoti4Data },
    '5': { title: 'અનુભવ કસોટી - ૫', data: kasoti5Data },
    '6': { title: 'અનુભવ કસોટી - ૬', data: kasoti6Data },
    '7': { title: 'અનુભવ કસોટી - ૭', data: kasoti7Data },
};

// વિકલ્પોના લેબલ કલર
const optionBadgeColors = [
    "bg-indigo-500 text-white",
    "bg-amber-500 text-white",
    "bg-emerald-500 text-white",
    "bg-rose-500 text-white"
];

export default function QuizPage() {
    const params = useParams();
    const quizId = params.id;
    const currentQuiz = kasotiMap[quizId];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    if (!currentQuiz || !currentQuiz.data || currentQuiz.data.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
                    <h1 className="text-2xl font-bold text-rose-600 mb-4">⚠️ કસોટી મળી નથી!</h1>
                    <Link
                        href="/"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition duration-200 inline-block"
                    >
                        🏠 મુખ્ય પૃષ્ઠ (Home) પર જાઓ
                    </Link>
                </div>
            </div>
        );
    }

    const questions = currentQuiz.data;
    const currentQuestion = questions[currentIndex];
    const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

    const handleOptionSelect = (index) => {
        if (selectedOption !== null) return;
        setSelectedOption(index);
        if (index === currentQuestion.answer) {
            setScore((prev) => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        setSelectedOption(null);
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setSelectedOption(null);
        setScore(0);
        setShowResult(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-6 px-3 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
            <div className="max-w-2xl w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border-4 border-white/40 p-5 sm:p-8">

                {/* નેવિગેશન બાર */}
                <div className="flex items-center justify-between gap-3 border-b-2 border-slate-100 pb-4 mb-5">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-bold py-2 px-4 rounded-2xl shadow-md transform hover:scale-105 transition duration-200"
                    >
                        🏠 હોમ (Home)
                    </Link>
                    <span className="text-lg sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        {currentQuiz.title}
                    </span>
                </div>

                {/* પ્રોગ્રેસ બાર */}
                {!showResult && (
                    <div className="mb-5">
                        <div className="w-full bg-slate-100 rounded-full h-3.5 p-0.5 border border-slate-200">
                            <div
                                className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* પરિણામ સ્ક્રીન */}
                {showResult ? (
                    <div className="text-center py-8">
                        <div className="text-6xl mb-4">🏆</div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">અભિનંદન! કસોટી પૂર્ણ થઈ!</h2>
                        <p className="text-lg text-slate-600 mb-6">તમે ખૂબ સરસ પ્રયત્ન કર્યો!</p>

                        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-6 mb-8 max-w-sm mx-auto shadow-inner">
                            <span className="text-sm font-bold text-indigo-500 uppercase tracking-wider">તમારો કુલ સ્કોર</span>
                            <div className="text-5xl font-black text-indigo-600 my-2">
                                {score} <span className="text-2xl text-slate-400 font-bold">/ {questions.length}</span>
                            </div>
                            <p className="text-xs font-semibold text-indigo-400">
                                સફળતાનો દર: {Math.round((score / questions.length) * 100)}%
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={handleRestart}
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold py-3.5 px-8 rounded-2xl shadow-lg transform hover:-translate-y-0.5 transition duration-200"
                            >
                                🔄 ફરીથી શરૂ કરો
                            </button>
                            <Link
                                href="/"
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold py-3.5 px-8 rounded-2xl shadow-lg transform hover:-translate-y-0.5 transition duration-200 text-center"
                            >
                                🏡 મુખ્ય પૃષ્ઠ પર જાઓ
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* પ્રશ્ન સ્ક્રીન */
                    <div>
                        {/* સ્કોર અને પ્રશ્ન બૅજ */}
                        <div className="flex justify-between items-center mb-5 gap-2">
                            <span className="bg-indigo-100 text-indigo-800 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-2xl border border-indigo-200 flex items-center gap-1">
                                📌 પ્રશ્ન: {currentIndex + 1} / {questions.length}
                            </span>
                            <span className="bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-2xl border border-emerald-200 flex items-center gap-1">
                                ⭐ સાચા જવાબ: {score}
                            </span>
                        </div>

                        {/* પ્રશ્ન બોક્સ */}
                        <div className="bg-gradient-to-r from-slate-50 to-indigo-50/50 p-4 sm:p-5 rounded-2xl border-2 border-indigo-100 mb-6 shadow-sm">
                            <h2 className="text-base sm:text-lg font-extrabold text-slate-800 leading-relaxed">
                                {currentQuestion.question}
                            </h2>
                        </div>

                        {/* વિકલ્પો (Options) */}
                        <div className="space-y-3 mb-6">
                            {currentQuestion.options.map((option, idx) => {
                                let cardStyle = "bg-white hover:bg-indigo-50/50 border-slate-200 text-slate-800 shadow-sm hover:border-indigo-300";
                                let badgeStyle = optionBadgeColors[idx % 4];

                                if (selectedOption !== null) {
                                    if (idx === currentQuestion.answer) {
                                        cardStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-md ring-2 ring-emerald-400";
                                        badgeStyle = "bg-emerald-600 text-white";
                                    } else if (idx === selectedOption) {
                                        cardStyle = "bg-rose-50 border-rose-500 text-rose-900 font-bold shadow-md ring-2 ring-rose-400";
                                        badgeStyle = "bg-rose-600 text-white";
                                    } else {
                                        cardStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
                                    }
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionSelect(idx)}
                                        disabled={selectedOption !== null}
                                        className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3 ${cardStyle}`}
                                    >
                                        <span className={`text-xs font-black px-2.5 py-1 rounded-xl shadow-sm shrink-0 ${badgeStyle}`}>
                                            {String.fromCharCode(65 + idx)}
                                        </span>
                                        <span className="text-sm sm:text-base font-semibold leading-snug">
                                            {option.replace(/^\([A-D]\)\s*/, '')}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* સાચો / ખોટો જવાબ મેસેજ પટ્ટી */}
                        {selectedOption !== null && (
                            <div
                                className={`p-4 rounded-2xl mb-6 text-center font-bold text-sm sm:text-base animate-bounce-short shadow-md ${selectedOption === currentQuestion.answer
                                    ? "bg-emerald-500 text-white border-2 border-emerald-600"
                                    : "bg-rose-500 text-white border-2 border-rose-600"
                                    }`}
                            >
                                {selectedOption === currentQuestion.answer ? (
                                    <span>🎉 શાબાશ! એકદમ સાચો જવાબ! 🌟</span>
                                ) : (
                                    <span>
                                        ❌ તમારો જવાબ ખોટો છે! <br />
                                        <span className="text-xs sm:text-sm font-normal underline">
                                            સાચો જવાબ છે: <strong>{currentQuestion.options[currentQuestion.answer]}</strong>
                                        </span>
                                    </span>
                                )}
                            </div>
                        )}

                        {/* આગળનો પ્રશ્ન બટન */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleNextQuestion}
                                disabled={selectedOption === null}
                                className={`py-3.5 px-8 rounded-2xl font-black text-sm sm:text-base shadow-xl transform transition duration-200 flex items-center gap-2 ${selectedOption !== null
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:scale-105 cursor-pointer"
                                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                                    }`}
                            >
                                {currentIndex + 1 === questions.length ? "પરિણામ જુઓ 🎯" : "આગળનો પ્રશ્ન ➔"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}