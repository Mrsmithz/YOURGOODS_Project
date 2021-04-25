const url = {
    resgister:'http://localhost:25800/api/auth/register',
    login:'http://localhost:25800/api/auth/login',
    session:'http://localhost:25800/api/auth/get/session',
    logout:'http://localhost:25800/api/auth/logout',
    customer:{
        createRequest:'http://localhost:25800/api/request/createRequest',
        getAllRequestByCustomerId:'http://localhost:25800/api/request/getAllRequestByCustomerId',
        deleteRequestById:'http://localhost:25800/api/request/deleteRequestById/',
        editRequestById:'http://localhost:25800/api/request/editRequest/'
    },
    contacts:{
        sendMessage:'http://localhost:25800/api/contacts/sendMessage',
        getMessageBySender:'http://localhost:25800/api/contacts/getMessageBySender',
        getMessageByReceiver:'http://localhost:25800/api/contacts/getMessageByReceiver',
        updateMessageStatus:'http://localhost:25800/api/contacts/updateMessageStatus',
        getNameById:'http://localhost:25800/api/contacts/getName/',
        getUnReadMessageByReceiver:'http://localhost:25800/api/contacts/getUnReadMessageByReceiver'
    },
    Goods:{
        createGoods:'http://localhost:25800/api/goods/create',
        editGoodsById:'http://localhost:25800/api/goods/edit/',
        getGoodsById:'http://localhost:25800/api/goods/by/id/',
        getGoodsByOrderId:'http://localhost:25800/api/goods/by/order/',
        deleteGoodsById:'http://localhost:25800/api/goods/by/id/',
        deleteGoodsByOrderId:'http://localhost:25800/api/goods/by/order/'
    },
    Operator:{
        getRequestByOperatorId:'http://localhost:25800/api/request/getAllRequestByOperatorId'
    },
    Order:{
        getOrderByRequestId:'http://localhost:25800/api/orders/get/request/',
        createOrder:'http://localhost:25800/api/orders/create',
        getOrderById:'http://localhost:25800/api/orders/get/'
    }
}

export default url
