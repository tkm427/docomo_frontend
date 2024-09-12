"use client";
import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import LoadingScreen from "../../../components/LoadingScreen";
import MatchingResultPage from "../../../components/MatchingResultPage";
import { useRouter, useParams } from "next/navigation";
import { getZoomUrl } from "../../../api/request";

export default function Page({ params }: { params: { id: string } }) {
  // Progress barの現在のステップ
  const router = useRouter();
  const [progress, setProgress] = useState(20); // プログレスバーの値 (20%から始まる)
  const [step, setStep] = useState(1); // 現在のステップ (1から5まで)
  const [isLoading, setIsLoading] = useState(true);
  const [zoomUrl, setZoomUrl] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);
  const sessionId = params.id;
  useEffect(() => {
    const getUrl = async () => {
      try {
        console.log(sessionId);
        const response = await getZoomUrl(sessionId);
        if (response.zoomUrl != "") {
          console.log(response);
          setZoomUrl(response.zoomUrl);
          setTheme(response.theme);
          setUsers(response.userName);
          clearInterval(intervalId);
          setIsLoading(false);
        } else if (response.userName.length > step) {
          setStep(response.userName.length);
          setProgress(response.userName.length * 20);
        }
      } catch (error) {
        console.error("Error fetching Zoom URL:", error);
      }
    };
    // 初回実行
    getUrl();
    // 5秒ごとに実行
    const intervalId = setInterval(getUrl, 5000);
    // クリーンアップ関数
    return () => clearInterval(intervalId);
  }, [sessionId]);

  return (
    <div>
      <Header />
      {isLoading ? (
        <LoadingScreen step={step} />
      ) : (
        <MatchingResultPage
          sessionId={sessionId}
          userName={users}
          theme={theme}
          zoomUrl={zoomUrl}
        />
      )}
    </div>
  );
}
