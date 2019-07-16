# vue-letter-nav

一个基于vue的字母导航组件

[demo](https://piluohen.github.io/vue-letter-nav/index.html)<br>
注：请F12，选择手机模式查看，或者本地运行在手机浏览器上的查看

## 使用

```
# 安装 npm 包
npm install -S vue-letter-nav

# 项目引入css
import "~vue-letter-nav/lib/vue-letter-nav.css";

# 项目main.js引入组件, 全局引入

import VueLetterNav from 'vue-letter-nav'

Vue.use(VueLetterNav)

```

## 构建命令

```

# 安装依赖
npm install

# 启动本地服务（默认localhost与ip） localhost:8080
npm run dev

# 打包示例
npm run bulid

```

## Api

| 参数 | 描述 | 类型 | 可选值 | 必须 | 默认值 |
| -- |:----: | :--: | :--: | :--: | -- |
| check | 已选中的值，一维数组 | Array |  | true | [] |
| list | 全部的数据 | Array | [ {'alpha': 'A', name: '用户', value: 'Account'} ] | true | [] |
| multiple | 是否多选 | Boolean |  | false | false |
| readonly | 是否只读 | Boolean |  | false | false |
| showLetter | 显示字母导航 | Boolean |  | false | true |
| scrollOptions | 滚动行为 | Object |  | false |


```js
# list数据格式如下：
{
  name: '安哥拉',
  value: 'Angola',
  alpha: 'A'
},
{
  name: '阿富汗',
  value: 'Afghanistan'
},
{
  name: '阿尔巴尼亚',
  value: 'Albania'
},
{
  name: '巴哈马',
  value: 'Bahamas',
  alpha: 'B'
},
{
  name: '巴林',
  value: 'Bahrain'
}

```

## scrollOptions API

因为引用了 [MDN: scrollIntoView()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)，故可参考其相关配置

| 参数 | 描述 | 类型 | 可选值 | 必须 | 默认值 |
| -- |:----: | :--: | :--: | :--: | -- |
| behavior | 定义滚动动画 | String | auto（自动）\| instant（无滚动）\| smooth（缓动）| false | auto |
| block | 设置滚动指定元素位置 | String | start（顶部）\| center（居中）\| end（底部）\| nearest（最近的）| false | center |
| inline | 设置滚动指定元素位置 | String | start（顶部）\| center（居中）\| end（底部）\| nearest（最近的）| false | center |

## slot

| 参数 | 描述 | 类型 | 可选值 | 必须 | 默认值 |
| -- |:----: | :--: | :--: | :--: | -- |
| content | 子项内容 | | | | |


```js

# 支持slot，可以自定义slot子项的内容，如下所示
# data为的子项的数据，格式：{ name: '', value: '' }

vue-letter-nav(:check="checkList" :list="allList" :multiple="true" :readonly="false" @check="handleCheck")
  template(slot="content" slot-scope="{data}")
    span.letter-content-icon √
    span {{data.name}}

```

## 更新日志

0.1.0

1. 基础版本发布

0.1.1

1. 增加scrollOptions配置