<template>
  <div class="product-list-page">
    <!-- 필터 및 정렬 옵션 -->
    <div class="filter-bar">
      <select class="filter-dropdown">
        <option value="">카테고리</option>
        <option value="category1">의류</option>
        <option value="category2">신발</option>
        <option value="category3">가방</option>
      </select>
      <select class="filter-dropdown">
        <option value="">상품유형</option>
        <option value="luxury">럭셔리</option>
        <option value="vintage">빈티지</option>
      </select>
      <select class="filter-dropdown">
        <option value="">빈티지 등급</option>
        <option value="luxury">럭셔리</option>
        <option value="vintage">빈티지</option>
      </select>
      <select class="filter-dropdown">
        <option value="">정렬</option>
        <option value="price_asc">가격 낮은순</option>
        <option value="price_desc">가격 높은순</option>
        <option value="newest">최신순</option>
      </select>
    </div>

    <!-- 상품 목록 -->
    <product-item/>
  </div>
</template>

<script>
import ProductItem from './components/ProductItem.vue';

export default {
  name: 'ProductListPage',
  components: {
    ProductItem
  },
  
};
</script>

<style scoped>
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