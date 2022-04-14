new Vue({
    el: '#login',
    data: {
        // switch: true,
        className: "fas fa-eye",
        eyeToggle: 'open',
    },
    mounted() {

    },
    methods: {

        // <i id="checkEye" class="fas fa-eye" @click="eye"></i>
        eye() {
            alert("111")
            let eyes = document.querySelector("#checkEye")
            let floatingPassword = document.querySelector("#floatingPassword")
            // console.log(eyes);

            if (eyes.classList.contains('fa-eye')) {
                console.log(floatingPassword);
                floatingPassword.attr('type', 'text')
            }
            else {
                floatingPassword.attr('type', 'password')
            }

            //     $("#floatingPassword").attr('type', 'text')
            // } else {
            //     $("#floatingPassword").attr('type', 'password')
            // }
            $(this).toggleClass('fa-eye').toggleClass('fa-eye-slash')
        },
    },
    computed: {

    }

})
    // methods: {
    //     eye() {
    //         alert("111")

    //         if ($("#login").hasClass('fa-eye')) {
    //             console.log("222");
    //             $("#floatingPassword").attr('type', 'text')
    //         }
    //     },
    // }