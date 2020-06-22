# 如何新增一个波浪线

## 使用顺序
1. 参考`examples/example01-includeUi.html`底部的script引入
新增了这个脚本
```
<script type="text/javascript" src="./js/waveLine.js"></script>
```

2. 修改Line绘图方法
参考`src/js/component/line.js`
也自己可以新增一个Wave.js来实现这块的波浪线逻辑

3. 核心变动点
```
this._line = new fabric.WaveLine(points, {
    stroke: this._oColor.toRgba(),
    strokeWidth: this._width,
    evented: false
});
```

这块替换掉旧的fabric.Line 使用WaveLine来实现Line的绘制。

## 如何预览
1. 先安装依赖
```
npm install
```

2. 本地启动
```
npm run serve
```

3. 访问
http://0.0.0.0:8080/examples/example01-includeUi.html