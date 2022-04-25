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
            //設定全域變數    
            count: 1,
            id: "",
            pro: [],
            arr: [],
            isShow: true,
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

            } else { //如果newcart沒有商品，直接定義一個
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
        add_love() {
            let status = sessionStorage.getItem("status");
            if(status){
                aaa = this.arr.indexOf(this.id);
                // console.log(aaa);
                if (aaa != -1) {
                    return;
                }
                //抓取產品id
                // console.log(this.id);
                // console.log(this.pro[0].name);
                // let fabtn = document.querySelectorAll(".favorite");            
                // fabtn[1].classList.add("-on");     
                this.isShow = false;
                // test_2();
                // console.log(fabtn);
                let proimg = document.querySelector("#mainImg");
                let storagedata = {
                    product_id: this.id,
                    product_img: proimg.src,
                    product_name: $('#001').text(),
                }
                // 設定條件式,為了讓下面的值設為null
                let myList = sessionStorage.getItem("collect");
                // console.log(myList);
                // test2藉由click觸發下列事件
                //假設mylist裡面有東西的時候
                // for(let i = 0;i<=myListArray.length;i++){
                // }            
                if (myList != null) {
                    // 設定myListArray=物件化過的myList
                    let myListArray = JSON.parse(myList);
                    // 將storagedata推入myListArray
                    myListArray.push(storagedata);
                    // 將sessionstorage推入myListArray
                    sessionStorage.setItem("collect", JSON.stringify(myListArray));
                } else {
                    sessionStorage.setItem("collect", JSON.stringify([storagedata]));
                }
            }else{
                loginMember('<strong>請先登入會員</strong>', 'error', '<button class="btn btn-warning m-3"><a href="./login.html" style="color: #fff">登入</a></button> ');
            }
        },
        remove_love(num) {
            // console.log(id);
            // alert("123");
            let Sam = sessionStorage.getItem("collect");
            // test_2();

            // JSON.parse(Sam);
            // console.log(JSON.parse(Sam));
            Sam = JSON.parse(Sam);

            var index = Sam.map(x => {
                return x.product_id;
            }).indexOf(num.toString());

            //   console.log(index.indexOf(num.toString()));
            //   console.log(num);
            //   console.log(index);
            Sam.splice(index, 1);
            sessionStorage.removeItem("collect");
            sessionStorage.setItem("collect", JSON.stringify(Sam));
            // var cccc = this.arr.indexOf(num.toString());            
            // this.arr.splice(cccc, 1);
            // console.log(cccc);

            this.isShow = true;
        },
    },

    // 得到商品內頁的商品資訊
    mounted() {
        // sessionStorage.setItem("collect",)
        item_storage = sessionStorage.getItem("collect");
        // console.log(item_storage);
        if (item_storage != null) {
            item_storage = JSON.parse(item_storage);
            // console.log(aaa);
            for (let i = 0; i < item_storage.length; i++) {
                //抓全域變數 (this)   
                this.arr[i] = item_storage[i]['product_id'];
                // console.log(aaa[i]['product_id']);
            }
            // console.log(this.arr);
            //抓html的網址
            let url = location.href;
            // console.log(url);

            urlNum = url.split('=')[1];
            // console.log(urlNum);
            allNum = this.arr.indexOf(urlNum);
            // console.log(allNum);
            // -1代表沒有重複      

        }

        // load()
        //把物件存在that中
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
                if (item_storage) {
                    if (allNum != -1) {
                        // let fabtn = this.$el.querySelectorAll('.favorite')
                        // // let fabtn = document.querySelectorAll(".favorite");
                        // fabtn[1].classList.add("-on"); 
                        // console.log(fabtn);
                        // alert("asdsa");
                        that.isShow = false;
                        // $(`#hover_${urlNum}`).addClass("-on");            
                        // alert("asdsa");
                    }
                }

            }
        })


    },
})