/**
 * 1.useEffect->生命周期
 * 2.useCallback->用来优化我们的方法的
 * 
 */

import React, { useState, useEffect, useCallback } from 'react';

// 3.自定义Hooks函数 -> 自定义有个规则：就是必须用use开头
function useWinSize() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    })
    // 4.useCallback能缓存我们的方法
    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    }, [])
    useEffect(() => {
        // 进来时开启监听事件
        window.addEventListener('resize', onResize)
        // 离开时是关闭监听事件
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return size;

}

function Example9() {

    const size = useWinSize()
    return (
        <div>页面Size:{size.width}x{size.height}</div>
    )
}

export default Example9 