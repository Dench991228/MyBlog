<template>
    <div style="text-align:center">
        <!--顶栏-->
        <myheader style="background:#ffffff;box-shadow:0px 0px 5px #cccccc"></myheader>
        <!--中栏-->
        <div style="
            width:50%;
            display:inline-block;
            vertical-align:top;
            margin-top:1ex;
            margin-right:5px;
            background:#ffffff;
            box-shadow:0px 0px 5px #cccccc"
        >
            <articlelist :Type="'Sector'" :Value="-1"/>
        </div>
        <!--右栏-->
        <div style="width:15%;margin-top:1ex;display:inline-block;vertical-align:top;background:#ffffff;box-shadow:0px 0px 5px #cccccc">
            <!--未登录时的右上部-->
            <div style="border:1px solid #f7f7f7; padding-bottom:1ex">
                <a-menu mode="horizontal" style="width:100%" v-model="selectedUnlogged">
                    <a-menu-item key="login" style="width:50%" @click="showLogin=true">
                        <a-icon type="key"/>
                        <span>登录</span>
                    </a-menu-item>
                    <a-menu-item key="register" style="width:50%" @click="showLogin=false">
                        <a-icon type="user-add"/>
                        <span>注册</span>
                    </a-menu-item>
                </a-menu>
                <login v-if="showLogin"></login>
                <register v-else></register>
            </div>
        </div>
    </div>
</template>
<script>
import myheader from "@/components/myheader/myheader.vue"
import login from "@/components/login/login.vue"
import register from "@/components/register/register.vue"
import articlelist from "@/components/articlelist/articlelist.vue"
export default {
    name:"HomePage",
    components:{
        myheader,
        login,
        register,
        articlelist
    },
    data(){
        return{
            selectedUnlogged:['login'],
            showLogin:true
        }
    }
}
</script>