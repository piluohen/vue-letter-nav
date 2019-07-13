# vue-letter-nav

一个基于vue的字母导航组件

[demo](https://piluohen.github.io/vue-letter-nav/)
注：请F12，选择手机模式查看，或者本地运行在手机浏览器上的查看

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

## 源码地址

[GitHub(https://github.com/piluohen/vue-letter-nav)](https://github.com/piluohen/vue-letter-nav)