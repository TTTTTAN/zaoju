由于本人高三，今年高考之前无暇维护，敬请谅解。
# 噪句
[![Build Status](http://img.shields.io/travis/tttttan/zaoju/master.svg?style=flat)](https://travis-ci.org/tttttan/zaoju)
![Just for Fun](https://img.shields.io/badge/just-for%20fun-orange.svg)

**噪句** 是一个多自然语言语句成分随机组合系统，简单点说，就是**随机造句**。
## 使用姿势
1. 设定生成规则；
2. 补充随机词库；
3. 然后你就可以轻松得到一句不严肃的话，或者一首所谓“现代诗”用来投给某个小刊物。
## 如何在网页上运行
（最好在文档末）包含`zaoju.js`，然后只需要在页面上创建：
+ 一个文本元素，用以输出生成的文字；
+ 几个按钮，特定按钮的`onclick`调用`zaoju.js`中的特定API函数，并作适当的异常处理；
+ 几个文本框，用于接受输入以设定词库或生成规则。
示例网站戳此：<http://www.med-studios.com/wapp/zaoju>
## 概念与原理
### 词元
一个**词元**是一段文字，同时拥有一个或多个标签。
如：
+ 老王，标签有“人物”，“男性”
+ 教室，标签有“地点”，“在学校内”，“可燃”
+ 皮卡丘，标签有“带电”，“非人类”，“黄（颜）色”，“可吸”
词元是一个概念，用代码实现时，一个词元可能并不被某个对象映射。
### 词库
**词库**是唯一的，它包含若干个标签数组，每个标签数组里的元素均是拥有该标签的词元的文字内容（字符串）。
如：

    > dict["person"]
    < (3) ["老王", "班主任", "你"]
    > dict["can-fly"];
    < (5) ["飞机", "天鹅", "猪", "心情", "灰尘"]
    > dict["brilliant"];
    < (Infinity) ["我", "我", "我", ...]

最后两句是插科打诨啦~
### 生成规则
**生成规则**是一个数组，其元素按照顺序表示了随机生成的文字应有怎样的规律。
其元素均为至少含有`type`及`value`属性的对象:
+ `type`，只可能有两个值：`"text"`或`"tag"`。
+ `value`，一个非空字符串
生成文字时，生成函数会依次检查生成规则，若`type`为`"text"`，则直接输出`value`；若为`"tag"`，则从词库中对应的标签数组里随机选择一个词元输出。
## 许可
[MIT License](https://github.com/TTTTTAN/zaoju/blob/master/LICENSE)
版权所有 &copy; 2014-2018 谭视怀 Tan Shihuai
