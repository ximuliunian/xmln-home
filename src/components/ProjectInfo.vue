<template>
  <div>
    <div class="head">
      <img :src="content.logo" alt="假装这里有一张图片">
      <span>{{ content.name }}</span>
      <a v-if="content.officialWebsite !== ''" :href="content.officialWebsite" target="_blank" title="前往发布页">
        <el-icon>
          <Position/>
        </el-icon>
      </a>
    </div>
    <div class="body">
      {{ content.description }}
    </div>
    <div class="foot">
      <a v-for="site in content.internetSite" :href="site.url" target="_blank">
        {{ site.name }}
      </a>
    </div>
  </div>
</template>

<script setup>

import {Position} from "@element-plus/icons-vue";

const props = defineProps(["content"]);
</script>

<style scoped>
.head {
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: bolder;
  position: relative;

  img {
    width: 60px;
    border-radius: 10px;
    margin-right: 10px;
  }

  a {
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50px;
  }

  a:hover {
    transition: all 0.5s;
    background-color: rgba(255, 255, 255, 0.5);
    color: rgba(0, 0, 0, 0.5);
  }
}

.body {
  margin: 10px 0;
  padding: 10px 0;
  text-align: left;
  border-top: 1px dashed rgba(255, 255, 255, 0.5);
  border-bottom: 1px dashed rgba(255, 255, 255, 0.5);
  font-size: 1.2rem;
}

.foot {
  text-align: left;

  a {
    display: inline-block;
    margin: 0 10px;
    color: white;
    background-color: #409EFF;
    border-radius: 10px;
    padding: 5px;
    font-weight: bold;
  }
}
</style>
