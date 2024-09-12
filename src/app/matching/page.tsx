'use client'
import Loading from "../../components/Loading";
import React from 'react';
import { useEffect, useState } from 'react';

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
            {isLoading && 
                <div>
                    <h1 className="text-3xl font-bold">マッチング中...</h1>
                    <Loading />
                </div>
                }
            {!isLoading && (
                <div>
                    <h1 className="text-3xl font-bold">マッチングしました！</h1>
                    <div className="mt-8">
                        {matchingData.map((data, index) => (
                            <div key={index} className="border p-4 mb-4">
                                <h2 className="text-xl font-bold">お題: {data.thema}</h2>
                                <div className="mt-4">
                                    <h3 className="text-lg font-bold">メンバー</h3>
                                    <ul className="list-disc list-inside mt-2">
                                        {data.name.map((name, index) => (
                                            <li key={index}>{name}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-4">
                                    <a href={data.zoomLink} className="text-blue-500 underline">Zoomリンク</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

    );
}