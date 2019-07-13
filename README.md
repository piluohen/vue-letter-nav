# vue-letter-nav

一个基于vue的字母导航组件

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

## 源码地址

[GitHub(https://github.com/piluohen/vue-letter-nav)](https://github.com/piluohen/vue-letter-nav)