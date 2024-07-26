<template>
  <div class="left-info card">
    <!--  LOGO  -->
    <el-row :gutter="20">
      <el-col :span="8" style="display: flex; align-items: center">
        <img id="logo" :src="config.left.avatar" alt="假装这里有一个头像">
      </el-col>
      <el-col :span="16">
        <h1 style="font-size: 40px; text-align: left">{{ config.left.name }}</h1>
      </el-col>
    </el-row>

    <hr>
    <!--  简介  -->
    <p class="description">{{ config.left.description }}</p>

    <!--  路由导航  -->
    <div id="router-nav">
      <router-link to="/">
        <el-icon style="font-size: 20px">
          <HomeFilled/>
        </el-icon>
        主页
      </router-link>

      <router-link v-if="config.left.projectEnable" to="/project">
        <el-icon style="font-size: 20px">
          <Grid/>
        </el-icon>
        项目
      </router-link>
    </div>

    <!--  社交链接  -->
    <div v-if="config.left.socials.enable" id="socials">
      <a v-for="social in config.left.socials.info" :href="social.url" target="_blank">
        <svg aria-hidden="true" class="icon">
          <use :xlink:href='`#${social.icon}`'></use>
        </svg>
        {{ social.name }}
      </a>
    </div>
  </div>
</template>

<script setup>
import config from "../../../homeConfig.js";
import {Grid, HomeFilled} from "@element-plus/icons-vue";
</script>

<style scoped>
.left-info {
  padding: 50px;
  color: white;
  text-align: center;
  max-width: 450px;
  min-width: 300px;


  #logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }

  .description {
    text-align: left;
    letter-spacing: 3px;
    font-size: 15px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }

  #router-nav {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    border-top: 2px solid rgba(255, 255, 255, 0.7);

    a {
      color: white;
      text-decoration: none;
      margin-top: 10px;
      display: flex;
      flex-flow: wrap;
      justify-content: center;
      min-width: 70px;
    }

    a:hover {
      color: #409EFF;
    }

  }

  #socials {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    border-top: 2px solid rgba(255, 255, 255, 0.7);
    margin-top: 10px;

    a {
      width: 100px;
      color: white;
      text-align: left;
      text-decoration: none;
      font-size: 20px;
      margin-top: 10px;
    }

    a:hover {
      color: #409EFF;
    }
  }
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

</style>
