$(function () {

    // ===== 導覽列的會員中心子選單 ======
    $('.member_ul').on("click", function (e) {
        e.preventDefault();
        // $('.member_list').toggleClass("active");
        $('.member_list').toggle(500);
    });

    // 購物車側邊欄的出現控制
    $('.btn_cart_open').on('click', function () {
        $(".cart_side").animate({ right: '0' }, 1200);
    });
    $('.btn_cart_close').on('click', function () {
        $(".cart_side").animate({ right: '-100%' }, 1200);
    });

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

    let result = sessionStorage.getItem('status');
    // console.log(result);
    let icon = document.querySelector(".fa-user-circle");

    if (result == "true") {
        
        $(icon).css("color", "#A0643E");

        let wheel = document.querySelector('#wheel-login');
        $(wheel).removeClass('-disable');
        // console.log(1);
    }else{
        let wheelButton = document.querySelector("#wheel-outter-button")
        wheelButton.addEventListener("click", function(){
            loginMember('<strong>請先登入會員<br>即可獲得轉盤機會</strong>', 'error', '<button class="btn btn-warning m-3"><a href="./login.html" style="color: #fff">登入</a></button> ');
        })

    }

    //  判斷是否登入
    // console.log(icon);
    icon.addEventListener("click", function () {
        // console.log('aa');
        if (sessionStorage.getItem('status') == null) {
            // console.log(sessionStorage.getItem('status'));
            location.href = "./login.html";
        } else {
            let result = sessionStorage.getItem('status');
            // console.log(result);
            if (result == "true") {
                location.href = "./member.html";

                $(icon).css("color", "#A0643E");
                // console.log(1);
            } else {
                location.href = "./login.html";
                // console.log(2);
            }

        }
    });
});