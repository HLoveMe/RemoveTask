* 规范

	* 首句需要指定执行的shell环境(非必须)

		```
		#!/bin/bash
		```
	* 执行

		```
		1:给予执行权限 
			chmod 755 x.sh
			./x.sh
		
		2:直接sh执行
			sh x.sh
		
		```
	 * 概念
	 	
	 	```
	 	在Shell中 所有变量都是字符串
	 	```
	  
	* 引号的作用

		```
		单引号[']  单引号忽略被它括起来的所有特殊字符。
		双引号["]  双引号忽略大多数特殊字符 排除 （ $ ）、反引号（ ` ）、反斜杠（ \ ）
		反引号[`]  反引号要求 Shell 执行被它括起来的内容
		
		com='AAA'
		echo 'this is $com' ==this is $com
		
		name='zzh'
		echo "it name is $name" == it name is zzh
		
		com=`pwd`
		echo "a b at $com" == a b at /aa/bb			
		```
		
* 环境变量

	```
	执行 env 查看当前环境变量
	```
	```
	SHELL：指明目前你使用的是哪种 Shell。我目前用的是 Bash（因为 SHELL=/bin/bash）。

	PATH：是一系列路径的集合。只要有可执行程序位于任意一个存在于 PATH 中的路径，那我们就可以直接输入可执行程序的名字来执行，而不需要加上所在路径前缀或进入到可执行程序所在目录去执行。上一课我们已经学习过 PATH 了。
	
	HOME：你的家目录所在的路径。
	
	PWD：目前所在的目录。
	```
	```
	自定义环境变量[.bash .bashrc ...]
	export NAME=zhuzhu
	
	```
* 开发

	* 参数
		
		```
		commond par1 par2 ...
		
		$# ：包含参数的数目。
		$0 ：包含被运行的脚本的名称 （我们的示例中就是 variable.sh ）。
		$1：包含第一个参数。
		$2：包含第二个参数。
		…
		$8 ：包含第八个参数。
		
		```
	* 变量

		```
		name="zzh"
		
		echo "111 222 $name "
		```
	
	* 数组

		```
		array=('value0' 'value1' 'value2')
		
		array[3]="ccc"
		
		echo "array first value is ${array[1]}"
		
		echo ${array[*]}
		```
	* 逻辑运算

		```
		逻辑
			&& 
			||
			if [ a = "11" ] && [ b = "S" ]
		等于 | 不等于
			name="zzh"
			if [ $name = "zzh" ];then
				
			if
			
			if [ $name != "sss" ]
		
		反转
			！
			
			if [ ! -f $file ]
			
		如果
			if [ 条件 ]
			then
				a
			elif [ 条件 ]
			then
				b
			else
				c
			fi
		测试多个条件
			case
			
			case $name in
				"dog")
					echo a
				;;
				"A" | "C")
					echo a
				;;
				"ZZH*")
					echo 包含ZZH
				;;
				*)
					echo c
				;;
			esac
			
		while 循环
		
			while [ -z $name ] | [ $name  != "zzh" ]
			do
				echo
			done
			
		until 直到 true
		
			until [ "$name" = "朱子豪"]
			do
				read -p "please input name :" name
			done
			
		for
			
			for name  in "AA" "BB" "CC"
			do
				echo
			done
			
			for i in `seq 1 2 11`
			do
				echo $i
			done
			
			list=`ls`
			where=`pwd`
			for name in $list
			do
				echo "file is ==> $where/$name"
			done 	
		
		测试字符串
		
			-z $some  [ = ""] 为空
			
			-n $name  [ != "" ] 不为空
			
		测试数字
			-eq 是否相等
			-ne 是否不同
			-lt 是否小于
			-le 是否小于或等于
			-gt 是否大于
			-ge 是否大于或等于
			
			$num1 -eq $num2
			
		测试文件
			-e 是否存在
			-d 是否是文件夹
			-f 是否为文件
			-L 是否为连接
			-r 是否可读
			-w 是否可写
			-x 是否可执行
			-nt 是否更新
			-ot 是否更旧
			
			[ -f $file ]
			
			[ $file1 -ot $file2 ]
		```
* 函数

	* 定义
		
		```
		function ABD{}
		
		ABD(){}
		
		```
	* 参数

		```
		ABCD(){
			$1 $2 ...... ${10} ${11} 第十个参数之后用{}
			
			$#	传递到脚本的参数个数
			$*	以一个单字符串显示所有向脚本传递的参数
			$$	脚本运行的当前进程ID号
			$!	后台运行的最后一个进程的ID号
			$@	与$*相同，但是使用时加引号，并在引号中返回每个参数。
			$-	显示Shell使用的当前选项，与set命令功能相同
		}
		```
	* 变量作用域

		```
		var1="AAA"
		var2="BBB" 
		echo $var1 $var   "AAA" "BBB"
		
		function dome{
			local var1 = "CCC"
			echo $var1 $var2 "CCC" "BBB"
			var1 = "DDD"
			var2="EEE"
		}
		dome 执行函数
		
		echo $var1 $var2  "AAA" "EEE"
		
		```
		
	* 调用
		
		```
		ABCD(){}
		
		ABCD
		或者
		ABCD 1 2 3
		```
	* return | 返回值

		```
		ABCD(){
		
			return 0-255 只能返回一个数字
			如果没有return 会将最后一句命令的返回结果作为返回值	
		}
		
		ABCD(){
			...
			ls -la 
		}
		
		
		得到返回值 $? [只能得到最后一个函数执行结果]
			ABCD 参数...
			echo "ABCD 执行结果为 $?"
		
		```
	
	* 命令重载

		```
		ls(){
			#调用系统命令
			command ls -la 
		}
		ls
		```