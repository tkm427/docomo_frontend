import React from 'react';
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
  // デフォルトオプションに legend 非表示の設定を追加
  const defaultOptions = {
    plugins: {
      legend: {
        display: false, // ラベル（凡例）を非表示にする
      },
    },
    layout: {
      padding: 20,  // チャート内のパディングを調整
    },
    scales: {
      r: {
        pointLabels: {
          font: {
            size: 12, // フォントサイズを少し小さくすることで表示を調整
          },
          padding: 15, // ラベルとチャートの間のパディングを増やす
        },
      },
    },
  };

  return (
    <div style={{ width: '25vw', height: '25vw', margin: '0 auto' }}> {/* サイズを少し広げる */}
      <Radar data={data} options={{ ...defaultOptions, ...options }} />
    </div>
  );
};

export default RadarChart;
