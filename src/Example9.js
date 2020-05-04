// useRef保存普通变量

//引入useEffect
import React, { useRef, useState, useEffect } from 'react';
function Example9() {
    const inputEl = useRef(null)
    const onButtonClick = () => {
        inputEl.current.value = "Hello ,useRef"
        console.log(inputEl)
    }
    //-----------关键代码--------start
    const [text, setText] = useState('jspang')

    //定义变量，用来保存ref
    const textRef = useRef()

    useEffect(() => {
        //保存变量
        textRef.current = text;
        console.log('textRef.current:', textRef.current)
    })
    //----------关键代码--------------end
    return (
        <>
            {/*保存input的ref到inputEl */}
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>在input上展示文字</button>
            <br />
            <br />
            <input value={text} onChange={(e) => { setText(e.target.value) }} />
        </>
    )
}

export default Example9