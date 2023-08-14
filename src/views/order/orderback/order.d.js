var orderBase = {
  'id': '1428995976453148674', // 订单的id
  'memberId': '1308229337176702977', // 产生订单的客户端用户id
  'couponId': null, // 关联购物券id
  'orderSn': '878675502972538880', // 订单编号
  'memberUsername': '17596496508', // 客户端用户名称,一般是手机号
  'totalAmount': 149900, // 总金额
  'payAmount': 149900, // 实际支付金额
  'freightAmount': null, // 邮费
  'promotionAmount': null, // 活动减免的金额
  'integrationAmount': null, // 积分抵扣金额
  'couponAmount': null, // 优惠券抵扣金额
  'discountAmount': null, // 管理员后台调整订单使用的折扣金额(预留)
  'payType': 2, // 支付类型  0 未支付 ; 1 支付宝; 2 微信
  'sourceType': 1, // 订单来源：0->PC订单；1->app订单
  'status': 1, // 订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭；5->无效订单
  'orderType': null, // 订单类型：0->正常订单；1->秒杀订单
  'deliveryCompany': null, // 物流公司(配送方式)
  'deliverySn': null, // 物流单号
  'autoConfirmDay': null, // 自动确认时间（天）(预留,这里无效)
  'integration': null, // 可以获得的积分
  'growth': null, // 可以活动的成长值
  'promotionInfo': null, // 活动信息
  'billType': null, // 发票类型：0->不开发票；1->电子发票；2->纸质发票
  'billHeader': null, // 发票抬头
  'billContent': null, // 发票内容
  'billReceiverPhone': null, // 收票人电话
  'billReceiverEmail': null, // 收票人邮箱
  'receiverName': '胖子', // 收货人姓名
  'receiverPhone': '13215661047', // 收货人电话
  'receiverPostCode': '', // 收货人邮编
  'receiverProvince': '河北省', // 省份/直辖市
  'receiverCity': '秦皇岛市', // 城市
  'receiverRegion': '山海关区', // 区
  'receiverDetailAddress': '傲娇', // 详细地址
  'note': null, // 备注
  'confirmStatus': null, // 确认收货状态：0->未确认；1->已确认
  'deleteStatus': 0, // 标记删除(后台使用,前台忽略)
  'useIntegration': null, // 下单时使用的积分
  'paymentTime': '2021-08-21 16:24:30', // 支付时间
  'deliveryTime': null, // 发货时间
  'receiveTime': null, // 确认收货时间
  'commentTime': null, // 评价时间
  'finishTime': null, // 退货结束时间
  'createTime': '2021-08-21 16:22:45', // 创建时间
  'modifyTime': '2021-08-21 16:24:30' // 更新时间
}
var orderItem = {
  'id': '1428995976453148675', // id只是为了区分一个订单的多个商品
  'orderId': '1428995976453148674', // 订单的id
  'orderSn': '878675502972538880', // 订单编号
  'productId': '1428993355751346177', // 商品id
  // 商品封面图
  'productPic': 'https://img0.baidu.com/it/u=1374154583,1635124570&fm=26&fmt=auto&gp=0.jpg',
  // 商品当前sku的图片
  'productSkuPic': 'https://img1.baidu.com/it/u=1920333544,2898738499&fm=26&fmt=auto&gp=0.jpg',
  'productName': '泸州老窖1573(测试)', // 商品名称
  'productBrand': '安宝宝', // 品牌名称
  'productSn': 'lz1001', // 商品的编码
  // 商品价格.  商品价格不代表购物价格. 这里使用的是商品sku的价格.
  // 某些情况下,商品价格可能和sku价格不同,比如iphone12 128g 5999; iphone12(蓝色) 128g 6999
  'productPrice': 1499,
  'productQuantity': 1, // 购买数量
  'productSkuId': '1428993355818455042', // 商品sku的id
  'productSkuCode': '12', // sku的编号
  'productCategoryId': '1308339256886423554', // 分类id
  'promotionName': null, // 活动名称
  'promotionAmount': null, // 活动金额
  'couponAmount': null, // 优惠券金额
  'integrationAmount': null, // 积分抵扣金额
  'realAmount': 149900, // 真是支付金额
  'totalPrice': 149900, // 总价格
  'giftIntegration': 0, // 成长积分
  'giftGrowth': 0, // 成长值
  'isReturn': 0, // 是否退单: 0 否  ;  1  是
  'returnId': null, // 退单id
  'cartId': null, // 购物车id. 预留
  // sku被序列化为字符串
  'productAttr': '[{"key":"颜色","value":"土豪金"},{"key":"容量","value":"64g"}]',
  'createTime': '2021-08-21 16:22:45',
  'modifyTime': '2021-08-21 16:22:45'
}

console.log(orderBase, orderItem)
