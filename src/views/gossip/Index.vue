<template>
  <div class="timeline">
    <Router/>
    <ul v-if="gossipContentList.length > 0" class="line">
      <li v-for="item in gossipContentList" class="card" v-show="item.info.host === locationHost || !onlyHost">
        <div class="articleInfo">
          <div class="author">
            <img :src="gossipUserList[item.info.host].avatar" alt="假装有一张图片">
            <span>{{ gossipUserList[item.info.host].name }}</span>
          </div>
          <div class="time">{{ item.date }}</div>
        </div>
        <div class="content">
          <ContentView :contents="item.content"/>
        </div>
        <div class="content-bottom">
          <icon
              icon="icon-sys-pinbi"
              width="25px" height="25px"
              class="icon" title="不看该域主内容"
              v-if="item.info.host !== locationHost && shieldList[item.info.host]"
              @click="shieldUser(item.info.host)"/>
          <icon
              icon="icon-sys-gossip-info"
              width="25px" height="25px"
              class="icon" title="查看全部"
              @click="routerPush('gossipInfo',buildQuery(item.info.host, item.info.id))"/>
        </div>
      </li>
    </ul>
    <div v-else class="cover">
      <div>暂时什么都还没有哦</div>
    </div>

    <PastTop/>
    <Settings @onlyHost="(data)=> onlyHost = data.value"/>
  </div>
</template>

<script setup>
import Router from "@/components/Router.vue";
import ContentView from "@/components/contentView/ContentView.vue";
import PastTop from "@/components/PastTop.vue";
import Icon from "@/components/Icon.vue";
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import localStorage from "@/composition/localStorage.js";
import { getGossipCutByUrl } from "@/api/gossipAPI.js";
import Settings from "@/views/gossip/Settings.vue";

// 本地列表信息
const gossipList = localStorage.getContent(localStorage.menu.GOSSIP_CONTENT_LIST);

// 本地用户信息
const gossipUserList = localStorage.getContent(localStorage.menu.GOSSIP_USER_LIST);

// 列表内容
const gossipContentList = reactive([]);

// 路由
const router = useRouter();

// 域名
const locationHost = ref(location.origin);

// 只看域主
const onlyHost = ref(false);

// 屏蔽列表
const shieldList = ref({});

// 生命周期
onMounted(() => {
  // 请求内容列表
  requestContentList()
})

// 屏蔽域主
function shieldUser(host) {
  // 获取屏蔽列表
  const shield = localStorage.getContent(localStorage.menu.GOSSIP_SHIELD) || [];
  if (shield.indexOf(host) === -1) {
    // 如果不在屏蔽列表中则添加
    shield.push(host);
    localStorage.setContent(localStorage.menu.GOSSIP_SHIELD, shield);
    shieldList.value[host] = false;
  }

  // 删除内容列表中所有有该域主的数据
  const contentList = localStorage.getContent(localStorage.menu.GOSSIP_CONTENT_LIST)
  localStorage.setContent(localStorage.menu.GOSSIP_CONTENT_LIST, contentList.filter(item => item.indexOf(host) === -1))
}

// 请求内容列表
async function requestContentList() {
  if (!gossipList) return

  // 使用Promise.all处理并发请求
  const requests = gossipList.map(async (item) => {
    const itemT = item.split("-")
    const id = `${itemT[0]}-${itemT[1]}`
    const host = itemT.slice(2).join("-")

    try {
      const resp = await getGossipCutByUrl(id, host)
      if (resp === 'error') return null // 标记错误响应

      resp.info.host = host
      shieldList.value[host] = true
      return resp
    } catch {
      return null
    }
  })

  // 等待所有请求完成并过滤无效项
  const results = await Promise.all(requests)
  gossipContentList.push(...results.filter(Boolean))
}

// 路由跳转
function routerPush(name, query) {
  router.push({name: name, query: {...query}});
}

// 构建传递数据
const buildQuery = (host, id) => {
  const user = gossipUserList[host];
  return {
    id: id,
    url: host,
    name: user.name,
    avatar: user.avatar,
    description: user.description,
    giscus_repo: user.giscus.repo,
    giscus_repoId: user.giscus.repoId,
    giscus_category: user.giscus.category,
    giscus_categoryId: user.giscus.categoryId
  }
}
</script>

<style scoped>
/* 内容底部 */
.content-bottom {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 0 0 12px 12px;
  background-color: rgba(110, 110, 110, 0.3);
  padding: 8px 15px;

  .icon {
    cursor: pointer;
    margin: 0 5px;
    transition: all 0.3s ease;
    color: white;
  }
  
  .icon:hover {
    transform: scale(1.2);
    color: #a777e3;
  }
}

/* 覆盖 */
.cover {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  margin-top: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  div {
    font-size: 30px;
    font-weight: bolder;
    color: #2d3748;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 20px 40px;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}

/* 内容 */
.content {
  width: 100%;
  background-color: rgba(22, 22, 22, 0.2);
  padding: 15px;
  border-radius: 0 12px 0 0;
  color: #fff;
  min-height: 100px;
  
  img {
    max-width: 80%;
    border-radius: 8px;
    margin: 10px 0;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  }
}

/* 时间 */
.time {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  border-radius: 0 12px 0 0;
  background-color: rgba(255, 255, 255, 0.5);
  color: #2d3748;
  font-size: 14px;
  font-weight: 500;
}

/* 作者 */
.author {
  display: flex;
  align-items: center;
  max-width: 50%;
  padding: 8px 15px;
  border-radius: 12px 0 0 0;
  border-right: 2px dashed rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.5);
  color: #2d3748;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
  }
}

/* 文章信息 */
.articleInfo {
  display: flex;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px 12px 0 0;
  overflow: hidden;
}

/* 时间线 */
.line {
  border-left: 5px solid rgba(255, 255, 255, 0.8);
  padding-left: 20px;
  margin-left: 10px;
}

/* 卡片 */
.card {
  margin: 20px 0;
  list-style: none;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* 时间轴 */
.timeline {
  margin: 0 auto;
  width: 80%;
  min-width: 300px;
  padding: 20px 5px;
}

@media (max-width: 768px) {
  .timeline {
    width: 95%;
  }
  
  .articleInfo {
    flex-direction: column;
  }
  
  .author {
    max-width: 100%;
    border-right: none;
    border-bottom: 2px dashed rgba(0, 0, 0, 0.2);
  }
  
  .time {
    border-radius: 0;
  }
}
</style>