<template>
    <div style="text-align:center;width:100%">
        <div style="padding-top:1ex;padding-bottom:1ex">
            <h1 style="margin-bottom:0px;"><span>欢&nbsp;迎&nbsp;登&nbsp;录</span></h1>
        </div>
        <hr style="width:90%;margin:0px auto 0px auto">
        <div style="text-align:center;margin-top:1ex">
            <a-form-model
                ref="loginform"
                :model="login_data" 
                :rules="rules"
                layout="horizontal" 
                style="text-align:left;width:80%;margin:auto auto auto auto"
            >
                <!--输入邮箱或者手机-->
                <a-form-model-item ref="username" label="邮箱或手机号" prop="username" >
                    <a-input style="width:95%;margin-left:2.5%" v-model="login_data.username"/>
                </a-form-model-item>
                <!--输入密码-->
                <a-form-model-item label="密码" prop="password">
                    <a-input 
                        type="password" 
                        v-model="login_data.password" 
                        style="width:95%;margin-left:2.5%"
                    />
                </a-form-model-item>
                <!--其他的东西-->
                <div style="text-align:center">
                    <div style="text-align:left">
                        <a-checkbox v-model="autologin">自动登录</a-checkbox>
                        <a-checkbox v-model="remember_password">记住密码</a-checkbox><br>
                    </div>
                    <a-button type="primary" @click="login()" style="margin-top:2ex">
                        登录
                    </a-button>
                </div>
            </a-form-model>
        </div>
    </div>
</template>
<script>
export default {
    name:"login",
    data(){
        return {
            /*the user id of the user */
            UID:-1,
            /*whether to login automatically next time */
            autologin:false,
            /*whether to remember the password of user */
            remember_password:false,
            /*data of the form */
            login_data:{
                username:"",
                password:""
            },
            rules:{
                username:[
                    {required:true, message:'请输入您的邮箱或者手机',trigger:'blur'}
                ],
                password:[
                    {required:true, message:'请输入您的邮箱或者手机', trigger:'blur'},
                ]
            }
        }
    },
    methods:{
        /*function for handling login form */
        login(){
            this.$refs.loginform.validate(valid=>{
                if(!valid){
                    return;
                }
                else{
                    let form = new FormData();
                    form.append("name", this.login_data.username);
                    form.append("password", this.login_data.password);
                    this.$axios.post("/login", form)
                    .then(response=>{
                        if(response.data.validation){
                            this.$message.success('登陆成功')
                            window.sessionStorage.setItem("DenchBlogUID", response.data.UID);
                            window.sessionStorage.setItem("DenchBlogUsername", response.data.name);
                            window.sessionStorage.setItem("DenchBlogOnline", true);
                            if(this.remember_password){// 需要记住密码
                                window.localStorage.setItem("DenchBlogLoginName", this.login_data.username);
                                window.localStorage.setItem("DenchBlogPassword", this.login_data.password);
                            }
                            if(this.autologin){// 需要自动登录
                                window.localStorage.setItem("DenchBlogAutoLogin", true);
                            }
                        }
                        else{
                            this.$message.error('登陆失败，邮箱/手机号或密码错误')
                        }
                    }).catch(error=>{
                        this.$message.error("登陆失败，服务器好像有点问题")
                        Promise.reject(error)
                    })
                }
            })
        }
    }
}
</script>