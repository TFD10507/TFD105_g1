function loginMember(msg, icon, html) {

    Swal.fire({
        title: msg,
        icon: icon,
        html: html,
        
        showConfirmButton: false, // 確認按鈕（預設會顯示不用設定）
        confirmButtonText: '參加活動', //　按鈕顯示文字
        confirmButtonAriaLabel: '參加活動', // 網頁無障礙用
        confirmButtonColor: '#75706b', // 修改按鈕色碼

        // 使用同確認按鈕
        // showDenyButton: true, // 否定按鈕
        showCancelButton: false, // 取消按鈕

        buttonsStyling: false, // 是否使用sweetalert按鈕樣式（預設為true）
    })
}


new Vue({
    el: '#productInfo',
    data() {
        return {
            count: 1,
            id: "",
            pro: [],
        }
    },
    // 抓取網址上的id以得到現在該頁該是甚麼商品
    created() {
        let urlParams = new URLSearchParams(window.location.search);
        this.id = urlParams.get('id');
    },
    methods: {
        //加入購物車-存入sessionStorage
        addcart() {
            loginMember("<strong>已加入購物車</strong>", 'success');
            let goods = {
                id: this.id,
                count: this.count,
            }
            let newcart = JSON.parse(sessionStorage.getItem("cart"));
            // 當newcart不為空時
            if (newcart != null) {
                let isnew = true;
                // newcart = JSON.parse(newcart);
                //迴圈判讀是否重複新增商品
                for (let i = 0; i < newcart.length; i++) {
                    //判斷購物車裡面是否有相同的商品
                    if (newcart[i].id == goods.id) {
                        //並且不重複新增
                        isnew = false;
                        //如果有相同商品，數量加
                        newcart[i].count += parseInt(goods.count);
                    }
                }
                //將新的商品新增到購物車裡
                if (isnew) {
                    newcart.push(goods);
                }

            } else {  //如果newcart沒有商品，直接定義一個
                newcart = [goods];
            }
            //把newcart陣列用cart這個名字儲存到瀏覽器裡
            sessionStorage.setItem("cart", JSON.stringify(newcart));
        },

        // 頁面上的數量控制鍵 -> 減
        sub_btn() {
            if (this.count > 1) {
                this.count--;
            }
        },
        // 頁面上的數量控制鍵 -> 加
        add_btn() {
            this.count++;
        },
    },
    // 得到商品內頁的商品資訊
    mounted() {
        let that = this;

        

        $.ajax({
            url: 'php/getproductInfo.php',
            type: "POST",
            data: {
                id: that.id,
            },
            success: function (resp) {
                let getResp = JSON.parse(resp);
                that.pro = getResp;
            }
        })
    },
})