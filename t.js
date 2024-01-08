const { default: axios } = require('axios');

(async () => {
    axios.post('https://0mcmjr2ek3.execute-api.us-east-2.amazonaws.com/Prod/api/user/sign_up', {},{
        headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOiAiMjAyMi0xMi0xOSAwMjo0Mzo0OS44NjM5NTYiLCAic3ViIjogInBvdW5kX2FwcCJ9.JxnGLlLRlFSSslWZ4UhTtgCrC1nDiwkWJt9fi7TXc08`,
            email: "gwk24yt@gmail.com",
            discord_id: "723049421021118535"
        }
    }).then(v => console.log(v.data))
})();

// What is this for?