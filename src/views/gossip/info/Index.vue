<template>
  <div class="gossipInfo">
    <PastTop/>
    <div class="header">
      <div class="header-left">
        <img :src="queryData.user.avatar" alt="假装这里有一张图片" width="50px" height="50px"/>
        <span>{{ queryData.user.name }}&emsp13;&bullet;&emsp13;{{ queryData.user.description }}</span>
      </div>

      <button class="header-right" @click="commonlyFunctions.openLink(queryData.url, true)">
        前往主页
        <Icon icon="icon-sys-qianwang" width="25px" height="25px" style="margin-left: 5px"/>
      </button>
    </div>

    <div class="content" v-if="gossipContentFlag">
      <p>内容正在努力加载中......</p>
    </div>
    <div class="content" v-else>
      <ContentView :contents="gossipContent.content"/>
      <p style="text-align: right">—— {{ gossipContent.date }}</p>
    </div>

    <div class="comment">
      <Comment
          :term="queryData.id"
          :repo="queryData.giscus.repo"
          :repoId="queryData.giscus.repoId"
          :category="queryData.giscus.category"
          :categoryId="queryData.giscus.categoryId"
          :mapping="CommentEnum.MappingEnum.SPECIFIC"/>
    </div>
  </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue";
import ContentView from "@/components/contentView/ContentView.vue";
import Comment from "@/components/comment.vue";
import CommentEnum from "@/enums/commentEnum.js";
import PastTop from "@/components/PastTop.vue";
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import commonlyFunctions from "@/composition/commonlyFunctions.js";
import {getGossip, getGossipByUrl} from "@/api/gossipAPI.js";

// 地址栏传参
let queryData = reactive({
  id: null,
  url: null,
  user: {
    name: null,
    avatar: null,
    description: null
  },
  giscus: {
    repo: null,
    repoId: null,
    category: null,
    categoryId: null
  }
})

// 内容
let gossipContent = reactive({})
let gossipContentFlag = ref(true)

// 路由
const router = useRouter()

onMounted(() => {
  // 获取路由参数
  initQueryData()
  // 获取文本内容
  getGossipContent()
})

// 获取文本内容
const getGossipContent = () => {
  if (location.host === new URL(queryData.url).host) {
    getGossip(queryData.id).then(resp => {
      gossipContent = resp
      if (resp.info.id == null || resp.info.id === '' || resp.info.id === undefined) return
      gossipContentFlag.value = false
    })
  } else {
    getGossipByUrl(queryData.id, queryData.url).then(resp => {
      gossipContent = resp
      if (resp.info.id == null || resp.info.id === '' || resp.info.id === undefined) return
      gossipContentFlag.value = false
    })
  }
}


// 路由参数初始化
const initQueryData = () => {
  const query = router.currentRoute.value.query;
  // 地址栏传参
  queryData.id = query.id;
  queryData.url = query.url;
  queryData.user.name = query.name;
  queryData.user.avatar = query.avatar;
  queryData.user.description = query.description;
  queryData.giscus.repo = query.giscus_repo;
  queryData.giscus.repoId = query.giscus_repoId;
  queryData.giscus.category = query.giscus_category;
  queryData.giscus.categoryId = query.giscus_categoryId;
}
</script>

<style scoped>
/* 评论 */
.comment {
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.36);
  padding: 10px;
  border-radius: 5px;
}

/* 内容 */
.content {
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.36);
  padding: 10px;
  border-radius: 5px;
}

/* 头部 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.36);
  border-radius: 5px;

  .header-left {
    display: flex;
    align-items: center;
    border-radius: 50px;

    img {
      border-radius: 50px;
      margin-right: 10px;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.36);
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;

    &:hover {
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
}

/* 容器 */
.gossipInfo {
  margin: 0 auto;
  width: 80%;
  min-width: 300px;
  padding: 5px;
}
</style>