"use client";

import React, { useEffect, useState } from 'react';
import FeedbackPage from '../../components/FeedbackPage';
import { getFeedback } from '../../api/request';

interface Feedback {
  proactivity: number;
  logicality: number;
  leadership: number;
  cooperation: number;
  expression: number;
  consideration: number;
  comment: string;
  session_id: string;
  user_id: string;
  id: string;
}

interface FeedbackPageProps {
  feedbackData: { [date: string]: Feedback[] }; // 日付ごとのフィードバックの配列
}

const Feedback: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState<{ [date: string]: Feedback[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState('');
  // const userId = '695e087c-3ead-4b64-8747-679647a5be0d';

  useEffect(() => {

    const storedUserId = localStorage.getItem('userId'); // ログイン中の自分のID

    if (storedUserId) {
      setUserId(storedUserId); // 自分のユーザーID
    } else {
      setUserId("695e087c-3ead-4b64-8747-679647a5be0d");
    }
    const fetchFeedback = async () => {
      try {
        const data = await getFeedback(userId);
        console.log(data);
        setFeedbackData(data);
        setLoading(false);
      } catch (err) {
        setError('フィードバックの取得に失敗しました');
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <FeedbackPage feedbackData={feedbackData} />;
};

export default Feedback;