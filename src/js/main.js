$(function () {
    // 購物車側邊欄的出現控制
    // ！！！！！！上線網址要改！！！！！
    if (location.href != "./cart.html") {
        $('.btn_cart_open').on('click', function () {
            $(".cart_side").animate({
                right: '0'
            }, 1200);
        });
        $('.btn_cart_close').on('click', function () {
            $(".cart_side").animate({
                right: '-100%'
            }, 1200);
        });
    } else { //當在結帳頁面的時候，控制購物車側邊欄不出現
        $('.btn_cart_open').css("pointer-events", "none")
    }

    // ======== go to top ========
    var $win = $(window);
    var $backToTop = $('.js-back-to-top');

    // 當user滾動到離頂部300像素時，展示回到頂部按鈕
    $win.on("scroll", function () {
        if ($win.scrollTop() > 300) {
            $backToTop.show();
        } else if ($win.scrollTop() == 0) {
            let slide_in_rwds = document.querySelectorAll('.slide-in-rwd');
            slide_in_rwds.forEach(slide_in_rwd => {
                slide_in_rwd.classList.add('active');
            });
        } else {
            $backToTop.hide();
        }
    });

    // 當user點擊按鈕時，通過動畫效果返回頭部
    $backToTop.on("click", function () {
        $('html, body').animate({
            scrollTop: 0
        }, 700);
    });

    // aos
    AOS.init();

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

    let result = JSON.parse(sessionStorage.getItem('status'));
    let icon = document.querySelector(".fa-user-circle");
    if (result) {
        icon.style.color = "#A0643E";
    } else {
        icon.style.color = "#76706A";
    }
    //  判斷是否登入
    icon.addEventListener("click", function (e) {
        if (result == null) {
            location.href = "./login.html";
        } else {
            if (result.successful) {
                // ===== 導覽列的會員中心子選單 ======
                e.preventDefault();
                $('.member_list').toggle(500);
                // 當點擊到會員登出時
                $('#iconLogout').on("click", function (e) {
                    e.preventDefault();
                    // 清除會員狀態
                    
                    if (location.href.includes("member.html")) {
                        console.log("1");
                        location.href = "./index.html";
                    } else {
                        // 重整頁面
                        location.href = location.href;
                    }
                    sessionStorage.removeItem("status");
                })
            } else {
                location.href = "./login.html";
            }
        }
    });

    if (result) {
        if (result.successful) {
            // $(icon).css("color", "#A0643E");
            $('#wheel-login').removeClass('-disable');
        }
    } else {
        $('#wheel-outter-button').on('click', function () {
            loginMember('<strong>請先登入會員<br>即可獲得轉盤機會</strong>', 'error', '<button class="btn btn-warning m-3"><a href="./login.html" style="color: #fff">登入</a></button> ');
        })
    }




});