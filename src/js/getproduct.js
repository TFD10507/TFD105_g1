
// 當點擊加入購物車
$(document).on("click", function (e) {
    if ($(e.target).hasClass('submit')) {
        $('#cart_side_list').find('li').remove();
        getproduct.start_cart();
    }
});


let getproduct = new Vue({
    el: '#cart_side_list',
    data() {
        return {
            carts:[],
        }
    },
    methods: {
        // 頁面上的數量控制鍵 -> 減
        sub_btn() {
            if (this.count < 2) {
                this.count = 1;
            } else {
                this.count--;
            }
        },
        // 頁面上的數量控制鍵 -> 加
        add_btn() {
            this.count++;
        },
        start_cart() {
            const self = this
            let cart = JSON.parse(sessionStorage.getItem("cart"));
            if (cart) {
                for (let i = 0; i < cart.length; i++) {
                    let goods = {
                        id: '',
                        count: '',
                    }
                    goods.id = cart[i].id;
                    goods.count = cart[i].count;
                    $.ajax({
                        url: 'php/getproductInfo.php',
                        type: 'POST',
                        data: {
                            id: cart[i].id,
                        },
                        dataType: 'json',
                        success: function (res) {
                            goods.pic=res[0].pic
                            goods.price=res[0].price
                            goods.names=res[0].names
                            self.carts.push(goods)

                            // console.log(self.carts);

                        //     $('#cart_side_list').prepend(`
                        //     <li class="detail" data-id="${cart[i].id}">
                        //         <div class="img">
                        //             <img src="${res[0].pic}">
                        //         </div>
                        //         <div class="info ps-5">
                        //             <div class="pname">${res[0].names}</div>
                        //             <div class="count">
                        //                 <div><span class="num-jian">-</span></div>
                        //                 <div><input type="text" class="input-num" value="${cart[i].count}"/></div>
                        //                 <div><span class="num-jia">+</span></div>
                        //             </div>
                        //             <div class="price">${res[0].price * cart[i].count}</div>
                        //             <div class="operate">
                        //                 <a href="#" class="del">
                        //                     <i class="fas fa-trash-alt"></i>
                        //                 </a>
                        //                 <a href="#" class="heart">
                        //                     <i class="far fa-heart"></i>
                        //                 </a>
                        //             </div>
                        //         </div>
                        //     </li>
                        // `)
                        },
                    })
                }
            }
        },
    },
    created() {
        this.start_cart();
    },
})



// $(document).on("click", function (e) {
//     let getId = $(e.target).closest('li').data('id');
//     let getData = JSON.parse(sessionStorage.getItem('cart'));
//     if ($(e.target).hasClass('del') || $(e.target).hasClass('fa-trash-alt')) {
        
//     }
// });

