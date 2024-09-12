'use client';
import Loading from "../../components/Loading";
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Box, Button } from "@mui/material";

type MatchingData = {
    name: string[];
    zoomLink: string;
    thema: string;
};

const matchingData: MatchingData[] = [
    {
        name: ['かずき', 'せりな', 'たくま', 'じゅん', 'ゆうすけ'],
        zoomLink: 'https://zoom.us/j/1234567890',
        thema: '幸せの定義とは？',
    },
];

export default function Page() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);
    
    return (
        <div>
            <Header />
            {isLoading && 
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold">マッチング中...</h1>
                    <Loading />
                </div>
            }
            {!isLoading && (
                <div className="flex flex-col items-center justify-center h-screen px-4">
                    <h1 className="text-3xl font-bold text-red-500 bg-white py-2 px-4 rounded shadow-lg">
                        マッチングしました！
                    </h1>
                    <div className="mt-8 w-full max-w-md">
                        {matchingData.map((data, index) => (
                            <div key={index} className="border p-4 mb-4 rounded-lg shadow">
                                <h2 className="text-xl font-bold mb-4">お題: 「{data.thema}」</h2>
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold">メンバー</h3>
                                    <ul className="list-disc list-inside mt-2">
                                        {data.name.map((name, index) => (
                                            <li key={index} className="text-gray-700">{name}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-4 text-left">
                                    <p className="text-gray-600">Zoomリンク: <a href={data.zoomLink} className="text-blue-500 underline">{data.zoomLink}</a></p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#F00033',
                            color: 'white',
                            padding: '10px 20px',
                            marginTop: '20px',
                            fontSize: '16px',
                            borderRadius: '5px',
                        }}
                        onClick={() => window.location.href = matchingData[0].zoomLink}
                    >
                        参加する
                    </Button>
                </div>
            )}
        </div>
    );
}
