<template>
  <div>
    <p class="title">每日英语：</p>
    <hr>
    <p>{{ getEnglish.en || 'Loading...' }}</p>
    <p>{{ getEnglish.cn || '加载中...' }}</p>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";

const api = 'https://api.oioweb.cn/api/common/OneDayEnglish';

let getEnglish = reactive({
  en: '',
  cn: ''
})
// 获取每日英语
const getData = async () => {
  const parse = JSON.parse(localStorage.getItem("dailyEnglish"));
  if (parse != null) await printText(parse.content, parse.note)

  const result = await fetch(api).then(res => res.json());
  if (result.code === 200) {
    let content = result.result.content;
    let note = result.result.note;
    if (parse == null) {
      await printText(content, note)
    }
    localStorage.setItem("dailyEnglish", JSON.stringify({content, note}));
  }
}

let printText = async (content, note) => {
  let iMax = content.length > note.length ? content.length : note.length;
  for (let i = 0; i < iMax; i++) {
    if (i < content.length)
      getEnglish.en += content[i];
    if (i < note.length)
      getEnglish.cn += note[i];
    // 延迟 0.05s 循环完毕后销毁
    await new Promise(resolve => setTimeout(resolve, 50));
  }
}

onMounted(() => getData())
</script>

<style scoped>
.title {
  text-align: left;
  font-weight: bold;
}
</style>
