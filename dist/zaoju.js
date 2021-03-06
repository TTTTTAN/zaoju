(function(){
    
    var Zaoju = Zaoju || ( function () {
    
        var _dict = {};
        
        _dict.time = ["汉武帝时期", "解放前", "上课时", "月黑风高的晚上", "刚才"];
        _dict.location = ["洞庭湖", "麻将馆", "养生馆", "大街上", "路灯下"];
        _dict.person = ["你", "班主任", "总统先生", "一位路人", "没有人"];
        _dict.event = ["搓脚板", "洗澡", "为爱鼓掌", "裸睡", "捡肥皂"];
   
        var getDict = function () { return _dict; };
        
        var setDict = function (d) { _dict = d; };

        var getWordWithTag = function (tag) { return _dict[tag]; };

        var clearDict = function () { _dict = {}; };
    
        var _pattern = [
            {type: "tag", value: "time"},
            {type: "text", value: "，"},
            {type: "tag", value: "person"},
            {type: "text", value: "在"},
            {type: "tag", value: "location"},
            {type: "tag", value: "event"},
            {type: "text", value: "。"},
        ];
        
        var getPattern = function () { return _pattern; };
    
        var setPattern = function (p) { _pattern = p; };
    
        var regWord = function (val, tags) {
            if (typeof val !== 'string' || typeof tags !== 'string')
                throw new TypeError('regWord的参数类型有误');
            
            val = val.trim();
        
            if (val === "") {
                throw new Error("诶内容呢？");
                return;
            }
            
            tags = tags.trim().split(/[,，、]/);
            // 去除tags数组内所有的空字符串
            var i = 0;
            while(i < tags.length) {
                if(tags[i] === "")
                    tags.splice(i, 1);
                else
                    ++i;
            }
            // 此时i === tags.length
            if (i === 0) {
                throw new Error("标签有问题呢~");
                return;
            }
            
            // types如果不是数组,转化成数组
            if (!Array.isArray(tags))
                tags = [tags];
            // 将body加入各个标签分类数组
            for (var i = 0; i < tags.length; ++i) {
                if (tags[i] === "") continue;
                if (!(tags[i] in _dict))
                    _dict[tags[i]] = [];
                _dict[tags[i]].push(val);
            }
        };
    
        var setPatternInJSON = function (val) {
            
            try {
               var newPattern = JSON.parse(val);
            }
            catch (e) {
                throw new Error("语法似乎不太对呢~");
                return;
            }
        
            if (!Array.isArray(newPattern)) {
                newPattern = [newPattern];
            }
        
            try {
                for (var i = 0; i < newPattern.length; ++i) {
                    if (!("type" in newPattern[i]) || !("value" in newPattern[i]))
                        throw new Error("检查第" + i.toString() + "个元素中type或value的拼写");
                    else if (typeof newPattern[i].type !== "string" || newPattern[i].type === "" || typeof newPattern[i].value !== "string" || newPattern[i].value === "")
                        throw new Error("第" + i.toString() + "个元素的属性值须为非空字符串");
                }
            }
            catch (e) {
                throw e;
                return;
            }
            
            _pattern = newPattern;
        };
        
        var setPatternInSPN = function (val) {
            if (typeof val !== 'string')
                throw new Error('setPatternInSPN 参数须为字符串');
            
            var newPattern = [];
            
            val = val.trim();
            
            // 解析
            var curElement = {type:"text", value: ""};
            for (var i = 0; i < val.length; ++i) {
                if (val[i] === '[') {
                    if (curElement.type === "tag") {
                        curElement.value += '[';
                        continue;
                    }
                    newPattern.push(curElement);
                    curElement = {type: "tag", value: ""};
                    continue;
                }
                if (val[i] === ']') {
                    if (curElement.type === "text") {
                        curElement.value += ']';
                        continue;
                    }
                    newPattern.push(curElement);
                    curElement = {type: "text", value: ""};
                    continue;
                }
                if (val[i] === '\\') {
                    curElement.value += val[i+1];
                    ++i;
                    continue;
                }
                curElement.value += val[i];
                continue;
            }
            newPattern.push(curElement);
            // 去空串
            var i = 0;
            while(i < newPattern.length) {
                if(newPattern[i].value === "")
                    newPattern.splice(i, 1);
                else
                    ++i;
            }
            
            _pattern = newPattern;
        };
        
        var genSentence = function () {
            var output = "";
            for (var i = 0; i < _pattern.length; ++i) {
                switch (_pattern[i].type) {
                    case "text":
                        output += _pattern[i].value;
                        break;
                    case "tag":
                        var tagArr = _dict[_pattern[i].value];
                        if(Array.isArray(tagArr))
                            output += tagArr[Math.floor(Math.random() * tagArr.length)];
                        break;
                }
            }
            return output;
        };
    
    /*
    
    // 检查两个生成规则(pattern)是否相等，注意：不检查结构是否合法
    var comparePatterns = function (p1, p2) {
        if (!Array.isArray(p1) || !Array.isArray(p2))
            throw new TypeError('arguments of function comparePatterns should be arrays.');
        
        if (p1.length !== p2.length)
            return false;
        
        for ( var i = 0; i < p1.length; ++i) {
            if (p1[i].type !== p2[i].type || p1[i].value !== p2[i].value)
                return false;
        }
        
        return true;
    };
    
    */
    
        return {
            getDict: getDict,
            getWordWithTag: getWordWithTag,
            regWord: regWord,
            setDict: setDict,
            clearDict: clearDict,
            getPattern: getPattern,
            setPattern: setPattern,
            setPatternInJSON: setPatternInJSON,
            setPatternInSPN: setPatternInSPN,
            genSentence: genSentence,
        };
    }());
    
    
    var zaoju = Zaoju;
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = zaoju;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function() { return zaoju; });
    } else {
        this.Zaoju = zaoju;
    }
}).call(function() {
    return this || (typeof window !== 'undefined' ? window : global);
}());
