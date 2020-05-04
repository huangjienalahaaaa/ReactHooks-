// 引入useContext和在color.js中定义的ColorContext
import React, { useContext } from 'react';
import { ColorContext } from './color';

function ShowArea() {

    // 让组件可以接收全局变量
    const { color } = useContext(ColorContext)
    return (<div style={{ color: color }}>字体颜色为{color}</div>)

}
export default ShowArea