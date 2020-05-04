# v1.0 ReactHooks环境搭建和hello world编写：

***React Hooks简介：***

2018年底FaceBook的React小组推出Hooks以来，所有的React的开发者都对它大为赞赏。React Hooks就是用函数的形式代替原来的继承类的形式，并且使用预函数的形式管理<font color="red">state</font>，有Hooks可以不再使用类的形式定义组件了。这时候你的认知也要发生变化了，原来把组件分为有状态组件和无状态组件，有状态组件用类的形式声明，无状态组件用函数的形式声明。那现在所有的组件都可以用函数来声明了。

我们这里先不说Hooks有什么好处，就算说了，你也不可能完全理解，好像我王婆卖瓜自卖自夸一样，所以先学习，学过几节课后，我们再来总结React Hooks的好处。


# v2.0 useState介绍和多状态声明：

上节课中已经开始使用useState,但是并没有对它展开进行讲解，只是一句带过。这节课就来更加深入的了解一下useState这个API。

***useState的介绍：***
> <font color="red">useState</font>是react自带的一个hook函数，它的作用是用来声明状态变量。

那我们从三个方面来看useState的用法，分别是声明、读取、使用（修改）。这三个方面掌握了，你基本也就会使用useState了.


1. 声明：
先来看一下声明的方式，上节课的代码如下：
> const [ count , setCount ] = useState(0);

这种方法是ES6语法中的数组解构，这样看起来代码变的简单易懂。现在ES6的语法已经在工作中频繁使用，所以如果你对ES6的语法还不熟悉，我觉的有必要拿出2天时间学习一下。 如果不写成数组解构，上边的语法要写成下面的三行:

```javascript
let _useState = userState(0)
let count = _useState[0]
let setCount = _useState[1]
```

2. 这时候你已经会声明一个状态了，接下来我们看看如何读取状态中的值。
> <p>You clicked {count} times</p>

你可以发现，我们读取是很简单的。只要使用<font color="red">{count}</font>就可以，因为这时候的count就是JS里的一个变量，想在<font color="red">JSX</font>中使用，值用加上<font color="red">{}</font>就可以。

最后看看如果改变State中的值,看下面的代码:
> <button onClick={()=>{setCount(count+1)}}>click me</button>


直接调用setCount函数，这个函数接收的参数是修改过的新状态值。接下来的事情就交给React,他会重新渲染组件。React自动帮助我们记忆了组件的上一次状态值，但是这种记忆也给我们带来了一点小麻烦，但是这种麻烦你可以看成规则，只要准守规则，就可以愉快的进行编码。

***多状态声明的注意事项：***
比如现在我们要声明多个状态，有年龄（age）、性别(sex)和工作(work)。代码可以这么写.
```javascript

import React, { useState } from 'react';
function Example2(){
    const [ age , setAge ] = useState(18)
    const [ sex , setSex ] = useState('男')
    const [ work , setWork ] = useState('前端程序员')
    return (
        <div>
            <p>JSPang 今年:{age}岁</p>
            <p>性别:{sex}</p>
            <p>工作是:{work}</p>

        </div>
    )
}
export default Example2;

```

其实细心的小伙伴一定可以发现，在使用useState的时候只赋了初始值，并没有绑定任何的key,那React是怎么保证这三个useState找到它自己对应的state呢？
> 答案是：React是根据useState出现的顺序来确定的

比如我们把代码改成下面的样子(放在条件状态语句中)：
```javascript
import React, { useState } from 'react';

let showSex = true
function Example2(){
    const [ age , setAge ] = useState(18)
    if(showSex){
        const [ sex , setSex ] = useState('男')
        showSex=false
    }

    const [ work , setWork ] = useState('前端程序员')
    return (
        <div>
            <p>JSPang 今年:{age}岁</p>
            <p>性别:{sex}</p>
            <p>工作是:{work}</p>

        </div>
    )
}
export default Example2;
```
这时候控制台就会直接给我们报错:
意思就是useState不能在if...else...这样的条件语句中进行调用，必须要按照相同的顺序进行渲染。如果你还是不理解，你可以记住这样一句话就可以了：<font color="green">就是React Hooks不能出现在条件判断语句中，因为它必须有完全一样的渲染顺序</font>。

# v3.0 useEffect代替生命周期函数：

在用<font color="red">Class</font>制作组件时，经常会用生命周期函数，来处理一些额外的事情（副作用：和函数业务主逻辑关联不大，特定时间或事件中执行的动作，比如Ajax请求后端数据，添加登录监听和取消登录，手动修改<font color="red">DOM</font>等等）。在<font color="red">React Hooks</font>中也需要这样类似的生命周期函数，比如在每次状态（State）更新时执行，它为我们准备了<font color="red">useEffect</font>。从这节课开始来认识一下这个<font color="red">useEffect</font>函数。它就像一匹野马，当你没有驯服它时，感觉它很难相处甚至无法掌握；但你驯服它后，你会发现它温顺可爱，让你爱不释手。

* useEffect两个注意点：
1. React首次渲染和之后的每次渲染都会调用一遍useEffect函数，而之前我们要用两个生命周期函数分别表示首次渲染(componentDidMonut)和更新导致的重新渲染(componentDidUpdate)。

2. useEffect中定义的函数的执行不会阻碍浏览器更新视图，也就是说这些函数时异步执行的，而componentDidMonut和componentDidUpdate中的代码都是同步执行的。个人认为这个有好处也有坏处吧，比如我们要根据页面的大小，然后绘制当前弹出窗口的大小，如果时异步的就不好操作了。
