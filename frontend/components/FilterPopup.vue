<template>
  <div v-if="this.isFilterPopupVisible " class="filter-popup-overlay">
    <div class="filter-popup">
      <div class="filter-popup-header">
        <header>
            <h2 class="filter-title">필터</h2>
            <button @click="closeFilterPopup" class="close-button">✖</button>
        </header>
      </div>
      <div class="filter-content">
        <div class="filter-title" @click="toggleCategory">카테고리</div>
        <transition name="slide">
          <div v-if="isCategoryVisible" class="filter-group">
            <button class="filter-option" @click="selectFilter('전체')">전체</button>
            <button class="filter-option" @click="selectFilter('의류')">의류</button>
            <button class="filter-option" @click="selectFilter('신발')">신발</button>
            <button class="filter-option" @click="selectFilter('가방')">가방</button>
          </div>
        </transition>

        <div class="filter-title" @click="toggleType">상품유형</div>
        <transition name="slide">
          <div v-if="isTypeVisible" class="filter-group">
            <button class="filter-option" @click="selectFilter('전체')">전체</button>
            <button class="filter-option" @click="selectFilter('럭셔리')">럭셔리</button>
            <button class="filter-option" @click="selectFilter('부티크')">부티크</button>
            <button class="filter-option" @click="selectFilter('빈티지')">빈티지</button>
          </div>
        </transition>

        <div class="filter-title" @click="toggleGrade">빈티지 등급</div>
        <transition name="slide">
          <div v-if="isGradeVisible" class="filter-group">
            <button class="filter-option vintage" @click="selectFilter('전체')">전체</button>
            <button class="filter-option vintage" @click="selectFilter('S+')">S+</button>
            <button class="filter-option vintage" @click="selectFilter('A+')">A+</button>
            <button class="filter-option vintage" @click="selectFilter('A')">A</button>
            <button class="filter-option vintage" @click="selectFilter('B+')">B+</button>
            <button class="filter-option vintage" @click="selectFilter('B')">B</button>
          </div>
        </transition>

        <div class="filter-title" @click="togglePrice">가격</div>
        <transition name="slide">
          <div v-if="isPriceVisible" class="filter-group">
            <input type="range" min="0" max="3000000" v-model="priceRange" class="price-range"/>
            <p>{{ priceRange }}원</p>
          </div>
        </transition>
        <button class="apply-button" @click="applyFilter">적용</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductListPage from '../app.vue'

export default {
  name: 'FilterPopup',
  props: ["isFilterPopupVisible"],
  data() {
    return {
      isCategoryVisible: true,
      isTypeVisible: true,
      isGradeVisible: false,
      isPriceVisible: true,
      priceRange: 0,
  }},
  methods: {
    closeFilterPopup() {
      this.$emit('close-popup');
    },
    toggleCategory() {
      this.isCategoryVisible = !this.isCategoryVisible;
    },
    toggleType() {
      this.isTypeVisible = !this.isTypeVisible;
    },
    toggleGrade() {
      this.isGradeVisible = !this.isGradeVisible;
    },
    togglePrice() {
      this.isPriceVisible = !this.isPriceVisible;
    },
    applyFilter() {
      ProductListPage.toggleFilterPopup(); // 필터 적용 후 팝업 닫기
    }
  }
};
</script>

<style scoped>

/* 필터 팝업 스타일 */
/* 슬라이드 애니메이션 스타일 */
.slide-enter-active, .slide-leave-active {
  transition: max-height 0.3s ease;
}
.slide-enter, .slide-leave-to {
  max-height: 0;
  overflow: hidden;
}
.slide-enter-to, .slide-leave {
  max-height: 300px; /* 원하는 최대 높이로 설정 */
}

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

.filter-content .filter-title{
  font-size: large;
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.filter-content {
  padding: 16px;
}

.filter-group {
  margin-bottom: 20px;
}

.filter-option:nth-child(2n+1) {
  display: inline;
  width: 45%;
  padding: 8px 16px;
  margin : 1px 30px 1px 1px;
  border: 1px solid #ddd;
  margin-bottom: 8px;
  cursor: pointer;
  background-color: #f9f9f9;
}

.filter-option:nth-child(2n) {
  display: inline;
  width: 45%;
  padding: 8px 16px;
  border: 1px solid #ddd;
  margin-bottom: 8px;
  cursor: pointer;
  background-color: #f9f9f9;
}

.filter-option.vintage{
  width: 30%;
  margin: 1px 1px 8px 1px;
}


.filter-option.vintage:nth-child(3n+2){
  width: 30%;
  margin: 0px 15px 8px 15px;
}

.filter-option:hover {
  background-color: #ececec;
}

.price-range {
  width: 100%;
  margin-top: 8px;
}

.apply-button {
  display: block;
  width: 100%;
  padding: 12px 0;
  background-color: #000;
  color: #fff;
  text-align: center;
  border: none;
  cursor: pointer;
}

.apply-button:hover {
  background-color: #333;
}
</style>