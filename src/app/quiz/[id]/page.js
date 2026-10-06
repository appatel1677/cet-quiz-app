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

// કસોટી નામમાંથી 'મહેસાણા' હટાવીને માત્ર 'અનુભવ કસોટી - X' રાખેલ છે
const kasotiMap = {
    '1': { title: 'અનુભવ કસોટી - ૧', data: kasoti1Data },
    '2': { title: 'અનુભવ કસોટી - ૨', data: kasoti2Data },
    '3': { title: 'અનુભવ કસોટી - ૩', data: kasoti3Data },
    '4': { title: 'અનુભવ કસોટી - ૪', data: kasoti4Data },
    '5': { title: 'અનુભવ કસોટી - ૫', data: kasoti5Data },
    '6': { title: 'અનુભવ કસોટી - ૬', data: kasoti6Data },
    '7': { title: 'અનુભવ કસોટી - ૭', data: kasoti7Data },
};

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
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-red-600 mb-4">કસોટી મળી નથી અથવા ખાલી છે!</h1>
                <Link
                    href="/"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-200"
                >
                    મુખ્ય પૃષ્ઠ (Home) પર પાછા જાઓ
                </Link>
            </div>
        );
    }

    const questions = currentQuiz.data;
    const currentQuestion = questions[currentIndex];

    const handleOptionSelect = (index) => {
        if (selectedOption !== null) return; // એકવાર સિલેક્ટ કર્યા પછી બદલી શકાશે નહીં
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
        <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8">

                {/* ટોપ બાર: હોમ બટન અને શીર્ષક */}
                <div className="flex items-center justify-between border-b pb-4 mb-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow transition duration-200"
                    >
                        🏠 મુખ્ય પૃષ્ઠ (Home)
                    </Link>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 text-right">
                        {currentQuiz.title}
                    </h1>
                </div>

                {/* ક્વિઝ પરિણામ સ્ક્રીન */}
                {showResult ? (
                    <div className="text-center py-8">
                        <h2 className="text-3xl font-extrabold text-slate-800 mb-4">કસોટી પૂર્ણ થઈ! 🎉</h2>
                        <p className="text-xl text-slate-700 mb-6">
                            તમારો કુલ સ્કોર: <span className="font-bold text-blue-600">{score}</span> / {questions.length}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={handleRestart}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow transition duration-200"
                            >
                                ફરીથી શરૂ કરો
                            </button>
                            <Link
                                href="/"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow transition duration-200"
                            >
                                મુખ્ય પૃષ્ઠ (Home) પર જાઓ
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* પ્રશ્ન સ્ક્રીન */
                    <div>
                        {/* પ્રશ્ન ક્રમાંક અને સ્કોર પટ્ટી */}
                        <div className="flex justify-between items-center mb-6 text-sm font-semibold text-slate-600">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                પ્રશ્ન: {currentIndex + 1} / {questions.length}
                            </span>
                            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                                સાચા જવાબ: {score}
                            </span>
                        </div>

                        {/* પ્રશ્ન */}
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 leading-relaxed">
                            {currentQuestion.question}
                        </h2>

                        {/* વિકલ્પો */}
                        <div className="space-y-3 mb-6">
                            {currentQuestion.options.map((option, idx) => {
                                let btnStyle = "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200";

                                if (selectedOption !== null) {
                                    if (idx === currentQuestion.answer) {
                                        btnStyle = "bg-emerald-500 text-white border-emerald-600 font-semibold";
                                    } else if (idx === selectedOption) {
                                        btnStyle = "bg-rose-500 text-white border-rose-600 font-semibold";
                                    } else {
                                        btnStyle = "bg-slate-50 text-slate-400 border-slate-200 opacity-60";
                                    }
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionSelect(idx)}
                                        disabled={selectedOption !== null}
                                        className={`w-full text-left p-4 rounded-xl border-2 transition duration-200 text-base ${btnStyle}`}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>

                        {/* સાચો / ખોટો જવાબ મેસેજ બોર્ડ */}
                        {selectedOption !== null && (
                            <div
                                className={`p-4 rounded-xl mb-6 text-center font-bold text-base transition-all ${selectedOption === currentQuestion.answer
                                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                    : "bg-rose-100 text-rose-800 border border-rose-300"
                                    }`}
                            >
                                {selectedOption === currentQuestion.answer ? (
                                    <span>✅ એકદમ સાચો જવાબ!</span>
                                ) : (
                                    <span>❌ તમારો જવાબ ખોટો છે! સાચો જવાબ: <strong>{currentQuestion.options[currentQuestion.answer]}</strong></span>
                                )}
                            </div>
                        )}

                        {/* આગળનો પ્રશ્ન બટન */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleNextQuestion}
                                disabled={selectedOption === null}
                                className={`py-3 px-8 rounded-xl font-bold text-white shadow-md transition duration-200 ${selectedOption !== null
                                    ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                    : "bg-slate-300 cursor-not-allowed"
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