## Skeleton 骨架屏

在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。

### 基础用法

基础的骨架效果。

:::demo

```html
<el-row>
    <el-col :span="4" style="margin-bottom:20px;">
      <cw-skeleton></cw-skeleton>
    </el-col>
    <el-col :span="4" >
      <el-row :gutter="20">
            <el-col :span="12" style="margin-bottom:20px;">
                <cw-skeleton :proportion="0.2"></cw-skeleton>
            </el-col>
            <el-col :span="24" style="margin-bottom:20px;">
                <cw-skeleton :proportion="0.1"></cw-skeleton>
            </el-col>
            <el-col :span="24" style="margin-bottom:20px;">
                <cw-skeleton :proportion="0.1"></cw-skeleton>
            </el-col>  
         </el-row>                
     </el-col>
  </el-row>
```
:::




### Skeleton Attributes

| 参数     | 说明                                        | 类型    | 可选值       | 默认值 |
| -------- | ------------------------------------------- | ------- | ------------ | ------ |
| width | 占位长度                                | String | - | false  | 100%
| height    | 占位宽度 | String  | -      |-      |1
| proportion  | 高、宽比                    | Number | -| 1 |
| bgColor     | 背景色                              | String  | —       | #b4bccc      |