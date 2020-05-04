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

# v4.0 useEffect 实现 componentWillUnmount生命周期函数：

在写React应用的时候，在组件中经常用到componentWillUnmount生命周期函数（组件将要被卸载时执行）。比如我们的定时器要清空，避免发生内存泄漏;比如登录状态要取消掉，避免下次进入信息出错。所以这个生命周期函数也是必不可少的，这节课就来用useEffect来实现这个生命周期函数,并讲解一下useEffect容易踩的坑。

***useEffect解绑副作用***
学习<font color="red">React Hooks</font> 时，我们要改掉生命周期函数的概念（人往往有先入为主的毛病，所以很难改掉），因为<font color="red">Hooks</font>叫它副作用，所以<font color="red">componentWillUnmount</font>也可以理解成解绑副作用。这里为了演示用<font color="red">useEffect</font>来实现类似<font color="red">componentWillUnmount</font>效果，先安装<font color="red">React-Router</font>路由,进入项目根本录，使用<font color="red">npm</font>进行安装。

# v5.0 useContext父子组件传值：

有了<font color="red">useState</font>和<font color="red">useEffect</font>已经可以实现大部分的业务逻辑了，但是<font color="red">React Hooks</font>中还是有很多好用的<font color="red">Hooks</font>函数的，比如<font color="red">useContext</font>和<font color="red">useReducer</font>。

在用类声明组件时，父子组件的传值是通过组件属性和<font color="red">props</font>进行的，那现在使用方法(Function)来声明组件，已经没有了<font color="red">constructor</font>构造函数也就没有了props的接收，那父子组件的传值就成了一个问题。<font color="red">React Hooks</font> 为我们准备了<font color="red">useContext</font>。这节课就学习一下<font color="red">useContext</font>，它可以帮助我们跨越组件层级直接传递变量，实现共享。需要注意的是<font color="red">useContext</font>和<font color="red">redux</font>的作用是不同的，一个解决的是组件之间值传递的问题，一个是应用中统一管理状态的问题，但通过和<font color="red">useReducer</font>的配合使用，可以实现类似<font color="red">Redux</font>的作用。

这就好比玩游戏时有很多英雄，英雄的最总目的都是赢得比赛，但是作用不同，有负责输出的，有负责抗伤害的，有负责治疗的。
> <font color="red">Context</font>的作用就是对它所包含的组件树提供全局共享数据的一种技术。

请看Example4.js


# v6.0 useReducer介绍和简单使用：


上节课学习了useContext函数，那这节课开始学习一下useReducer，因为他们两个很像，并且合作可以完成类似的Redux库的操作。在开发中使用useReducer可以让代码具有更好的可读性和可维护性，并且会给测试提供方便。那我们彻底的学习一下useReducer。这节课我们只是简单的学习一下useReducer语法和使用方法，尽量避免Redux的一些操作。这样讲更容易让不了解Redux的小伙伴接受。

***reducer到底是什么？***

为了更好的理解useReducer，所以先要了解JavaScript里的Redcuer是什么。它的兴起是从Redux广泛使用开始的，但不仅仅存在Redux中，可以使用冈的JavaScript来完成Reducer操作。那reducer其实就是一个函数，这个函数接收两个参数，一个是状态，一个用来控制业务逻辑的判断参数。我们举一个最简单的例子。

```javascript
function countReducer(state, action) {
    switch(action.type) {
        case 'add':
            return state + 1;
        case 'sub':
            return state - 1;
        default: 
            return state;
    }
}
```
上面的代码就是Reducer，你主要理解的就是这种形式和两个参数的作用，一个参数是状态，一个参数是如何控制状态。

***useReducer的使用***

了解reducer的含义后，就可以讲useReducer了，它也是React hooks提供的函数，可以增强我们的Reducer，实现类似Redux的功能。我们新建一个Example5.js的文件，然后用useReducer实现计数器的加减双向操作。

# v7.0 useReducer代替redux小案例-1：


使用useContext和useReducer是可以实现类似Redux的效果，并且一些简单的个人项目，完全可以用下面的方案代替Redux，这种做法要比Redux简单一些。因为useContext和useReducer在前两节课已经学习过了，所以我们这节课把精力就放在如何模拟出Redux的效果。如果你目前还不能掌握基本的语法，可以再复习一下前两节的知识点。

***理论上的可行性：***
我们先从理论层面看看替代<font color="red">Redux</font>的可能性，其实如果你对两个函数有所了解，只要我们巧妙的结合，这种替代方案是完全可行的。

<font color="red">useContext</font>：可访问全局状态，避免一层层的传递状态。这符合Redux其中的一项规则，就是状态全局化，并能统一管理。

<font color="red">useReducer</font>：通过action的传递，更新复杂逻辑的状态，主要是可以实现类似Redux中的Reducer部分，实现业务逻辑的可行性。

经过我们在理论上的分析是完全可行的，接下来我们就用一个简单实例来看一下具体的实现方法。那这节课先实现useContext部分（也就是状态共享），下节再继续讲解useReducer部分（控制业务逻辑）。
