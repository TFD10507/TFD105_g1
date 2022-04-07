new Vue({
    el: "#step",
    data: {
     products: [],
     //==== 信用卡&貨到付款選項 ====
    //  payType: "card",
     //===== 步驟 =====
     step: "A",
    },
    methods: {
     // 執行add這個function, index->陣列裡的第幾個物件 n->加1減1的值
     add(index, n) {
      // 如果按下加減後等於0
      if (this.products[index].quantity + n == 0) {
       return; // 就結束顯示預設數字 1
      }
      this.products[index].quantity += n; // 不然就可以做加減
     },
     //點擊垃圾桶 刪除
     del(index) {
      this.products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(this.products));
     },
     // 提交訂單
     sendOrder() {
      // 0.檢查收款人資訊是否填寫完整
      // 1.傳送訂單詳細資訊給後台
      //  - 商品詳細資訊
      //  - 付款方式資訊
      // 2. 後台判斷結果
      // - 交易是否成功結果
      // - 訂單編號
      // 3. 交易成功後將locoalstroage(購物車)清空
     },
     goStepB(){
      if(this.products.length > 0){
       this.step = 'B';
      }else{
       alert('購物車是空的呦 !!');
      }
      
     }
    },
    // 進入頁面就要有初始值就要用created
    created() {
     //  先假裝購物車有資料
     let products = [
      {
       id: 0001,
       img: "./img/product/chair_001.jpg",
       name: "SEOTO-EX 機能椅",
       type: "白橡木",
       price: 1000,
       quantity: 1,
      },
    //   {
    //    id: 0002,
    //    img: "./img/index/table_small.jpg",
    //    name: "SEOTO-EX 機能桌",
    //    type: "白橡木",
    //    price: 4970,
    //    quantity: 1,
    //   },
     ];
   
     localStorage.setItem("products", JSON.stringify(products));
     
   
     // 1.取出localStorage的資料, 字串轉成物件 // ??判斷是否為null如果是就用空陣列
     let cart = JSON.parse(localStorage.getItem("products")) ?? [];
     // 2.把資料放入data裡的products
     this.products = cart;
    },
    computed: {
     // 總計 執行function
     sumTotal: function () {
      //預設 total=0
      let total = 0;
      // vue的products陣列執行foreach迴圈
      this.products.forEach((el) => {
       //陣列裡的物件執行這個涵式
       // 總計 = 物件的價格 * 物件的數量
       total += el.price * el.quantity;
      });
      //把值傳回sumTotal這個變數
      return total;
     },
     sumCount: function () {
      let count = 0;
      this.products.forEach((el) => {
       count = count + el.quantity;
      });
      return count;
     },
    },
   });