<template>
  <h1 v-if="contentComputed.type === 'h1'">{{ contentComputed.content }}</h1>
  <h2 v-if="contentComputed.type === 'h2'">{{ contentComputed.content }}</h2>
  <h3 v-if="contentComputed.type === 'h3'">{{ contentComputed.content }}</h3>
  <h4 v-if="contentComputed.type === 'h4'">{{ contentComputed.content }}</h4>
  <h5 v-if="contentComputed.type === 'h5'">{{ contentComputed.content }}</h5>
  <h6 v-if="contentComputed.type === 'h6'">{{ contentComputed.content }}</h6>
  <p v-if="contentComputed.type === 'p'">{{ contentComputed.content }}</p>
  <img v-if="contentComputed.type === 'img'" :src="contentComputed.content" alt="假装这里有一张图片"/>
</template>

<script setup>
import {computed} from 'vue';

const props = defineProps(["content"]);
let contentComputed = computed(() => {
  let c = String(props.content)
  let split = c.split(":");

  if (split.length > 2) {
    for (let i = 2; i < split.length; i++) split[1] += (":" + split[i])
  }

  return {
    type: split[0],
    content: split[1]
  };
});
</script>

<style scoped>
* {
  text-align: left;
  margin: 10px 0;
  padding: 0;
  box-sizing: border-box;
  height: 30px;
  line-height: 30px;
}

h1 {
  text-align: center;
  font-size: 25px;
  height: 35px;
  line-height: normal;
}

img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

h2 {
  font-size: 20px;
  border-bottom: 2px solid #ccc;
}

h3 {
  padding-left: 10px;
  border-left: 5px solid #ccc;
}

p {
  height: auto;
  letter-spacing: 1px;
}
</style>
