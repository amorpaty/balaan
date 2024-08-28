<template>
  <div v-if="this.isFilterPopupVisible " class="filter-popup-overlay">
    <div class="filter-popup">
      <div class="filter-popup-header">
        <header>
            <h2 class="filter-title">필터</h2>
            <button @click="closeFilterPopup" class="close-button">✖</button>
        </header>
      </div>
      <!--Filter Select -->
      <Select></Select>
    </div>
  </div>
</template>

<script>
import Select from './Select.vue';

export default {
  name: 'FilterPopup',
  props: ["isFilterPopupVisible"],
  data() {
    return {
  }},
  components : {
    Select
  },
  methods: {
    closeFilterPopup() {
      this.$emit('close-popup');
    },
  }
};
</script>

<style scoped>

/* 필터 팝업 스타일 */
.filter-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.filter-popup {
  width: 90%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: 80vh; /* 팝업의 최대 높이를 설정하여 화면을 넘지 않도록 함 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 가능하도록 설정 */
  scrollbar-width: thin;
}

.filter-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter-popup-header > header {
  display: flex;
  width: 100%;
  text-align: center;
}

.filter-title {
  font-size: larger;
  font-weight: bold;
  margin: 0;
  display: block;
  width: 100%;
  margin-left: 27px;
}
.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>