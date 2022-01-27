# js

## 基础题

### js 基本类型和引用类型

基本数据类型：Undefined、Null、Boolean、String、Number、Symbol （es6）。引用类型：Object。Object 可以细分为：`Object 类型`、`Array 类型`、`Date 类型`、`RegExp 类型`、`Function 类型`

### 如何数据检测

```js
typeof 5; // 'number'
typeof "5"; // 'string'
typeof undefined; // 'undefined'
typeof false; // 'boolean'
typeof Symbol(); // 'symbol'
console.log(typeof null); //object
console.log(typeof NaN); //number

typeof []; // 'object'
typeof {}; // 'object'
typeof console.log; // 'function'
```

`instanceof`通过原型链来判断数据类型的

```js
p1 = new Person();
p1 instanceof Person; // true
```

Object.prototype.toString.call()可以检测所有的数据类型，算是一个比较完美的方法了。

```js
var obj = {};
var arr = [];
console.log(Object.prototype.toString.call(obj)); //[object Object]
console.log(Object.prototype.toString.call(arr)); //[object Array]
```

### js 深拷贝、浅拷贝, js 实现一个深拷贝

浅拷贝： 只对基本数据类型进行拷贝，方法有：Object.assign() 、es6 的解构赋值、数组的 slice、concat 方法、展开运算符、Array.from。

深拷贝：对所有数据类型进行真正的拷贝，方法有：利用 JSON.stringify() 和 JSON.parse()、利用递归实现。

```js
// 拷贝 + 递归
function cloneDeep(source) {
  if (!isObject(source)) return source; // 非对象返回自身
  var target = Array.isArray(source) ? [] : {};
  for (var key in source) {
    if (source.hasOwnProperty(i)) {
      if (isObject(source[key])) {
        target[key] = cloneDeep(source[key]); // 注意这里
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}
function isObject(obj) {
  return typeof obj === "object" && obj != null;
}
```

Es6

箭头函数和普通函数

## 原型 & 继承

### js 创建对象的几种方式

对象字面量的方

```js
var obj = {};
```

new 一个构造函数

```js
function Pel() {}
var p = new Pel();
p.name = "hu";
p.age = "25";
p.address = function () {};
```

new 一个内置对

```js
var obj = new Object();
```

Object.create（）创建对象

```js
var test = Object.create({ x: 1 });
```

### JS 如何实现一个类

构造函数法

缺点：用到了 this 和 prototype，编写复杂，可读性差

```js
function P(name, age) {
  this.name = name;
  this.age = age;
}
P.prototype.sal = function () {};
var pel = new P("jj", 1);
pel.sell();
```

ES6 语法糖 class

```text
class Point {
       constructor(x, y) {
         this.x = x;
         this.y = y;
       }
       toString() {
         return '(' + this.x + ', ' + this.y + ')';
       }
     }
  var point = new Point(2, 3);
```

**原型链**

一句话解析什么是原型链

> 遍历一个实列的属性时，先遍历实列对象上的属性，再遍历它的原型对象，一直遍历到 Object

任何一个类（函数）都有原型对象，原型对象至少有两个属性（constructor,**proto**）。constructor 指向函数本身，**proto**指向父类原型对象。

函数上有一个 prototype 属性，指向原型对象，通过它可以访问原型对象

函数的实列可以直接访问原型对象(因为实列上有**proto**指向构造函数的原型对象)

```js
function Dog() {} //类
var obj = new Dog(); //实列
obj.name = "沪江";
Dog.prototype.name = "旺财";
Dog.prototype.eat = function () {
  console.log(this.name);
};
console.log(Dog.prototype.name); //旺财
console.log(obj.prototype); //undefined,prototype是类上才有的，实列上没有
obj.eat(); //沪江（先遍历实列对象上的属性，再遍历它的原型对象）
```

### 继承

构造函数绑定：使用 call 或 apply 方法，将父对象的构造函数绑定在子对象上

```js
function Cat(name, color) {
  Animal.apply(this, arguments);
  this.name = name;
  this.color = color;
}
```

实例继承：将子对象的 prototype 指向父对象的一个实例

```js
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
```

拷贝继承：如果把父对象的所有属性和方法，拷贝进子对象

