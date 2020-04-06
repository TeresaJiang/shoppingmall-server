//在后端的模块中建立goods.js文件，并引入mongoose。用来创建与数据库相关的对象。
var mongoose=require('mongoose')
var Schema=mongoose.Schema;//调用schema的api创建对象
var productSchema=new Schema({
    "productId":String,
    "productName":String,
    "salePrice":Number,
    "productImage":String,
    "productNum":Number,
    "checked":String
});//创建productSchema对象，对象的属性要和数据库中的参数相对应。
module.exports=mongoose.model('Good',productSchema);//暴露出对象接口
//此处Good会自动与数据库中goods连接，一定要为goods，如果不是，则需要改写为
//module.exports = mongoose.model('Good',productSchema,'mongoName')mongoName为数据集合的名字。