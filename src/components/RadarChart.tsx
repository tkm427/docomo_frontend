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
  // デフォルトオプションにフォントの太字設定と1刻みの設定を追加
  const defaultOptions = {
    plugins: {
      legend: {
        display: false, // ラベル（凡例）を非表示にする
      },
    },
    scales: {
      r: {
        suggestedMin: 0, // 最小値を0に設定
        suggestedMax: 5, // 最大値を5に設定
        ticks: {
          stepSize: 1, // 1刻みでメモリを表示
        },
        pointLabels: {
          font: {
            size: 16, // フォントサイズを指定
            weight: '700', // 700 は太字に対応するウェイト
            family: 'Arial, sans-serif', // フォントファミリーを明示的に指定
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '30vw', height: '100%', margin: '0 auto' }}>
      <Radar data={data} options={{ ...defaultOptions, ...options }} />
    </div>
  );
};

export default RadarChart;
