import React, { useEffect, useState } from "react";

export default function FetchJson() {
    const [data, setData] = useState(null); // 用于存储 JSON 数据
    const [loading, setLoading] = useState(true); // 加载状态
    const [error, setError] = useState(null); // 错误状态

    useEffect(() => {
        // console.log("Fetching JSON...");

        // 请求 JSON 数据
        fetch("https://json-8u8.pages.dev/1.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // 解析 JSON
            })
            .then((json) => {
                setData(json); // 保存数据到 state
                setLoading(false); // 结束加载状态
            })
            .catch((err) => {
                console.error("Failed to fetch JSON:", err);
                setError(err.message); // 保存错误信息
                setLoading(false); // 结束加载状态
            });
    }, []); // 空数组确保 effect 只在组件挂载时执行一次

    // 根据加载状态和错误状态显示内容
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {/* <h1>Fetched JSON Data:</h1> */}
            <pre>{JSON.stringify(data, null, 2)}</pre> {/* 格式化显示 JSON */}
            当前版本号：{data && data.ver}
            <br />
            更新日期：{data && data.time}
        </div>
    );
}
