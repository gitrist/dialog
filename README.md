# dialog移动端弹框封装
## alert  confirm prompt   体积大小几k
### 使用方式
在index.html中引入dist目录下的index.min.js和style.css
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        button{
            padding: 10px 12px;
            margin: 10px;
        }
    </style>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <button onclick="Talert()">alert</button>
    <button onclick="Tconfirm()">confim</button onclick="Talert()">
    <button onclick="Tprompt()">prompt</button onclick="Talert()">
    <script src="./index.min.js"></script>
    <script>
        function Talert() {
            TM.alert(`1`).then(function (res) {
                console.log(123);
            });
        }
        function Tconfirm() {
            TM.confirm("123").then(function (res) {
                console.log(123);
            });
        }
        function Tprompt() {
            TM.prompt("123").then(function (res) {
                console.log(res);
            });
        }
    </script>
</body>

</html>
    
```


![avatar](https://github.com/gitrist/dialog/blob/master/assert/alert.jpg)
![avatar](https://github.com/gitrist/dialog/blob/master/assert/confirm.jpg)
![avatar](https://github.com/gitrist/dialog/blob/master/assert/prompt.jpg)

访问地址：<https://gitrist.github.io/dialog/dist/>
