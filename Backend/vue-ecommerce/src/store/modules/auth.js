import axios from 'axios'
export default {
    
    state :{
       loginToken : ''
    },
    mutations:{
        setStatus(state,payload){
            state.loginToken = payload
        }
    },
    actions:{
        async signIn({commit},payload){
            let response = await axios.post('http://localhost:3500/admin/login',payload)
            if(response && response.data){
                commit('setStatus','success')
            }
            else{
                commit('setStatus','failed')
            }
        }
    },
    getters:{
        getLoginStatus(state){
            return state.loginToken;
        }
    },
    namespaced: true,
}
