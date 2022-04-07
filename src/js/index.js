
// 商品控制
// export default{
//     data(){
//         return{
//             active_index:0,
//         }
//     }
// }

new Vue({
    el: '#index',
    data: {
        smallImgs: [
            {
                img: '../img/index/sample_small.jpg'
            },
            {
                img: '../img/index/shelf_small.jpg'
            },
            {
                img: '../img/index/table_small.jpg'
            },
        ],
        largeImgs:[
            {
                img: '../img/index/sample_large.jpg'
            },
            {
                img: '../img/index/shelf_large2.jpg'
            },
            {
                img: '../img/index/table_large.jpg'
            },
        ],
        active_index :0 ,
    },
    methods: {
        next(){
            if(this.active_index < (this.smallImgs.length - 1)){
                this.active_index++
            }else{
                this.active_index = 0
            }
        },
        prev(){
            if(this.active_index < (this.smallImgs.length - 1)){
                this.active_index--
            }else if(this.active_index == -1){
                this.active_index = 2
            }
        }
    },
})