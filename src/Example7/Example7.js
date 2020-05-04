// 3.引入useMemo
import React, { useState, useMemo } from 'react';

function Example7() {
    const [xiaohong, setXiaohong] = useState('小红待客状态')
    const [zhiling, setZhiling] = useState('志玲待客状态')
    return (
        <>
            <button onClick={() => { setXiaohong(new Date().getTime()) }}>小红</button>
            <button onClick={() => { setZhiling(new Date().getTime() + ',志玲向我们走来了') }}>志玲</button>
            <ChildComponent name={xiaohong}>{zhiling}</ChildComponent>
        </>
    )
}
function ChildComponent({ name, children }) {
    /* 1.问题：这时候你会发现在浏览器中点击志玲按钮，小红对应的方法都会执行，结果虽然没变，但是每次都执行，这就是性能的损耗。
        2.解决-> 其实只要使用useMemo，然后给她传递第二个参数，参数匹配成功，才会执行。
    */function changeXiaohong(name) {
        console.log('她来了，她来了。小红向我们走来了')
        return name + ',小红向我们走来了'
    }
    //4.修改下面这行代码([name]=> 表示：name发生变化的时候，才调用)
    // const actionXiaohong = changeXiaohong(name)
    const actionXiaohong = useMemo(() => changeXiaohong(name), [name])

    return (
        <>
            <div>{actionXiaohong}</div>
            <div>{children}</div>
        </>
    )
}


export default Example7