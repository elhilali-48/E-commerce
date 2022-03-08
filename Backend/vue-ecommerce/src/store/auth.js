import axios from 'axios'
export default {
    namespaced : true,
    state :{
        token : null,
        user: null,
    },
    mutations:{

    },
    actions:{
        async signIn({dispatch},form){
            let response = await axios.post('http://localhost:3500/admin/login',form)
            console.log(response)
            dispatch('gfgfdg')
        }
    }
}
