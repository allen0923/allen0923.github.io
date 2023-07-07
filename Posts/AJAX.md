 <link rel="stylesheet" href="./css/markdown-css.css">


# **AJAX**

什么是AJAX？

AJAX是Asynchronous JavaScript and XML.简单点说，就是使用XMLHttpRequest对象与服务通信。它可以使用JSON, XML, HTML， 和text文本等格式发送和接受数据。AJAX最吸引人的就是它的异步特性，也就是说它可以在不重新刷新页面的情况下与服务器通信，交换数据，或更新页面。

## Axios

### axios的基本用法

语法：

1. 引入axios.js： https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js
2. 使用axios函数
   · 传入配置对象
   · 再用.then回调函数接收结果，并做后续处理

   ```java
   axios({
   	url:'目标资源地址'
   }).then((result)) => {
   	//对服务器返回的数据做后续处理
   })
   ```

   3.例子

```html
!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>01.Axios</title>
</head>

<body>
	<p class="my-p"></p>
	<!--
		axios库地址: https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js
		省份数据地址：https://hmajax.itheima.net/api/province
		目标： 使用Axios库，获取省份列表数据，展示到页面上
	-->
	//1.引入Axios库
	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

	//2.使用Axios函数
	<script>
	    axios({
		url: 'https://hmajax.itheima.net/api/province'
		}).then(result => {
		   console.log(result)
		   //拿到省份数据
		   console.log(result.data.list)
		   console.log(result.data.list.join('<br>'))
		   //把准备好的省份列表，插入到页面
		   document.querySelector('.my-p').innerHTML = result.data.list.join ('<br>')
	   })
	<script>
<body>
<html>
```

### axios-查询参数

语法： 使用axios提供的params选项  （注意： axios在运行时把参数名和值，会拼接到url?参数名=值）

```java
axios({
	url: '目标资源地址和'，
	params:{
	   参数名：值
	}
}).then((result)) => {
	//对服务器返回的数据做后续处理
})
```

例子:

```html
!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>02.URL</title>
</head>

<body>
	<p> </p>
	<!--
		城市列表：https://hmajax.itheima.net/api/city
		参数名： pname
		值：省份名字
	-->
	//1.引入Axios库
	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

	//2.使用Axios函数
	<script>
		axios({
			url: 'https://hmajax.itheima.net/api/city' 
			//查询参数
			params: {
		  	   pname: 'HeBeiSheng'  //你想查询的特定的值
		        }
		}).then(result => {
		   console.log(result)
		   //拿到城市列表数据
		   console.log(result.data.list)
		   //把准备好的城市列表，插入到页面
		   document.querySelector('p').innerHTML = result.data.list.join ('<br>')
		})
	<script>
<body>
<html>
```

### axios-数据注册/请求配置

url: 请求的URL网址

method：请求的方法

data：提交数据

```html
axios({
	url: '目标资源地址和'，
	method: '请求方法‘，
	data: {
	  参数名： 值
	}
}).then((result)) => {
	//对服务器返回的数据做后续处理
})
```

例子：

注册账号

需求： 通过axios提交用户名和密码，完成注册功能

注册用户URL地址：http://hmajax.itheima.net/api/register

请求方法：POST

参数名： username 用户名（中英文和数字组成，最少8位）；password 密码 （最少6位）

```html
!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>02.URL</title>
</head>

<body>
	<p> </p>
	<!--
		注册用户URL地址：http://hmajax.itheima.net/api/register
		请求方法：POST
		参数名： username 用户名（中英文和数字组成，最少8位）；password 密码 （最少6位）
	-->
	//1.引入Axios库
	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

	//2.使用Axios函数
	<script>
		document.querySelector('.btn').addEventListener
		('click', () => {
		     axios({
			//注册用户URL地址
			url:'http://hmajax.itheima.net/api/register'
			//指定请求方法
			method: 'POST',
			//提交数据
			data: {
			//参数名
			   username: 'handsomeallen123',
			   password: '1234567'
			}
		}).then(result => {
			console.log(result)
		})
	      })
	<script>
<body>
<html>

```

### axios-错误处理

场景：再次注册相同的账号，会遇到报错信息

处理：用更直观的方式，给普通的用户展示错误信息

语法：在then方法的后面，通过点语法调用catch方法，传入回调函数并定义形参

```html
axios({
   //请求选项
}).then(result => {
   //处理错误
}).catch(error => {
   //处理错误
})
```

例子：

