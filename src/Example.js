import React, { useState, useEffect } from 'react';
// 1.引入对应的React-Router组件
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

// 2.在文件中编写两个新组件，因为这两个组件都非常的简单，所以就不单独建立一个新的文件来写了。

function Index() {
    // useEffect(() => {
    //     // 这时候我们点击Link进入任何一个组件，在浏览器中都会打印出对应的一段话
    //     console.log('useEffect=>老弟，你来了！Index页面')
    //     return () => {
    //         /* 
    //         1.用返回一个函数的形式进行解绑(这时候你在浏览器中预览，我们仿佛实现了componentWillUnmount方法)
    //         2.但这只是好像实现了，当点击计数器按钮时，你会发现老弟，你走了!Index页面，也出现了。这到底是怎么回事那？其实每次状态发生变化，useEffect都进行了解绑。
    //         3.那到底要如何实现类似componentWillUnmount的效果那?这就需要请出useEffect的第二个参数，它是一个数组，数组中可以写入很多状态对应的变量，意思是当状态值发生变化时，我们才进行解绑:
    //             -> 。但是当传空数组[]时，就是当组件将被销毁时才进行解绑(或者是[]里面的变量发生变化的时候，这个函数也进行解绑)，这也就实现了componentWillUnmount的生命周期函数
    //         */ console.log('老弟，你走了!Index页面')
    //     }
    // })
    useEffect(() => {
        console.log('useEffect=>老弟你来了！Index页面')
        return () => {
            console.log('老弟，你走了!Index页面')
        }
    }, [])

    return <h2>JSPang.com</h2>;
}

function List() {
    useEffect(() => {
        console.log('useEffect=>老弟，你来了！List页面')
    })

    return <h2>List-Page</h2>;
}

function Example() {
    const [count, setCount] = useState(0);
    // 这里也改一下（这里传入参数count,每次count发生变化的时候，就发生解绑）
    // useEffect(() => {
    //     console.log(`useEffect=>You clicked ${count} times`)
    // })
    useEffect(() => {
        console.log(`useEffect=>You clicked ${count} times`)

        return () => {
            console.log('====================')
        }
    }, [count])
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => { setCount(count + 1) }}>click me</button>
            {/* 编写路由配置 */}

            <Router>
                <ul>
                    <li> <Link to="/">首页</Link> </li>
                    <li><Link to="/list/">列表</Link> </li>
                </ul>
                <Route path="/" exact component={Index} />
                <Route path="/list/" component={List} />
            </Router>
        </div>
    )
}
export default Example;