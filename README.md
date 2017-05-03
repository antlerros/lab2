# Lab2
## Steps

- 開啟tessel2的access point
	```
	t2 ap -n <access_point_name>
	```
- 將電腦連上此access point
- 將server deploy
	```
	t2 run server.js
	```
- ambient module ready（可從terminal看到） 
- browser request [192.168.1.101:8001/display.html](192.168.1.101:8001/display.html)便可以從 browser觀看音量大小的變化。同時，若是音量超過閥值，便會使開發版上的led燈閃爍。

## Report
- [Report Link](https://github.com/antlerros/lab2/blob/master/Report.md)