<template>
  <Loading :backFlag="backLoading"/>
  <img v-show="!background" :src="background" @load="backLoading = true">
  <el-container :style="{backgroundImage: 'url(' + background + ')'}">
    <!-- 主要内容 -->
    <el-main>
      <el-row>
        <!-- 左半屏 -->
        <el-col :span="spanNum">
          <LeftInfo/>
        </el-col>
        <!-- 右半屏 -->
        <el-col :class="rightDataCSS" :span="spanNum">
          <div id="right-info" :style="rightHeight">
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
          <span v-if="flag">建站日期：</span>
          <span>{{ config.buildTime }}</span>
        </el-col>
        <!-- 备案信息 -->
        <el-col v-if="config.ICP.enable || config.buildTime.includes('ximuliunian.top')" :span="33">
          <span v-if="flag">备案：</span>
          <a href="http://beian.miit.gov.cn">{{ config.ICP.info }}</a>
        </el-col>
        <!-- 作者 -->
        <el-col :span="33">
          <span v-if="flag">作者：</span>
          <a href="https://github.com/ximuliunian">曦暮流年</a>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script setup>
import config from "../homeConfig.js";
import LeftInfo from "@/views/app/LeftInfo.vue";
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import Loading from "@/components/Loading.vue";


let background = computed(() => {
  const size = Math.floor(Math.random() * config.backImage.length);
  return config.backImage[size]
})

let spanNum = ref(12);
let flag = ref(true);
let rightDataCSS = ref("right-info");
let rightHeight = ref("height: 95vh;")
let backLoading = ref(false);
// 页面宽度
const getWidth = () => {
  flag.value = window.innerWidth >= 850;
  rightDataCSS.value = flag.value ? "right-info" : "";
  spanNum.value = flag.value ? 12 : 24;
  rightHeight.value = flag.value ? "height: 95vh;" : "margin-top: 500px;";
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
  margin-top: 200px;
  padding: 25px;
  color: white;
  text-align: center;
  min-width: 300px;
  width: 100%;
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
