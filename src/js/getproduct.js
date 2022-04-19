
// 當在頁面上點擊加入購物車時，讓側邊欄裡的值會跟著變動
$(document).on("click", function (e) {
    if ($(e.target).hasClass('submit')) {
        $('#cart_side_list').find('li').remove();
        // 強迫再跑一次start_cart
        getproduct.start_cart();
    }
});


let getproduct = new Vue({
    el: '#cart_side_list',
    data() {
        return {
            carts: [],
        }
    },
    methods: {
        start_cart() {
            const self = this;
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
                            goods.pic = res[0].pic
                            goods.price = res[0].price
                            goods.names = res[0].names
                            self.carts.push(goods)
                            // console.log(self.carts);
                        },
                    })
                }
            }
        },
        add(item) {
            item.count++;
            this.updated_session(item);
        },
        reduce(item) {
            if (item.count > 1) {
                item.count--;
                this.updated_session(item);
            }
        },
        del(index) {
            // 畫面的carts刪除
            this.carts.splice(index, 1);
            // sessionStorage 的 cart 刪除
            let cart = JSON.parse(sessionStorage.getItem("cart"));
            for (let i = 0; i < cart.length; i++) {
                if (cart[0].id == cart[i].id) {
                    cart.splice(i, 1);
                }
            }
            sessionStorage.setItem('cart', JSON.stringify(cart))
        },
        updated_session(item) {
            let cart = JSON.parse(sessionStorage.getItem("cart"));
            for (let i = 0; i < cart.length; i++) {
                if (item.id == cart[i].id) {
                    cart[i].count = item.count
                }
            }
            sessionStorage.setItem("cart", JSON.stringify(cart));
        },
    },
    created() {
        this.start_cart();
    },
})



