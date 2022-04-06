$(function () {
    // ===== 導覽列的會員中心子選單 ======
    $('.member_ul').on("click", function (e) {
        e.preventDefault();
        // $('.member_list').toggleClass("active");
        $('.member_list').toggle(500);
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
        $('html, body').animate({ scrollTop: 0 }, 700);
    });

    // aos
    AOS.init();

});