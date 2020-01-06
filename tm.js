
var _config = {
    title: "提示",
    message: "",
    sureBtn: "确定",
    cancelBtn: "取消",
    sureClick: "",
    cancelClick: ""
}

function documentFragmentCode(type) {
    var _self = this;
    var body = document.querySelector('body');
    var fragment = document.createDocumentFragment();
    var fragmentObject = [{
        name: "div",
        className: "dialog-tm",
        children: [{
            name: "div",
            className: "dialog-tm-box",
            children: [{
                name: "div",
                className: "dialog-tm-box-title",
                innerHTML: _config.title,
            }, {
                name: "div",
                className: "dialog-tm-box-content",
                children: type === "prompt" ? [{
                    name: "input",
                    className: "dialog-tm-box-content-input",
                    placeholder: "请输入内容"
                }] : [{
                    name: "div",
                    className: "dialog-tm-box-content-content",
                    innerHTML: _config.message,
                }]
            }, {
                name: "div",
                className: "dialog-tm-box-options",
                children: type === "alert" ? [{
                    name: "span",
                    innerHTML: _config.sureBtn,
                    onclick: _config.sureClick,
                }] : [{
                    name: "span",
                    innerHTML: _config.cancelBtn,
                    onclick: _config.cancelClick,
                }, {
                    name: "span",
                    innerHTML: _config.sureBtn,
                    onclick: _config.sureClick,
                }]
            }]
        }]
    }]

    function compilerFragementObject(item, fragments, node) {
        var docEle = document.createElement(item.name);
        item.className && (docEle.className = item.className);
        item.innerHTML && (docEle.innerHTML = item.innerHTML);
        item.placeholder && (docEle.placeholder = item.placeholder);
        item.onclick && (docEle.onclick = item.onclick);
        fragments.appendChild(docEle);
        node.appendChild(fragments);
        item.children && item.children.forEach(function (c) {
            var childNode = document.querySelector("." + item.className);
            var childFragment = document.createDocumentFragment();
            compilerFragementObject(c, childFragment, childNode)
        })
    }

    fragmentObject.forEach(function (item) {
        compilerFragementObject(item, fragment, body)
    });

}

function dialogRemove(){
    document.querySelector(".dialog-tm").remove()
}

function getValue(){
    return document.querySelector(".dialog-tm-box-content-input").value;
}

function configInit(config){
    if (Object.prototype.toString.call(config) === "[object Object]") {
        Object.assign(_config, config);
    } else if (Object.prototype.toString.call(config) === "[object String]") {
        _config.message = config
    }
}

function alertMessage(config) {
    var _self = this;
    _self.status = "pendding";
    _self.type = "alert";
    _self.eventQueue = [];
    configInit(config);
    _self.show = function () {
        _config.sureClick = _self.sure;
        documentFragmentCode(_self.type)
    }
    _self.sure = function () {
        _self.status = "success";
        dialogRemove()
        _self.eventQueue.forEach(function (item) {
            Object.prototype.toString.call(item) === "[object Function]" ? item && item(_self.status) : "";
        });
    }
    _self.then = function (callback) {
        if (_self.status === "success") {
            callback && callback();
        } else {
            _self.eventQueue.push(callback)
        }
    }
    _self.show();
}

function confirmMessage(config) {
    var _self = this;
    _self.status = "pendding";
    _self.type = "confirm";
    _self.eventQueue = [];    
    _self.eventQueueCancel = [];
    configInit(config);
    _self.show = function () {
        _config.sureClick = _self.sure;
        _config.cancelClick = _self.cancel;
        documentFragmentCode(_self.type)
    }
    _self.sure = function () {
        _self.status = "success";
        dialogRemove()
        _self.eventQueue.forEach(function (item) {
            Object.prototype.toString.call(item) === "[object Function]" ? item && item(_self.status) : "";
        });
    }
    _self.cancel = function () {
        _self.status = "cancel";
        dialogRemove()
        _self.eventQueueCancel.forEach(function (item) {
            Object.prototype.toString.call(item) === "[object Function]" ? item && item(_self.status) : "";
        });
    }

    _self.then = function (callback,cancelback) {
        if (_self.status === "success") {
            callback && callback();
        }
        if (_self.status === "pendding"){
            _self.eventQueue.push(callback)
        }
        if (_self.status === "cancel"){
            _self.eventQueueCancel.push(callback)
        }
    }
    _self.show();
}

function promptMessage(config){
    var _self = this;
    _self.status = "pendding";
    _self.type = "prompt";
    _self.value = "";
    _self.eventQueue = [];    
    _self.eventQueueCancel = [];
    configInit(config);

    _self.show = function () {
        _config.sureClick = _self.sure;
        _config.cancelClick = _self.cancel;
        documentFragmentCode(_self.type)
    }
    _self.sure = function () {
        _self.status = "success";
        _self.value = getValue();
        dialogRemove()
        _self.eventQueue.forEach(function (item) {
            Object.prototype.toString.call(item) === "[object Function]" ? item && item(_self.value) : "";
        });
    }
    _self.cancel = function () {
        _self.status = "cancel";
        dialogRemove()
        _self.eventQueueCancel.forEach(function (item) {
            Object.prototype.toString.call(item) === "[object Function]" ? item && item(_self.status) : "";
        });
    }

    _self.then = function (callback,cancelback) {
        if (_self.status === "success") {
            callback && callback();
        }
        if (_self.status === "pendding"){
            _self.eventQueue.push(callback)
        }
        if (_self.status === "cancel"){
            _self.eventQueueCancel.push(callback)
        }
    }
    _self.show();
}

var TM = {
    alert: function (config) { return new alertMessage(config) },
    confirm: function (config) { return new confirmMessage(config) },
    prompt: function (config) { return new promptMessage(config) },
}

// export default{
//     TM:TM
// }