```js
function extend(Child, Parent) {
  var p = Parent.prototype;
  var c = Child.prototype;
  for (var i in p) {
    c[i] = p[i];
  }
  c.uber = p;
}
```

原型继承：将子对象的 prototype 指向父对象的 prototype

```js
function extend(Child, Parent) {
  var F = function () {};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype;
}
```

ES6 语法糖 extends 继承

```js
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }
  toString() {
    return this.color + " " + super.toString(); // 调用父类的toString()
  }
}
```

# css

## bfc

## 左固定，右自适应

# vue

## 基础面试题 30

https://juejin.cn/post/6844903918753808398

## 我想问的

https://cloud.tencent.com/developer/article/1552069

- 渲染项目列表时，“key” 属性的作用和重要性是什么?

- computed 和 watch 区分使用场景

- Vue 如何直接给一个数组项赋

- 在什么阶段才能访问操作 DOM

- 组件中 data 为什么是一个函数？

  因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

- 说说你使用 Vue 框架踩过最大的坑是什么？怎么解决的？

## vuex

### 设计思想

运用到了 js 设计模式中的单例模式，单例模式想要做到的是，不管我们尝试去创建多少次，它都只给你返回第一次所创建的那唯一的一个实例。

https://blog.csdn.net/saucxs/article/details/91967620

**_为什么组件 a 修改了 state.count，组件 b 也会跟着改变？_**

因为 state 就是一个新的 vue 对象里 data 的一个属性啊。

store 里存储的是什么

```js
function resetStoreVM (store, state) {
	store._vm = new Vue({
 	data: { state }
})
```

虽然 Vuex 的整体代码并不多，但是却是个值得阅读的项目。了解了 store 的 state，知道它是通过 new 一个新的 vue 对象 \_vm 来监听的，而这个 \_vm 又是绑在 store 上的。所以通过这一系列的关系，最后我们能在各个组件中使用到被监听的 **this.$store.state**。

## 递归组件

对于一些有规律的 dom 结构，可以通过递归方式来生成这个结构；

https://www.jianshu.com/p/84eb67487113

```js
var demoData = [
  {
    id: "1",
    menuName: "基础管理",
    menuCode: "10",
    children: [
      {
        menuName: "用户管理",
        menuCode: "11",
      },
      {
        menuName: "角色管理",
        menuCode: "12",
        children: [
          {
            menuName: "管理员",
            menuCode: "121",
          },
          {
            menuName: "CEO",
            menuCode: "122",
          },
          {
            menuName: "CFO",
            menuCode: "123",
          },
          {
            menuName: "COO",
            menuCode: "124",
          },
          {
            menuName: "普通人",
            menuCode: "124",
          },
        ],
      },
      {
        menuName: "权限管理",
        menuCode: "13",
      },
    ],
  },
  {
    id: "2",
    menuName: "商品管理",
    menuCode: "",
  },
  {
    id: "3",
    menuName: "订单管理",
    menuCode: "30",
    children: [
      {
        menuName: "订单列表",
        menuCode: "31",
      },
      {
        menuName: "退货列表",
        menuCode: "32",
        children: [],
      },
    ],
  },
  {
    id: "4",
    menuName: "商家管理",
    menuCode: "",
    children: [],
  },
];

export default demoData;
```

## 移动组件

可移动 notice 组件，title、content、close

# 异步

## 设计并实现 Promise.race()/ finally

```js
Promise._race = (promises) =>
  new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve, reject);
    });
  });
```

```js
window.Promise &&
  !("finally" in Promise) &&
  !(function () {
    Promise.prototype.finally = function (cb) {
      cb = typeof cb === "function" ? cb : function () {};

      var Fn = this.constructor; // 获取当前实例构造函数的引用

      // 接受状态：返回数据
      var onFulfilled = function (data) {
        return Fn.resolve(cb()).then(function () {
          return data;
        });
      };

      // 拒绝状态：抛出错误
      var onRejected = function (err) {
        return Fn.resolve(cb()).then(function () {
          throw err;
        });
      };

      return this.then(onFulfilled, onRejected);
    };
  })();

/*********************** 测试 ***********************/
const p = new Promise((resolve, reject) => {
  console.info("starting...");

  setTimeout(() => {
    Math.random() > 0.5 ? resolve("success") : reject("fail");
  }, 1000);
});

// 正常顺序测试
p.then((data) => {
  console.log(`%c resolve: ${data}`, "color: green");
})
  .catch((err) => {
    console.log(`%c catch: ${err}`, "color: red");
  })
  .finally(() => {
    console.info("finally: completed");
  });

// finally 前置测试
p.finally(() => {
  console.info("finally: completed");
})
  .then((data) => {
    console.log(`%c resolve: ${data}`, "color: green");
  })
  .catch((err) => {
    console.log(`%c catch: ${err}`, "color: red");
  });
```

