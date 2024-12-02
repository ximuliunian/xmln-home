<template>
  <div>
    <!--  轮播图  -->
    <el-row v-if="config.right.projectInfo.banner.enable" class="card">
      <el-col :span="24">
        <el-carousel height="200px" motion-blur>
          <el-carousel-item v-for="info in config.right.projectInfo.banner.info">
            <img :src="info" alt="假装这里有一张图片">
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <!--  项目信息  -->
    <el-row v-for="info in config.right.projectInfo.info" class="site-nav">
      <el-col :span="24" class="card">
        <ProjectInfo :content="info"/>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import config from "../../../homeConfig.js";
import ProjectInfo from "@/components/ProjectInfo.vue";
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
