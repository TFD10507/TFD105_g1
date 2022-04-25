// 彈窗套件
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
  el: "#step",
  data: {
    // ====== 產品資訊 ======
    products: [],
    //========= 步驟 ========
    step: "A",
    //========= 收件資訊 ========
    userInfo: {
      name: "",
      phone: "",
      address: "",
      other:"",
      // name: "王xx",
      // phone: "0910081421",
      // address: "台北市大安區",
      // other: "2424",
    },
    //========= 信用卡資訊 ========
    cardInfo: {
      cardNum: {
        no1: "",
        no2: "",
        no3: "",
        no4: "",
      },
      cardName: "",
      cardDate: {
        year: "",
        month: "",
      },
      cardcsc: "",
      //   cardNum: {
      //     no1: "1111",
      //     no2: "1111",
      //     no3: "1111",
      //     no4: "1111",
      //   },
      //   cardName: "111",
      //   cardDate: {
      //     year: "11",
      //     month: "11",
      //   },
      //   cardcsc: "111",
    },
    // ========= 驗證資訊是否錯誤 ========
    // 收件人姓名
    userNameError: false,
    userNameErrMsg: "",
    // 收件人手機號碼
    phoneError: false,
    phoneErrMsg: "",
    // 收件人手機地址
    addressError: false,
    addressErrMsg: "",
    // 信用卡號
    cardNumError: false,
    cardNumErrMsg: "",
    // 持卡人姓名
    cardNameError: false,
    cardNameErrMsg: "",
    // 到期日
    cardDateError: false,
    cardDateErrMsg: "",
    // 安全碼
    cardcscError: false,
    cardcscErrMsg: "",
    // ========= 完成結帳的訂單資訊 ========
    order: {
      id: "",
      date: "",
      total: "",
    },
    // ========= 折價券 ========
    coupon: {
      code: "",
      price: "0",
    },
    couponErrMsg: "",
  },
  watch: {
    "userInfo.name": function () {
      if (this.userInfo.name.length < 2) {
        this.userNameError = true;
        this.userNameErrMsg = "字數需大於2";
      } else {
        this.userNameError = false;
        this.userNameErrMsg = "";
      }
    },
    "userInfo.phone": function () {
      let isPhone = /^09[0-9]{8}$/;
      if (!isPhone.test(this.userInfo.phone)) {
        this.phoneError = true;
        this.phoneErrMsg = "請輸入正確收件人電話";
      } else {
        this.phoneError = false;
        this.phoneErrMsg = "";
      }
    },
    "userInfo.address": function () {
      if (this.userInfo.address.length < 6) {
        this.addressError = true;
        this.addressErrMsg = "字數需大於6";
      } else {
        this.addressError = false;
        this.addressErrMsg = "";
      }
    },
    "cardInfo.cardName": function () {
      if (this.cardInfo.cardName.length < 2) {
        this.cardNameError = true;
        this.cardNameErrMsg = "字數需大於2";
      } else {
        this.cardNameError = false;
        this.cardNameErrMsg = "";
      }
    },
    "cardInfo.cardcsc": function () {
      if (this.cardInfo.cardcsc.length < 3) {
        this.cardcscError = true;
        this.cardcscErrMsg = "請輸入正確的安全碼";
      } else {
        this.cardcscError = false;
        this.cardcscErrMsg = "";
      }
    },
    creditWatch(val) {
      // console.log(val);
      let Num = /^\d{4}$/;
      if (
        // test檢查正規表示法
        !Num.test(val.no1) ||
        !Num.test(val.no2) ||
        !Num.test(val.no3) ||
        !Num.test(val.no4)
      ) {
        this.cardNumError = true;
        this.cardNumErrMsg = "請輸入正確卡號";
      } else {
        this.cardNumError = false;
        this.cardNumErrMsg = "";
      }
    },
    DateWatch() {
      // console.log(this.cardInfo.cardDate.month);
      if (
        this.cardInfo.cardDate.month.length < 2 ||
        this.cardInfo.cardDate.year.length < 2
      ) {
        this.cardDateError = true;
        this.cardDateErrMsg = "請輸入正確到期日";
      } else {
        this.cardDateError = false;
        this.cardDateErrMsg = "";
      }
    },
  },
  methods: {
    // 頁面上的加鍵
    add(item) {
      item.count++;
      this.updated_session(item);
    },
    // 頁面上的減鍵
    reduce(item) {
      if (item.count > 1) {
        item.count--;
        this.updated_session(item);
      }
    },
    //點擊垃圾桶 刪除
    del(index) {
      // 畫面的products刪除
      this.products.splice(index, 1);
      // sessionStorage 的 cart 刪除
      let cart = JSON.parse(sessionStorage.getItem("cart"));
      for (let i = 0; i < cart.length; i++) {
        if (cart[0].id == cart[i].id) {
          cart.splice(i, 1);
        }
      }
      sessionStorage.setItem('cart', JSON.stringify(cart))
    },
    // 更新session
    updated_session(item) {
      let cart = JSON.parse(sessionStorage.getItem("cart"));
      for (let i = 0; i < cart.length; i++) {
        if (item.id == cart[i].id) {
          cart[i].count = item.count
        }
      }
      sessionStorage.setItem("cart", JSON.stringify(cart));
    },
    // 使用折價券
    useCoupon() {
      fetch('php/get_coupon.php', {
          method: 'POST',
          headers: { // 告訴後端說TYPE是JSON
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // 將折價券資訊丟給php
            couponNum: this.coupon.code,
          })
        })
        .then(res => res.json()) //接收回應並轉成json
        .then(data => {
          this.coupon.price = data[0].price
          if (this.coupon.price < this.sumTotal) {
            this.couponErrMsg = "";
          } else {
            this.coupon.price = '0'
            this.couponErrMsg = "折價金額不可大於結帳金額";
          }
        })
        .catch(error => { //失敗傳回價錢0
          // 判斷是否有輸入號碼
          if (this.coupon.code == "") {
            this.coupon.price = '0'
            this.couponErrMsg = "需輸入折價券號碼";
          } else if (this.coupon.code != "") {
            this.coupon.price = '0'
            this.couponErrMsg = "請確認折價券號碼是否正確";
          }
        })
    },
    // 從步驟 A 到步驟 B
    goStepB() {
      let user = sessionStorage.getItem("status");
      if (this.products.length > 0) {
        // 判斷是否登入
        if (user) {
          this.step = 'B';
        } else {
          loginMember('<strong>請先登入會員</strong>', 'error', '<button class="btn btn-warning m-3"><a href="/login.html" style="color: #fff">登入</a></button> ');
        }
      } else {
        loginMember('<strong>購物車是空的唷！</strong>', 'warning');
      }
    },
    // 提交訂單
    sendOrder() {
      let status = JSON.parse(sessionStorage.getItem("status"));
      // console.log(status.id);

      // 0.檢查收款人資訊是否填寫完整
      // 如果格子都有填寫，要檢查是否完整
      if (
        this.userInfo.name != "" &&
        this.userInfo.phone != "" &&
        this.userInfo.address != "" &&
        this.cardInfo.cardNum.no1 != "" &&
        this.cardInfo.cardNum.no2 != "" &&
        this.cardInfo.cardNum.no3 != "" &&
        this.cardInfo.cardNum.no4 != "" &&
        this.cardInfo.cardName != "" &&
        this.cardInfo.cardDate.year != "" &&
        this.cardInfo.cardDate.month != "" &&
        this.cardInfo.cardcsc != ""
      ) {
        if (this.userNameError) {
          loginMember(`<strong>${this.userNameErrMsg}</strong>`, 'error');
        } else if (this.phoneError) {
          loginMember(`<strong>${this.phoneErrMsg}</strong>`, 'error');
        } else if (this.addressError) {
          loginMember(`<strong>${this.addressErrMsg}</strong>`, 'error');
        } else if (this.cardNumError) {
          loginMember(`<strong>${this.cardNumErrMsg}</strong>`, 'error');
        } else if (this.cardNameError) {
          loginMember(`<strong>${this.cardNameErrMsg}</strong>`, 'error');
        } else if (this.cardDateError) {
          loginMember(`<strong>${this.cardDateErrMsg}</strong>`, 'error');
        } else if (this.cardcscError) {
          loginMember(`<strong>${this.cardcscErrMsg}</strong>`, 'error');
        } else { //如果有填寫，也驗證完成，可以送出訂單！
          // 1.傳送訂單詳細資訊給後台
          fetch('php/send_order.php', {
              method: 'POST',
              headers: { // 告訴後端說TYPE是JSON
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                // 訂單詳細資訊
                id: status.id,
                name: this.userInfo.name,
                phone: this.userInfo.phone,
                address: this.userInfo.address,
                other: this.userInfo.other,
                products: this.products,
              })
            })
            .then(res => res.json())
            .then(data => { //收到回應後做的事
              // 跳轉到完成訂單畫面
              this.step = 'C';

              //將訂單內容丟回去前端的vue
              let self = this;

              $.ajax({
                url: 'php/get_order.php',
                type: 'POST',
                async: false,
                data: {
                  memberId: status.id,
                  orderId: data,
                },
                // 成功抓取的話將訂單資訊都丟回到order
                success: function (res) {
                  res = JSON.parse(res)
                  self.order.id = res[0].ID_order
                  self.order.date = res[0].orderDate
                  self.order.total = res[0].total

                  loginMember('<strong>提交訂單成功</strong>', 'success');

                  // 3. 交易成功後將sessionstroage(購物車)清空
                  sessionStorage.removeItem('cart');
                },
              })
            })
        }
      } else { //如果格子都沒填寫，提示訊息
        loginMember(`<strong>未填寫資料</strong>`, 'error');
      }


    },
    // 跨欄位刪除
    creditdown() {
      let cardnum = document.getElementsByClassName("cardnum");
      // console.log(cardnum);
      for (let i = 0; i < cardnum.length; i++) {
        // ----- 跨欄位刪除 & 只能輸入數字及刪除鍵 ---------//
        cardnum[i].addEventListener("keydown", function (e) {
          // console.log(e.which); //e.which轉換成
          // 除了數字0-9及刪除鍵外，不得輸入其他字
          if (
            (e.which >= 48 && e.which <= 57) ||
            e.which == 8 ||
            (e.which >= 96 && e.which <= 105)
          ) {
            // 刪除鍵可以跨欄位刪除
            if (e.target.value.length == 0 && e.which == 8) {
              let previous_el = this.previousElementSibling;
              previous_el.focus();
            }
          } else {
            e.preventDefault();
          }
        });
      }
    },
    // 跨欄位輸入
    creditup() {
      let cardnum = document.getElementsByClassName("cardnum");
      // console.log(cardnum);

      // console.log("aaa");
      for (let i = 0; i < cardnum.length; i++) {
        // ----- 跨欄位輸入 & 中文字不能輸入 ------------//
        cardnum[i].addEventListener("keyup", function (e) {
          // 解決中文字可以輸入的情形
          // 使用正規式：所有非數字字元\D，g所有
          let str = e.target.value.replace(/\D/g, "");
          // console.log(str);
          e.target.value = str; //將中文輸入值用空字串
          // 希望使用者可以一直輸入下去
          // console.log(str.length);
          if (str.length == 4) {
            // 設next_el為下一個元素
            let next_el = this.nextElementSibling;
            if (next_el != null) {
              next_el.focus();
            }
          }
        });
      }
    },
  },
  // 進入頁面就要有初始值就要用created
  created() {
    const self = this;
    let cart = JSON.parse(sessionStorage.getItem("cart"));
    if (cart) {
      for (let i = 0; i < cart.length; i++) {
        let goods = {
          id: '',
          count: '',
        }
        // 抓取session中 cart 的 id 和 count，並丟入goods
        goods.id = cart[i].id;
        goods.count = cart[i].count;
        // 從資料庫抓取 session中 cart 的 id的資料
        $.ajax({
          url: 'php/getproductInfo.php',
          type: 'POST',
          data: {
            id: cart[i].id,
          },
          // dataType: 'json',
          // 成功抓取的話將商品資訊都丟回到goods
          success: function (res) {
            res = JSON.parse(res)
            goods.pic = res[0].pic
            goods.price = res[0].price
            goods.name = res[0].name
            // 將goods丟入新建的陣列[products]
            self.products.push(goods)
            // console.log(self.products);
          },
        })
      }
    }
  },
  computed: {
    // 信用卡監聽
    creditWatch() {
      const {
        no1,
        no2,
        no3,
        no4
      } = this.cardInfo.cardNum;
      return {
        no1,
        no2,
        no3,
        no4
      };
    },
    // 信用卡到期日監聽
    DateWatch() {
      const {
        month,
        year
      } = this.cardInfo.cardDate;
      return {
        month,
        year
      };
    },
    // 計算購物車商品的總價
    sumTotal: function () {
      //預設 total=0
      let total = 0;
      // vue的products陣列執行foreach迴圈
      this.products.forEach((el) => {
        //陣列裡的物件執行這個涵式
        // 總計 = 物件的價格 * 物件的數量
        total += el.price * el.count;
      });
      //把值傳回sumTotal這個變數
      return total;
    },
    sumCount: function () {
      let count = 0;
      this.products.forEach((el) => {
        count = count + el.count;
      });
      return count;
    },
  },
});