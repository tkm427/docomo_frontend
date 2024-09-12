import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Chart.jsの設定
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// レーダーチャートのコンポーネント
type RadarChartProps = {
  data: any;
  options?: any;
};

const RadarChart: React.FC<RadarChartProps> = ({ data, options }) => {
  // クライアントサイドレンダリングのためのフラグ
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // クライアントサイドでのみ設定
    setIsClient(true);
  }, []);

  // クライアントサイドでのみレンダリング
  if (!isClient) {
    return null; // サーバーサイドで何も表示しない
  }

  // デフォルトオプションに legend 非表示の設定を追加
  const defaultOptions = {
    plugins: {
      legend: {
        display: false, // ラベル（凡例）を非表示にする
      },
    },
    scales: {
      r: {
        beginAtZero: true, // スケールをゼロから始める
        ticks: {
          stepSize: 1, // 目盛りの間隔を設定
        },
        grid: {
          circular: true, // 円形のグリッドに変更
        },
      },
    },
    maintainAspectRatio: false, // アスペクト比を維持しない
  };

  return (
    <div style={{ width: '300px', height: '300px', margin: '0 auto' }}> {/* サイズを固定 */}
      <Radar data={data} options={{ ...defaultOptions, ...options }} />
    </div>
  );
};

export default RadarChart;
