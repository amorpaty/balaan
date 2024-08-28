<template>
  <header class="header">상품 목록</header>
  <div class="product-list-page">
    <!-- 필터 및 정렬 옵션 -->
    <div class="filter-bar">
      <button class="filter-dropdown" @click="toggleFilterPopup()">
        카테고리
      </button>
      <button class="filter-dropdown" @click="toggleFilterPopup()">
        상품유형
      </button> 
      <button class="filter-dropdown" @click="toggleFilterPopup()">
        빈티지 등급
      </button>
      <select class="filter-dropdown" @click="toggleFilterPopup()">        
        <option value="">정렬</option>
      </select>
    </div>
    <!-- 상품 목록 -->
    <product-item/>
    <!-- 필터 팝업 -->
    <filter-popup v-bind:isFilterPopupVisible="isFilterPopupVisible" @close-popup="toggleFilterPopup"></filter-popup>
  </div>
</template>

<script>
import FilterPopup from './components/FilterPopup.vue';
import ProductItem from './components/ProductItem.vue';

export default {
  name: 'ProductListPage',
  components: {
    ProductItem,
    FilterPopup
  },
  data() {
    return {
      isFilterPopupVisible: false, // 필터 팝업 표시 여부
  }},
  methods: {
    toggleFilterPopup() {
      this.isFilterPopupVisible = !this.isFilterPopupVisible;
    },
  }
};
</script>

<style scoped>
.header{
  padding : 15px;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  font-size: larger;
  font-weight: bold;
}

.product-list-page {
  padding: 16px;
  max-width: 500px;
  margin: 0 auto;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-dropdown {
  padding: 8px;
  font-size: 14px;
  flex: 1;
  margin: 4px;
}



/* 반응형 스타일 */
@media (max-width: 500px) {
  .filter-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-dropdown {
    width: 100%;
    margin-bottom: 8px;
  }

  .product-list {
    grid-template-columns: 1fr;
  }

}
</style>