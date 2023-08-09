// 随便写了一个js 用于说明数据类型的
var product = {
  'pmsSkuStockList': [
    {
      'id': 'string', // 如果是新增 不需要
      'lockStock': 0, // 锁定库存
      'lowStock': 0, // 库存警戒线
      'pic': 'string', // 图片
      'price': 0, // 当前价格
      'productId': 'string', // 商品的id,如果是新增,不需要
      'promotionPrice': 0, // 单品促销价格
      'sale': 0, // 销量
      'skuCode': 'string', // sku的编码,手动填写
      // spData:  [{"key":"颜色","value":"蓝色"},{"key":"容量","value":"32G"}]
      'spData': 'string', // sku属性，json格式String类型 ,
      'stock': 0 // 库存
    }
  ],
  'product': {
    'albumPics': 'string', // 画册图片，连产品图片限制为5张，以逗号分割 ,会在移动端商品详情页展示
    'brandId': 'string', // 关联的 品牌id
    'brandName': 'string', // 品牌名称
    'createTime': '2021-08-19T06:10:12.128Z', // 不需要,后台生成
    'deleteStatus': 0, // 不需要,标记删除用, 后台自动处理
    'description': 'string', // 意式极简北欧轻奢卧室电视柜高款现代北欧储物柜小户型精品家具 卧室电视柜（两门）
    // detail是进入详情页展示的内容
    'detailDesc': 'string', // 副标题 家具新品大赏：1件7.5折，2件7.2折，满额在享2%现金返现，超值好礼送不停！时间：11.14-11.20
    'detailHtml': 'string', // 不需要用
    'detailMobileHtml': 'string', // 移动端展示方式,商品的富文本内容,放到这个字段
    'detailTitle': 'string', // 标题 简野 电视柜 意式极简北欧轻奢卧室电视柜高款现代北欧储物柜小户型精品家具 卧室电视柜（两门）
    'feightTemplateId': 'string', // 不需要 邮寄模板(预留)
    'giftGrowth': 0, // 赠送的成长值(预留)
    'giftPoint': 0, // 赠送的积分(预留)
    'id': 'string', // 商品id,新增不需要,后台生成
    'keywords': 'string', // 关键词,逗号分割,  地中海,凳子,xxx
    'lowStock': 0, // 预警库存(预留)
    'modifyTime': '2021-08-19T06:10:12.128Z', // 不需要,后台生成
    'name': 'string', // 商品名称 简野（JIANYE）ZY-22
    'newStatus': 0, // 新品状态:0->不是新品；1->新品 ,新品会在移动端首页推荐
    'note': 'string', // 备注,比如小舅子供货不入账 ,
    'originalPrice': 0, // 原价
    'pic': 'string', // 封面图片
    'previewStatus': 0, // 是否为预告商品：0->不是；1->是 ,
    'price': 0, // 当前价格
    'productAttributeCategoryId': 'string', // 不需要, 产品属性分类 ,
    'productCategoryId': 'string', // 分类id
    'productCategoryName': 'string', // 分类名称
    'productSn': 'string', // 商品编码,需要手填.
    // promotion都可以不填,可以通过营销管理处理
    'promotionEndTime': '2021-08-19T06:10:12.128Z', // 可以不填. 促销结束时间 ,可以通过营销管理修改
    'promotionPerLimit': 0,
    'promotionPrice': 0,
    'promotionStartTime': '2021-08-19T06:10:12.128Z',
    // 促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购 ,
    'promotionType': 0,
    // 上架状态：0->下架；1->上架 ,
    'publishStatus': 0,
    // 推荐状态；0->不推荐；1->推荐 ,
    'recommendStatus': 0,
    // 销量,不用处理
    'sale': 0,
    //  以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮 ,
    'serviceIds': 'string', // 1,2
    'sort': 0, // 排序,降序.值越大越靠前
    'stock': 0, // 库存
    'subTitle': 'string', // 二级标题
    'unit': 'string', // 单位,比如 斤/辆/台
    'usePointLimit': 0, // 不需要,如果有积分,当前商品可以最多使用多少积分
    'verifyStatus': 0, //  审核状态：0->未审核；1->审核通过 ,
    'weight': 0 // 商品重量，默认为千克
  }
}
console.log(product)
