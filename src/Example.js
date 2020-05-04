
/*
用useEffect函数来代替生命周期函数:
    -> 在使用React Hooks的情况下，我们可以使用下面的代码来完成上边代码的生命周期效果，代码如下（修改了以前的diamond）： 记得要先引入useEffect后，才可以正常使用。
*/


// 引入useEffect
import React, { useState, useEffect } from 'react';
function Example() {
    const [count, setCount] = useState(0);
    //---关键代码---------start-------
    useEffect(() => {
        console.log(`useEffect=>You clicked ${count} times`)
    })
    //---关键代码---------end-------

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => { setCount(count + 1) }}>click me</button>
        </div>
    )
}
export default Example;