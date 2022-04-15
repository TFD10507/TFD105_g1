
// 商品控制

new Vue({
    el: '#index',
    data: {
        smallImgs: [
            {
                img: 'img/index/sample_small.jpg'
            },
            {
                img: 'img/index/shelf_small.jpg'
            },
            {
                img: 'img/index/table_small.jpg'
            },
        ],
        largeImgs: [
            {
                img: 'img/index/sample_large.jpg'
            },
            {
                img: 'img/index/shelf_large2.jpg'
            },
            {
                img: 'img/index/table_large.jpg'
            },
        ],
        productName: [
            {
                text: 'CHAIR'
            },
            {
                text: 'CABINET'
            },
            {
                text: 'DESK'
            },
        ],
        active_index: 0,
    },
    methods: {
        next() {
            if (this.active_index < (this.smallImgs.length - 1)) {
                this.active_index++
            } else {
                this.active_index = 0
            }
        },
        prev() {
            // 如果index < 3 而且 index > -1
            if ((this.active_index < (this.smallImgs.length)) && (this.active_index > -1)) {
                this.active_index--
                if(this.active_index == -1) {
                    this.active_index = 2
                }
            }
            // 這段應該是不用寫的
            // else{ 
            //     this.active_index = 2
            // }


        }
    },
})