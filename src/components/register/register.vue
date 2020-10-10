<template>
    <div style="text-align:center;width:100%">
        <div style="padding-top:1ex;padding-bottom:1ex">
            <h1 style="margin-bottom:0px;"><span>欢&nbsp;迎&nbsp;注&nbsp;册</span></h1>
        </div>
        <hr style="width:90%;margin:0px auto 0px auto">
        <div style="text-align:center;margin-top:1ex">
            <a-form-model
                ref="registerform"
                :model="register_data" 
                :rules="rules"
                layout="horizontal" 
                style="text-align:left;width:80%;margin:auto auto auto auto"
            >
                <!--输入邮箱-->
                <a-form-model-item ref="username" label="邮箱" prop="email">
                    <a-input style="width:95%;margin-left:2.5%" v-model="register_data.email"/>
                </a-form-model-item>
                <!--输入密码-->
                <a-form-model-item label="密码" prop="password">
                    <a-input 
                        type="password" 
                        v-model="register_data.password" 
                        style="width:95%;margin-left:2.5%"
                    />
                </a-form-model-item>
                <!--其他的东西-->
                <div style="text-align:center">
                    <a-button type="primary" style="margin-top:2ex" @click="register()">
                        注册
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
            /*data of the form */
            register_data:{
                email:"",
                password:""
            },
            rules:{
                email:[
                    {required:true, message:'请输入您的邮箱',trigger:'blur'},
                    {type:'email', message:'邮箱格式有误', trigger:'blur'},
                    {validator:this.checkEmail, trigger:'blur'}
                ],
                password:[
                    {required:true, message:'密码不得为空',trigger:'blur'},
                    {min:6,message:'密码不得小于6位',trigger:'blur'},
                    {validator:this.checkPass, trigger:'blur'}
                ],
            },
        }
    },
    methods:{
        /*function of validating password */
        checkPass(rule, value, callback){
            let hasNumber = false;
            let hasLetter = false;
            for(var i=0;i<value.length;i++){
                if((value[i]>='a'&&value[i]<='z')||(value[i]>='a'&&value[i]<='z')){
                    hasLetter = true;
                }
                if((value[i]>='0'&&value[i]<='9')){
                    hasNumber = true;
                }
            }
            if(!hasNumber){
                callback(new Error('密码必须包含数字'));
            }
            else if(!hasLetter){
                callback(new Error('密码必须包含字母'));
            }
            else{
                callback()
            }
        },
        /*function of validating email */
        checkEmail(rule, value, callback){
            let form = new FormData()
            form.append("email", this.register_data.email)
            this.$axios.post("/checkemail", form)
            .then(response=>{
                if(response.data.email){
                    callback(new Error('这个邮箱已经被注册了'))
                }
                else{
                    callback()
                }
            })
            .catch(error=>{
                this.$message.error('服务器好像有点问题')
                Promise.reject(error)
            })
        },
        /*function for handling login form */
        register(){
            this.$refs.registerform.validate(valid=>{
                if(!valid){
                    this.$message.error("数据有误")
                }
                else{
                    let form = new FormData();
                    form.append("email", this.register_data.email);
                    form.append("password", this.register_data.password);
                    this.$axios.post('/register', form)
                    .then(response=>{
                        if(response.data.registered){//注册成功，保存登录状态，邮箱密码存在本地
                            this.$message.success("注册成功，欢迎来到DenchBlog");
                            window.sessionStorage.setItem("DenchBlogUID", response.data.uid);
                            window.sessionStorage.setItem("DenchBlogUsername", response.data.username);
                            window.sessionStorage.setItem("DenchBlogOnline", true);
                            window.localStorage.setItem("DenchBlogAutoLogin", false);
                            window.localStorage.setItem("DenchBlogRemember", false);
                            window.localStorage.setItem("DenchBlogEmail", this.register_data.username);
                                window.localStorage.setItem("DenchBlogPassword", this.register_data.password);
                        }
                        else{
                            this.$message.error("注册失败，请稍后再试");
                        }
                    })
                    .catch(error=>{
                        this.$message.error("服务器好像有点问题")
                        Promise.reject(error)
                    })
                }
            })
        }
    }
}
</script>