<template>
    <div style="background:#f7f7f7;border:1px solid #e8e8e8">
        <div 
            v-for="(item,index) in article_info.titles" 
            :key="index" 
            style="text-align:left;padding:1ex 1ex 1ex 1ex"
            class="article_item"
        >
            <!--文章标题-->
            <h2>{{index+1}}.&nbsp;{{article_info.titles[index]}}</h2>
            <h3><a-icon type="user"/>&nbsp;{{article_info.authorNames[index]}}</h3>
            <!--文章其他信息-->
            <div style="width:100%">
                <div style="display:inline-block; width:50%">
                    <a-icon type="like"/>
                    {{article_info.numLikes[index]}}
                    <a-icon type="message"/>
                    {{article_info.numComments[index]}}
                </div>
                <div style="display:inline-block; width:50%;text-align:right">
                    <a-icon type="clock-circle"/>
                    {{article_info.times[index]}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'articlelist',
    props:{
        Type:String,
        Value:Number
    },
    data(){
        return{
            type:this.Type,
            value:this.Value,
            article_info:{
                /*文章点赞数*/
                numLikes:[],
                /*文章题目 */
                titles:[],
                /*文章作者名字 */
                authorNames:[],
                /*文章作者id */
                authorIDs:[],
                /*文章创作时间 */
                times:[],
                /*文章评论数 */
                numComments:[],
                /*文章id */
                articleIDs:[]
            }
        }
    },
    /*向后端获取文章 */
    created(){
        let form = new FormData()
        form.append("Type", this.type);
        form.append("Value", this.value)
        this.$axios.post('/getArticle', form)
        .then(response=>{
            this.article_info.numLikes = response.data.Likes
            this.article_info.titles = response.data.Titles
            this.article_info.numComments = response.data.NumComments
            this.article_info.times = response.data.Times
            this.article_info.articleIDs = response.data.AIDs
            this.article_info.authorNames = response.data.WriterNames
            this.article_info.authorIDs = response.data.WriterIDs
        })
        .catch(error=>{
            this.$message.error('服务器出了点问题')
            Promise.reject(error)
        })
    }
}
</script>
<style scoped>
.article_item:hover{
    font-weight: bold;
    background:#e8e8e8
}
</style>