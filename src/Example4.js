
// 1.引入createContext函数（父组件发送），以及useContext(子组件接收)
import React, { useState, createContext, useContext } from 'react';

//2.使用得到一个组件
const CountContext = createContext()

//3.设置子组件
function Counter() {
    const count = useContext(CountContext)  //一句话就可以得到count
    return (<h2>{count}</h2>)
}

function Example4() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => { setCount(count + 1) }}>click me</button>
            {/*3.使用(提供器：向子组件中传递数据。且是成对的，里面放子组件) */}
            <CountContext.Provider value={count}>
                <Counter />
            </CountContext.Provider>

        </div>
    )
}
export default Example4;