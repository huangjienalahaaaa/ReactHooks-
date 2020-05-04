// 去除原始的Component（因为不用继承）。但是要引入useState
import React, { useState } from 'react';
function Example() {
    // 定义count变量，setCount方法
    const [count, setCount] = useState(0);
    return (
        <div>
            {/* 使用定义count变量 */}
            <p>You clicked {count} times</p>
            {/* 使用setCount方法 */}
            <button onClick={() => { setCount(count + 1) }}>click me</button>
        </div>
    )
}
export default Example;