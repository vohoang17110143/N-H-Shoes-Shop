(this.webpackJsonpshop_cp=this.webpackJsonpshop_cp||[]).push([[11],{302:function(t,e,n){},323:function(t,e,n){"use strict";n.r(e);var r=n(52),o=n.n(r),c=n(53),a=n(0),s=n(23),i=n(99),u=n(22),l=(n(24),n(77)),d=(n(116),n(68)),h=(n(81),n(302),n(57)),f=n(2),b=(n(73),n(63)),p=n(87),g=n(10);e.default=Object(s.b)((function(t){return{orders:t.OrderList,AuthToken:t.AuthToken}}),(function(t){return{fetchOrder:function(e){t(Object(i.a)(e))}}}))((function(t){var e=t.orders,n=t.AuthToken,r=(Object(f.g)(),function(){var e=Object(c.a)(o.a.mark((function e(){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!0!==n.isLoggedIn){e.next=5;break}return e.next=3,l.a.getUserOrder(n.cusID);case 3:r=e.sent,t.fetchOrder(r);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),s=(new p.a).withUrl("https://localhost:5001/hubs/shopshoe").withAutomaticReconnect().build();Object(a.useEffect)((function(){r(),s.start().then((function(t){console.log("result"),s.on("Receiving_Order",(function(){r()}))})).catch((function(t){return console.log("Connection failed: ",t)}))}),[]);var i=function(){var e=Object(c.a)(o.a.mark((function e(){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.getUserOrder(n.cusID);case 2:r=e.sent,t.fetchOrder(r);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(g.jsxs)("div",{style:{textAlign:"center",marginRight:"3em"},children:[Object(g.jsx)("strong",{style:{fontSize:"30px"},children:"\u0110\u01a1n \u0111\u1eb7t h\xe0ng c\u1ee7a b\u1ea1n"}),Object(g.jsx)(h.k,{items:e,fields:[{key:"orderId",label:"STT",_style:{width:"1%"}},{key:"dateOrder",label:"Ng\xe0y \u0111\u1eb7t h\xe0ng",_style:{width:"15%"}},{key:"totalCost",label:"T\u1ed5ng gi\xe1",_style:{width:"11%"}},{key:"typePayment",label:"H\xecnh th\u1ee9c thanh to\xe1n",_style:{width:"15%"}},{key:"status",label:"Tr\u1ea1ng th\xe1i \u0111\u01a1n h\xe0ng",_style:{width:"18%"}},{key:"action",label:"",_style:{width:"12%"},sorter:!1,filter:!1},{key:"show_details",label:"",_style:{width:"10%"},sorter:!1,filter:!1}],columnFilter:!0,tableFilter:!0,footer:!0,itemsPerPageSelect:!0,itemsPerPage:5,hover:!0,sorter:!0,pagination:!0,scopedSlots:{action:function(t,e){return Object(g.jsx)("td",{children:"Wait_For_Confirmation"==t.status?Object(g.jsx)("button",{type:"button",className:"btn btn-danger",onClick:function(){return e=t.orderId,void l.a.cancelOrder(e,{status:"Cancelled"}).then((function(t){d.b.success("H\u1ee7y \u0111\u01a1n h\xe0ng th\xe0nh c\xf4ng !"),i()})).catch((function(t){return d.b.error("H\u1ee7y \u0111\u01a1n h\xe0ng th\u1ea5t b\u1ea1i !")}));var e},children:"H\u1ee7y \u0111\u01a1n"}):"Delivering"==t.status&&"Online"==t.typePayment?Object(g.jsx)("button",{type:"button",class:"btn btn-primary",onClick:function(){return e=t.orderId,void l.a.PaypalCheckout(e).then((function(t){window.open(t).focus()})).catch((function(t){return alert(t)}));var e},children:"Thanh to\xe1n"}):null},t.orderId)},orderId:function(t,e){return Object(g.jsx)("td",{children:e+1})},totalCost:function(t){return Object(g.jsxs)("td",{style:{textAlign:"left"},children:[Object(b.a)(t.totalCost)," \u0111"]})},show_details:function(t,e){return Object(g.jsx)("td",{children:Object(g.jsx)(u.b,{to:{pathname:"/userinfo/detail/".concat(t.orderId),state:{orderItems:t.orderDetailDTOs,totalCost:t.totalCost,status:t.status,orderId:t.orderId}},children:Object(g.jsx)("button",{type:"button",className:"btn btn-success",children:"Chi ti\u1ebft"})})},t.orderId)}}})]})}))},63:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(t){for(var e=t.toString(),n=[],r=0;r<e.length;r++)n.push(e[r]);for(var o=n.length-3;o>0;o-=3)n.splice(o,0,".");return n}},77:function(t,e,n){"use strict";var r=n(59),o={createOrder:function(t){return r.a.post(r.a.url.orders,t).then((function(t){return t.data}))},getUserOrder:function(t){return r.a.get(r.a.url.orders+"?customerId="+t).then((function(t){return t.data}))},cancelOrder:function(t,e){return r.a.put(r.a.url.orders+"confirmOrder/"+t,e).then((function(t){return t.data}))},PaypalCheckout:function(t){return r.a.get(r.a.url.orders+"checkout/"+t).then((function(t){return t.data}))}};e.a=o},99:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n(73);var r=n(3),o=function(t){return{type:r.g,order:t}}}}]);
//# sourceMappingURL=11.c0a7ae5a.chunk.js.map