##介绍下 Promise.all 使用、原理实现及错误处理

一、Promise 概念

Promise 是 JS 异步编程中的重要概念，异步抽象处理对象，是目前比较流行 Javascript 异步编程解决方案之一。Promise.all()接受一个由 promise 任务组成的数组，可以同时处理多个 promise 任务，当所有的任务都执行完成时，Promise.all()返回 resolve，但当有一个失败(reject)，则返回失败的信息，即使其他 promise 执行成功，也会返回失败。和后台的事务类似。和 rxjs 中的 forkJoin 方法类似，合并多个 Observable 对象 ，等到所有的 Observable 都完成后，才一次性返回值。

二、Promise.all 如何使用

对于 Promise.all(arr) 来说，在参数数组中所有元素都变为决定态后，然后才返回新的 promise。

```js
// 以下 demo，请求两个 url，当两个异步请求返还结果后，再请求第三个 url
const p1 = request(`http://some.url.1`);
const p2 = request(`http://some.url.2`);
Promise.all([p1, p2])
  .then((datas) => {
    // 此处 datas 为调用 p1, p2 后的结果的数组
    return request(`http://some.url.3?a=${datas[0]}&b=${datas[1]}`);
  })
  .then((data) => {
    console.log(msg);
  });
```

三、Promise.all 原理实现

```javascript
function promiseAll(promises){
     return new Promise(function(resolve,reject){
            if(!Array.isArray(promises)){
             return reject(new TypeError("argument must be anarray"))
           }
    var countNum=0;
    var promiseNum=promises.length;
    var resolvedvalue=new Array(promiseNum);
    for(var i=0;i<promiseNum;i++){
      (function(i){
         Promise.resolve(promises[i]).then(function(value){
            countNum++;
           resolvedvalue[i]=value;
          if(countNum===promiseNum){
              return resolve(resolvedvalue)
          }
       },function(reason){
        return reject(reason)
      )
     })(i)
    }
})
}
var p1=Promise.resolve(1),
p2=Promise.resolve(2),
p3=Promise.resolve(3);
promiseAll([p1,p2,p3]).then(function(value){
console.log(value)
})
```

四、Promise.all 错误处理

有时候我们使用 Promise.all()执行很多个网络请求，可能有一个请求出错，但我们并不希望其他的网络请求也返回 reject，要错都错，这样显然是不合理的。如何做才能做到 promise.all 中即使一个 promise 程序 reject，promise.all 依然能把其他数据正确返回呢?

1、全部改为串行调用（失去了 node 并发优势）

2、当 promise 捕获到 error 的时候，代码吃掉这个异常，返回 resolve，约定特殊格式表示这个调用成功了

```javascript
var p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 0);
});
var p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2);
  }, 200);
});
var p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    try {
      console.log(XX.BBB);
    } catch (exp) {
      resolve("error");
    }
  }, 100);
});
Promise.all([p1, p2, p3])
  .then(function (results) {
    console.log("success");
    console.log(results);
  })
  .catch(function (r) {
    console.log("err");
    console.log(r);
  });
