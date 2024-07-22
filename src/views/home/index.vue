<template>
  <div>
    <el-row style="justify-content: space-between">
      <!--  每日英文 - 教书先生API  -->
      <el-col :span="11" class="card">
        <DailyEnglish/>
      </el-col>
      <!--  时钟  -->
      <el-col :span="11" class="card">
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
  </div>
</template>

<script setup>
import DateTime from "@/components/DateTime.vue";
import DailyEnglish from "@/components/DailyEnglish.vue";
import config from "../../../homeConfig.js";
</script>

<style>
.card {
  padding: 10px;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

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
    background-color: rgba(255, 255, 255, 0.5);
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
</style>
