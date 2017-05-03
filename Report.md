

# Lab2 Report
利用ambient module去蒐集外界的聲音，將音量的變化在browser用D3這個module畫出來。同時對此振幅偵測設置閥值，若是音量超過閥值，便會使開發版上的led燈閃爍。

## 執行步驟
1. 開啟tessel2的ap
	```
	t2 ap -n <access_point_name>
	```
2. 將電腦連上此ap
3. 將server deployed
	```
	t2 run server.js
	```
4. ambient module ready（可從terminal看到） 
5. browser request [192.168.1.101:8001/display.html](192.168.1.101:8001/display.html)便可以從 browser觀看音量大小的變化。同時，若是音量超過閥值，便會使開發版上的led燈閃爍。

## Input

在tessel2上架一個web server，利用socket的方式來傳遞讀取的data給connect到的client並visualize。

以下為tessel讀取音量部份的程式碼：

- 我們將server開在tessel ap的ip address: 192.168.1.101，並利用socket.io 跟client傳資料。
	```
	server.listen(8001);
	console.log('running at 192.168.1.101:8001...');
	var serv_io = io.listen(server);
	```
- 在ambient的module確認ready之後，我們將trigger設定在0.01。ambient 音量大小的scale為 0~1，因此0.01看起來算是滿小的，原因在於我們希望能夠偵測到所有的data並將他顯示於browser上。
	```
	ambient.on("ready", function(){
		ambient.setSoundTrigger(0.01);
		console.log('ready');
		...
	}
	```

- 在設定好trigger後，這邊我們要求client要先connect到server，在開始進行ambient對音量data的採集。原因在於在connect之後採集的data才能夠被visualize。
	```
	serv_io.sockets.on('connection', function(socket){
		console.log('connected');
		...
	}
	```
- 最後一部份，當ambient的trigger被啟動後，會用socket.emit的方式將data傳送至client。
	```
	ambient.on("sound-trigger",function(sounddata){
				
		console.log(sounddata.toFixed(8));
		setInterval(function(){
			socket.emit('volume', {'volume': sounddata.toFixed(8)});
		}, 500);
	```

## Output

我們將閥值設定在0.18，大約是一次拍手所發出的音量。當偵測到的data超越閥值時，tessel上的led燈會短暫的閃爍來告知。
