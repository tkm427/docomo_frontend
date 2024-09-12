'use client'
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import LoadingScreen from '../../components/LoadingScreen';
import MatchingResultPage from '../../components/MatchingResultPage';

export default function Page() {
  // Progress barの現在のステップ
  const [progress, setProgress] = useState(20); // プログレスバーの値 (20%から始まる)
  const [step, setStep] = useState(1); // 現在のステップ (1から5まで)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setIsLoading(false);
          return 100;
        }
        return prevProgress + 20; // 20%ずつ増加
      });

      setStep((prevStep) => {
        if (prevStep >= 5) {
          return 5; // ステップが5を超えたら固定
        }
        return prevStep + 1;
      });
    }, 1000); // 1秒ごとに進行

    return () => {
      clearInterval(timer); // コンポーネントがアンマウントされたらタイマーをクリア
    };
  }, []);

  return (
    <div>
      <Header />
      {isLoading ? <LoadingScreen step={step} /> : <MatchingResultPage />}
    </div>
  );
}
