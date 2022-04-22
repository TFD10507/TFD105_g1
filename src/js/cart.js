new Vue({
  el: "#step",
  data: {
    // ====== 產品資訊 ======
    products: [],
    //========= 步驟 ========
    step: "A",
    //========= 收件資訊 ========
    userInfo: {
      // name: "",
      // phone: "",
      // address: "",
      // other:"",
      name: "王xx",
      phone: "0910081421",
      address: "台北市大安區",
      other: "2424",
    },
    //========= 信用卡資訊 ========
    cardInfo: {
      // cardNum: {
      //   no1: "",
      //   no2: "",
      //   no3: "",
      //   no4: "",
      // },
      // cardName: "",
      // cardDate: {
      //   year: "",
      //   month: "",
      // },
      // cardcsc: "",




       cardNum: {
        no1: "1111",
        no2: "1111",
        no3: "1111",
        no4: "1111",
        },
      cardName: "1111",
      cardDate: {
        year: "11",
        month: "11",
      },
      cardcsc: "111",
  },
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
  "cardInfo.cardcsc": function () {
    if (this.cardInfo.cardcsc.length < 2) {
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
  // 提交訂單
  sendOrder() {
    // 0.檢查收款人資訊是否填寫完整
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
      if (!this.userNameError) { //userNameError == false
      } else if (this.userNameError) {
        alert(this.userNameErrMsg);
      }
    } else {
      alert("未填寫完整");
    }
    // 1.傳送訂單詳細資訊給後台
    $.ajax({
      url: 'php/send_order.php',
      type: 'POST',
      // dataType: 'json',
      data: {
        name: this.userInfo.name,
        phone: this.userInfo.phone,
        address: this.userInfo.address,
        other: this.userInfo.other,
        productsId: this.products[0].id,
        productsPrice: this.products[0].price,
        productsCount: this.products[0].count,
      },
      success: function (res) {
        console.log(res)
      },
      error: function (res) {
        console.log(res)
        // console.log(res)
      }
    })
    // location.href = "php/send_order.php";
    //  - 商品詳細資訊
    //  - 付款方式資訊
    // 2. 後台判斷結果
    // - 交易是否成功結果
    // - 訂單編號
    // 3. 交易成功後將locoalstroage(購物車)清空
  },
  goStepB() {
    if (this.products.length > 0) {
      this.step = 'B';
    } else {
      alert('購物車是空的呦 !!');
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
  if(cart) {
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
        dataType: 'json',
        // 成功抓取的話將商品資訊都丟回到goods
        success: function (res) {
          goods.pic = res[0].pic
          goods.price = res[0].price
          goods.names = res[0].names
          // 將goods丟入新建的陣列[products]
          self.products.push(goods)
          // console.log(self.products);
        },
      })
    }
  }
},
  // 計算購物車商品的總價
  computed: {
  // 信用卡監聽
  creditWatch() {
    const { no1, no2, no3, no4 } = this.cardInfo.cardNum;
    return { no1, no2, no3, no4 };
  },
  // 信用卡到期日監聽
  DateWatch() {
    const { month, year } = this.cardInfo.cardDate;
    return { month, year };
  },
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


