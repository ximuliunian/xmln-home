<template>
  <div>
    <el-row style="justify-content: space-between">
      <!--  每日英文 - 教书先生API  -->
      <el-col :span="spanNum" class="card">
        <DailyEnglish/>
      </el-col>
      <!--  时钟  -->
      <el-col v-if="timeFlag" :span="spanNum" class="card">
        <DateTime/>
      </el-col>
    </el-row>
    <!--  站点导航  -->
    <el-row v-if="config.right.homeInfo.siteNavs.enable" class="site-nav">
      <el-col v-for="info in config.right.homeInfo.siteNavs.info" :span="5">
        <a :href="info.url" class="card" target="_blank">
          <svg aria-hidden="true" class="icon">
            <use :xlink:href='`#${info.icon}`'></use>
          </svg>
          {{ info.name }}
        </a>
      </el-col>
    </el-row>
    <!--  轮播图  -->
    <el-row v-if="config.right.homeInfo.banner.enable" class="card">
      <el-col :span="24">
        <el-carousel height="200px" motion-blur>
          <el-carousel-item v-for="info in config.right.homeInfo.banner.info">
            <img :src="info" alt="假装这里有一张图片">
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <!--  简介  -->
    <el-row v-if="config.right.homeInfo.selfInfo.enable" class="card">
      <el-col :span="24">
        <ContentView v-for="info in config.right.homeInfo.selfInfo.info" :content="info"/>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import DateTime from "@/components/DateTime.vue";
import DailyEnglish from "@/components/DailyEnglish.vue";
import config from "../../../homeConfig.js";
import ContentView from "@/components/ContentView.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";

let spanNum = ref(11);
let timeFlag = ref(true);

const getWidth = () => {
  timeFlag.value = window.innerWidth >= 880;
  spanNum.value = timeFlag.value ? 11 : 24;
};

onMounted(() => {

  // 屏蔽右键
  document.oncontextmenu = () => {
    ElMessage({
      message: "为了浏览体验，本站禁用右键",
      grouping: true,
      duration: 2000,
    });
    return false;
  };
  getWidth();
  // 监听当前页面宽度
  window.addEventListener("resize", getWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", getWidth);
});
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  a {
    height: 50px;
    margin-top: 10px;
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  .icon {
    width: 23px;
    height: 23px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    margin-right: 5px;
  }
}

.el-carousel__item {
  border-radius: 5px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
