<template>
    <div style="text-align:center;border-bottom:1px solid #f7f7f7">
        <!--logo区域-->
        <h1 style="margin:auto auto auto auto;display:inline-block;width:15%;vertical-align:middle">
            <span style="color:#aa0000">Dench&nbsp;</span>
            <span style="color:#0000aa">云笔记</span>
        </h1>
        <!--跳转栏区域-->
        <a-menu 
            style="display:inline-block;width:45%;text-align:left;vertical-align:middle;border-bottom:none" 
            v-model="selected" 
            mode="horizontal"
        >
            <a-menu-item key="homepage" style="font-size:120%">
                <a-icon type="bank" style="vertical-align:middle"/>
                <span style="vertical-align:middle;">博客</span>
            </a-menu-item>
            <a-menu-item key="question" style="font-size:120%">
                <a-icon type="question" style="vertical-align:middle"/>
                <span style="vertical-align:middle">问答</span>
            </a-menu-item>
        </a-menu>
        <!--搜索框区域-->
        <div style="display:inline-block;width:20%;vertical-align:middle">
            <a-input style="display:inline-block; width:60%; vertical-align:middle"/>
            <a-button type="primary" style="display:inline-block;vertical-align:middle">
                <a-icon type="search" style="vertical-align:middle"/>
                <span style="vertical-align:middle">搜索</span>
            </a-button>
        </div>
    </div>
</template>
<script>
export default {
    name:"myheader",
    data(){
        return{
            selected:["homepage"]
        }
    }
}
</script>