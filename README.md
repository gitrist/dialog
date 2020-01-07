# dialog移动端弹框封装
## alert  confirm prompt   体积大小几k
### 使用方式
在index.html中引入dist目录下的index.min.js和style.css
```
    <link rel="stylesheet" href="./style.css">
    <script src="./index.min.js"></script>
```
![avatar](data:image/jpg;base64,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)