```html
!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>02.URL</title>
</head>

<body>
	<p> </p>
	<!--
		延用axios数据注册代码
		使用axios错误处理语法，拿到报错信息，弹框反馈给用户
	-->
	//1.引入Axios库
	<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

	//2.使用Axios函数
	<script>
		document.querySelector('.btn').addEventListener
		('click', () => {
		     axios({
			//注册用户URL地址
			url:'http://hmajax.itheima.net/api/register'
			//指定请求方法
			method: 'POST',
			//提交数据
			data: {
			//参数名
			   username: 'handsomeallen123',
			   password: '1234567'
			}
		}).then(result => {
			console.log(result)
		//处理错误
		}).catch(error => {
			console.log(error)
			//提取错误原因
			console.log(error.response.data.message)
			//弹窗反馈给用户
			alert(error.response.data.message)
		})
	      })
	<script>
<body>
<html>


```

## HTTP协议

定义：规定了浏览器发送及服务器返回内容的格式

### 请求报文

定义：浏览器按照HTTP协议要求的格式，发送给服务器的内容

组成：

    · 请求行：请求方法，URL, 协议

    ·请求头：以键值对的格式携带的附加信息，比如：Content-Type

    ·空行：分隔请求头，空行之后的是发送给服务器的资源

    ·请求体： 发送的资源

例子：

```html
//POST请求方法+URL网址+HTTP协议（请求行）
POST http://hmajax.itheima.net/api/register HTTP/1.1

Host: hmajax.itheima.net
Connection: keep-alive
Content-Length: 46
Accept: application/json, text/plain, */*
User-Agent: Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36(KNTML, like Gecko) Chrome/107.0.0.0 Safari/537.36

//请求内容数据类型（请求头）
Content-Type: application/json

Origin: http://127.0.0.1:5500
Referer:  http://127.0.0.1:5500/
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9

//提交的用户名和密码（请求体）
{"Username":"handsomeallen","password":"1234567"}
```

### 响应报文

定义： 服务器按照HTTP协议要求的格式，返回给浏览器的内容

    1.响应行（状态行）：协议，HTTP响应状态码，状态信息

    2.响应头：以键值对的格式携带的附加信息，比如：Content-Type

    3.空行： 分隔响应头，空行之后的服务器返回的资源

    4.响应体： 返回的资源

    5.例子：

```
HTTP/1.1 400 Bad Request
Server: nginx
Date: Wed, 09 Nov 2022 13:26:06 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 54
Connection： keep-alive
Vary: Origin
Access-Control-Allow-Origin: http://127.0.0.1:5500
Access-Control-Allow-Credentials: true
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block
x-content-type-options: nosniff
x-download-options: noopen
x-readtime:16

{"code"=“10005”，“message"="账号被占用"，”data":null"}
```

HTTP响应状态码： 用来表明请求是否成功完成

比如：404（防御武器找不到资源）

| 状态码 | 说明       |
| :----- | ---------- |
| 1xx    | 信息       |
| 2xx    | 成功       |
| 3xx    | 重定向消息 |
| 4xx    | 客户端错误 |
| 5xx    | 服务端错误 |

### form-serialize 插件

作用： 快速收集表单元素的值

语法：

```java
const form = document.querySelector('.example-form')

const data = serialize(form, {hash: true, empty: true })
```

例子：

```html
!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>02.URL</title>
</head>

<body>
	<form action="javascript:;" class="example-form">
	   <input type="text" name="uname">
	   <br>
	   <input type="text" name="pud">
	   <br>
	   <input type="button" class="btn" value="提交">
	</form>

	<!--
	   目标：在点击提交时，使用form-serialize插件，快速收集表单元素值
	   1.把插件引入到自己的网页中
	-->
	<script src="./lib/form-serialize.js"></script>
	<script>
	   document.querySelector('.btn').addEventListener('click;, () => {
	   /**
		2.使用serialize函数，快速手机表单元素的值
		参数1： 要获取哪个表单的数据
		表单元素设置name属性，值会作为对象的属性名
		参数2： 配置对象
		hash 设置获取数据结构
			-true: JS对象（推荐）一般请求体里提交给服务器
			-false:查询字符串
		empty 设置是否获取空值
			-true: 获取空值（推荐）
			-false：不获取空值
	   */
	   const form = document.querySelector('.example-form')
	   const data = serialize(form, { hash: true, empty: true })
	   console.log(data)
	  
	 })
	<script>
<body>
<html>



```

1
