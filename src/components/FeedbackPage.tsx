"use client";

import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const feedbackData = [
  { label: '積極性', value: 3 },
  { label: '論理的思考', value: 4 },
  { label: 'リーダーシップ', value: 2 },
  { label: '協調性', value: 5 },
  { label: '発言力', value: 3 },
  { label: 'チームメンバーへの気配り', value: 4 },
];

const radarData = {
  labels: feedbackData.map((item) => item.label),
  datasets: [
    {
      label: 'フィードバック',
      data: feedbackData.map((item) => item.value),
      backgroundColor: 'rgba(34, 202, 236, 0.2)',
      borderColor: 'rgba(34, 202, 236, 1)',
      borderWidth: 2,
    },
  ],
};

const radarOptions = {
  scales: {
    r: {
      suggestedMin: 0,
      suggestedMax: 5,
    },
  },
};

const FeedbackPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>フィードバック</h1>
      <h2 style={styles.subtitle}>直近のフィードバック</h2>
      <div style={styles.chartContainer}>
        <Radar data={radarData} options={radarOptions} />
      </div>
      <ul style={styles.feedbackList}>
        {feedbackData.map((item) => (
          <li key={item.label} style={styles.feedbackItem}>
            <strong>{item.label}</strong>: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center' as 'center',
    marginBottom: '30px',
  },
  subtitle: {
    fontSize: '20px',
    marginBottom: '20px',
  },
  chartContainer: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto 40px',
  },
  feedbackList: {
    listStyleType: 'none' as 'none',
    paddingLeft: 0,
  },
  feedbackItem: {
    fontSize: '18px',
    marginBottom: '10px',
  },
};

export default FeedbackPage;