```

# 闭包

##js 闭包是什么，js 为什么会有闭包？

函数可以访问他**被创建时**所处的上下文环境，这被称为**闭包**。

闭包本身是允许你在内部作用域得以访问外部作用域变量的特权，并且不一定要以返回函数来表现，但必须由函数包裹。（但当你以函数返回，向外暴露时，就可以使得外部环境访问内部变量）。

https://www.zhihu.com/question/25522657

https://segmentfault.com/a/1190000011862125

https://www.cnblogs.com/xxcanghai/p/4991870.html

## 闭包测试题

```
function fun(n,o) {
  console.log(o)
  return {
    fun:function(m){
      return fun(m,n);
    }
  };
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);//undefined,?,?,?
var b = fun(0).fun(1).fun(2).fun(3);//undefined,?,?,?
var c = fun(0).fun(1);  c.fun(2);  c.fun(3);//undefined,?,?,?
//问:三行a,b,c的输出分别是什么？
```

![image-20201029154128501](/Users/amaris_elm/Library/Application Support/typora-user-images/image-20201029154128501.png)

# webpack

https://zhuanlan.zhihu.com/p/141447713

## 简单介绍下 webpack，并说下 Webpack 的构建流程？

https://juejin.im/post/6844904094281236487#heading-3

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

- `初始化参数`：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
- `开始编译`：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
- `确定入口`：根据配置中的 entry 找出所有的入口文件
- `编译模块`：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
- `完成模块编译`：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
- `输出资源`：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
- `输出完成`：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

在以上过程中，`Webpack` 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

##Gulp 与 WebPack 区别

gulp：强调的是前端开发的流程，通过配置一系列的 task，定义 task 处理的事物（例如文件压缩合并、雪碧图、启动 server、 版本控制等），然后定义执行顺序，来让 gulp 执行 task，从而构建前端项目的流程。
webpack：是一个前端模块化方案，侧重模块打包，把开发中的所有资源（图片、js 文件、css 文件等）都看成模块，通过 loader（加载器）和 plugins（插件）对资源进行处理，打包成符合生产环境部署的前端资源。
相同：可以文件合并与压缩（css）。
不同点：
虽然都是前端自动化构建工具，但看他们的定位就知道不是对等的。
gulp 严格上讲，模块化不是他强调的东西，他旨在规范前端开发流程。
webpack 更是明显强调模块化开发，而那些文件压缩合并、预处理等功能，不过是他附带的功能。

# 编程题

##输入 '1, 2, 3, 5, 7, 8, 10' ，输出 '1~3, 5, 7~8, 10'

##请实现一个 add 函数，满足以下功能。

```js
add(1); 			// 1
add(1)(2);  	// 3
add(1)(2)(3)；// 6
add(1)(2, 3); // 6
add(1, 2)(3); // 6
add(1, 2, 3); // 6
```

##模拟实现一个深拷贝

https://juejin.cn/post/6844903765007400973

# 其他

## 开发题: 黑白屏、electron、网页渲染优化、首屏渲染

##箭头函数与普通函数（function）的区别

箭头函数是普通函数的简写，可以更优雅的定义一个函数，和普通函数相比，有以下几点差异：

1、函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

2、不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

3、不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

4、不可以使用 new 命令，因为：

- 没有自己的 this，无法调用 call，apply。
- 没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 **proto**

##写一个 new 函数

new 过程大致是这样的：

```js
function _new(fn, ...arg) {
  const obj = Object.create(fn.prototype);
  const ret = fn.apply(obj, arg);
  return ret instanceof Object ? ret : obj;
}
```

```js
function newFunc(father, ...rest) {
  var result = {};
  result.__proto__ = father.prototype;
  var result2 = father.apply(result, rest);
  if (
    (typeof result2 === "object" || typeof result2 === "function") &&
    result2 !== null
  ) {
    return result2;
  }
  return result;
}
```

##浏览器的渲染过程，回流及重绘

本文先从浏览器的渲染过程来从头到尾的讲解一下回流重绘，这个渲染过程来自[MDN](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=zh-cn)）

![webkit渲染过程](https://user-gold-cdn.xitu.io/2018/12/10/16798b8db54caa31?w=624&h=289&f=png&s=41057)

1. 解析 HTML，生成 DOM 树，解析 CSS，生成 CSSOM 树

2. 将 DOM 树和 CSSOM 树结合，生成渲染树(Render Tree)

3. Layout(回流):根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）

4. Painting(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素

5. Display:将像素发送给 GPU，展示在页面上。（这一步其实还有很多内容，比如会在 GPU 将多个合成层合并为同一个层，并展示在页面中。而 css3 硬件加速的原理则是新建合成层，这里我们不展开，之后有机会会写一篇博客）

   ### 生成渲染树

   ![生成渲染树](https://user-gold-cdn.xitu.io/2018/12/10/16798b8d839a7d6d?w=1150&h=537&f=png&s=34944)

   为了构建渲染树，浏览器主要完成了以下工作：

   1. 从 DOM 树的根节点开始遍历每个可见节点。
   2. 对于每个可见的节点，找到 CSSOM 树中对应的规则，并应用它们。
   3. 根据每个可见节点以及其对应的样式，组合生成渲染树。

   第一步中，既然说到了要遍历可见的节点，那么我们得先知道，什么节点是不可见的。不可见的节点包括：

   - 一些不会渲染输出的节点，比如 script、meta、link 等。
   - 一些通过 css 进行隐藏的节点。比如 display:none。注意，利用 visibility 和 opacity 隐藏的节点，还是会显示在渲染树上的。只有 display:none 的节点才不会显示在渲染树上。

   从上面的例子来讲，我们可以看到 span 标签的样式有一个 display:none，因此，它最终并没有在渲染树上。

   **注意：渲染树只包含可见的节点**

   ### 回流

   前面我们通过构造渲染树，我们将可见 DOM 节点以及它对应的样式结合起来，可是我们还需要计算它们在设备视口(viewport)内的确切位置和大小，这个计算的阶段就是回流。

   为了弄清每个对象在网站上的确切大小和位置，浏览器从渲染树的根节点开始遍历，我们可以以下面这个实例来表示：

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <meta name="viewport" content="width=device-width,initial-scale=1" />
       <title>Critial Path: Hello world!</title>
     </head>
     <body>
       <div style="width: 50%">
         <div style="width: 50%">Hello world!</div>
       </div>
     </body>
   </html>
   ```

   我们可以看到，第一个 div 将节点的显示尺寸设置为视口宽度的 50%，第二个 div 将其尺寸设置为父节点的 50%。而在回流这个阶段，我们就需要根据视口具体的宽度，将其转为实际的像素值。（如下图）

   ![img](https://user-gold-cdn.xitu.io/2018/12/10/16798b8d83f0e188?w=616&h=281&f=png&s=4728)

   ### 重绘

   最终，我们通过构造渲染树和回流阶段，我们知道了哪些节点是可见的，以及可见节点的样式和具体的几何信息(位置、大小)，那么我们就可以将渲染树的每个节点都转换为屏幕上的实际像素，这个阶段就叫做重绘节点。

   既然知道了浏览器的渲染过程后，我们就来探讨下，何时会发生回流重绘。

   ## 何时发生回流重绘

   我们前面知道了，回流这一阶段主要是计算节点的位置和几何信息，那么当页面布局和几何信息发生变化的时候，就需要回流。比如以下情况：

   - 添加或删除可见的 DOM 元素
   - 元素的位置发生变化
   - 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
   - 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代。
   - 页面一开始渲染的时候（这肯定避免不了）
   - 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）

   **注意：回流一定会触发重绘，而重绘不一定会回流**

   根据改变的范围和程度，渲染树中或大或小的部分需要重新计算，有些改变会触发整个页面的重排，比如，滚动条出现的时候或者修改了根节点。

   我们可以使用这三种方式进行优化:

   **隐藏元素，应用修改，重新显示**

##浏览器与 Node 的事件循环(Event Loop)有何区别

https://juejin.cn/post/6844903761949753352

##什么是防抖和节流？有什么区别？如何实现？

防抖，debounce。其概念其实是从机械开关和继电器的“去弹跳”（debounce）[衍生](https://link.zhihu.com/?target=http%3A//www.wikiwand.com/zh/%E9%96%8B%E9%97%9C%23/.E6.8E.A5.E9.BB.9E.E5.BD.88.E8.B7.B3) 出来的，基本思路就是把多个信号合并为一个信号。

节流，throttle。节流的概念可以想象一下水坝，你建了水坝在河道中，不能让水流动不了，你只能让水流慢些。换言之，你不能让用户的方法都不执行。如果这样干，就是 debounce 了。为了让用户的方法在某个时间段内只执行一次，需要保存上次执行的时间点与定时器。节流会用在比 input, keyup 更频繁触发的事件中，如 resize, touchmove, mousemove, scroll。`throttle` 会强制函数以固定的速率执行。

https://zhuanlan.zhihu.com/p/38313717

## 工厂模式 原型

bfc

左固定 右边

flex

vue

watch computed

data

数据通信

# 评价

videojs

if (a === 1 && a === 2)

Object.definP
