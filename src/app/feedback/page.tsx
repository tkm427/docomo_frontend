"use client";

import React, { useEffect, useState } from 'react';
import FeedbackPage from '../../components/FeedbackPage';
import { getFeedback } from '../../api/request';

const Feedback: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = '695e087c-3ead-4b64-8747-679647a5be0d'; // 仮のユーザーID

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await getFeedback(userId);
        setFeedbackData(data);
        setLoading(false);
      } catch (err) {
        setError('フィードバックの取得に失敗しました');
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <FeedbackPage feedbackData={feedbackData} />;
};

export default Feedback;