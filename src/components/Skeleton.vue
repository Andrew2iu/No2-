<template>
  <div class="skeleton-container">
    <div class="skeleton-item" v-for="(item, index) in count" :key="index">
      <div class="skeleton-header" v-if="showHeader">
        <div class="skeleton-avatar"></div>
        <div class="skeleton-title"></div>
      </div>
      <div class="skeleton-content">
        <div class="skeleton-line" v-for="line in lines" :key="line" :style="{ width: lineWidths[line % lineWidths.length] }"></div>
      </div>
      <div class="skeleton-image" v-if="showImage"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skeleton',
  props: {
    // 骨架屏数量
    count: {
      type: Number,
      default: 1
    },
    // 是否显示头部
    showHeader: {
      type: Boolean,
      default: true
    },
    // 内容行数
    lines: {
      type: Number,
      default: 3
    },
    // 每行宽度
    lineWidths: {
      type: Array,
      default: () => ['100%', '80%', '60%']
    },
    // 是否显示图片
    showImage: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.skeleton-container {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}

.skeleton-item {
  width: 100%;
  margin-bottom: 24px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.skeleton-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.skeleton-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.skeleton-title {
  width: 120px;
  height: 20px;
  margin-left: 12px;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

.skeleton-content {
  width: 100%;
}

.skeleton-line {
  height: 16px;
  margin-bottom: 8px;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

.skeleton-image {
  width: 100%;
  height: 180px;
  margin-top: 12px;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
