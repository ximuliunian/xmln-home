<template>
  <el-container>
    <!-- 主要内容 -->
    <el-main>
      <el-row>
        <!-- 左半屏 -->
        <el-col :span="12">
          <LeftInfo/>
        </el-col>
        <!-- 右半屏 -->
        <el-col :span="12" class="right-info">
          <div id="right-info">
            <router-view v-slot="{ Component }">
              <transition mode="out-in" name="scale">
                <component :is="Component"/>
              </transition>
            </router-view>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <!-- 页脚 -->
    <el-footer>
      <el-row justify="space-around">
        <!-- 建站日期 -->
        <el-col :span="33">
          建站日期：<span>{{ config.buildTime }}</span>
        </el-col>
        <!-- 作者 -->
        <el-col :span="33">
          作者：<a href="https://github.com/ximuliunian">曦暮流年</a>
        </el-col>
        <!-- 备案信息 -->
        <el-col v-if="config.ICP.enable || config.buildTime.includes('ximuliunian.top')" :span="33">
          备案：<a href="http://beian.miit.gov.cn">{{ config.ICP.info }}</a>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script setup>
import config from "../homeConfig.js";
import LeftInfo from "@/views/app/LeftInfo.vue";
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter-from {
  opacity: 100;
  transform: scale(0.100);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(0.100);
}

.el-container {
  background-image: url("https://img.ximuliunian.top/壁纸/6/11.png");
  width: 100%;
  height: 100%;
  position: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  user-select: none;
}

/* 取消默认样式 */
.el-main,
.el-footer {
  padding: 0;
}

.el-main > .el-row > .el-col {
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-footer {
  width: 100%;
  height: 30px;
  border: none;
  position: absolute;
  bottom: 0;
  backdrop-filter: blur(200px);
  color: #fff;
  line-height: 30px;

  .el-col {
    text-align: center;
    padding: 0;
  }

  a {
    color: #fff;
    text-decoration: none;
  }
}

#right-info {
  margin-top: 25px;
  padding: 25px;
  color: white;
  text-align: center;
  min-width: 300px;
  width: 100%;
  height: 95vh;
}

/* 隐藏滚动条同时保持滚动功能 */
::-webkit-scrollbar {
  display: none; /* 隐藏Webkit内核浏览器的滚动条 */
}

.right-info {
  -ms-overflow-style: none; /* IE 和 Edge */
  scrollbar-width: none; /* Firefox */
  overflow-y: auto; /* 保持内容可以滚动 */
}
</style>
