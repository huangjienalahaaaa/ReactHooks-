// 引入useReducer
import React, { createContext, useReducer } from 'react';

export const ColorContext = createContext({})


//编写reducer
export const UPDATE_COLOR = "UPDATE_COLOR"

const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_COLOR:
            return action.color
        default:
            return state
    }
}


export const Color = props => {
    //使用-> 'blue'表示默认值
    const [color, dispatch] = useReducer(reducer, 'blue')
    return (
        // 将color, dispatch都共享出去
        <ColorContext.Provider value={{ color, dispatch }}>
            {props.children}
        </ColorContext.Provider>
    )
}