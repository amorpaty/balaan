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
        <option value="">정렬</option>
        <option value="price_asc">가격 낮은순</option>
        <option value="price_desc">가격 높은순</option>
        <option value="newest">최신순</option>
      </select>
    </div>

    <!-- 상품 목록 -->
    <div class="product-list">
      <div class="product-item" v-for="product in products" :key="product.id">
        <img :src="product.image" alt="Product Image" class="product-image"/>
        <div class="product-info">
          <h2 class="product-name">{{ product.name }}</h2>
          <p class="product-price">{{ product.price }}원</p>
          <p class="product-description">{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductListPage',
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'PRADA 18H30삼베원피스',
          price: 453000,
          description: '어스피릿, 유럽풍',
          image: 'https://via.placeholder.com/150' // 실제 이미지 경로로 교체하세요
        },
        {
          id: 2,
          name: 'PRADA 18H30삼베원피스',
          price: 453000,
          description: '어스피릿, 유럽풍',
          image: 'https://via.placeholder.com/150' // 실제 이미지 경로로 교체하세요
        },
        // 추가 상품 데이터를 여기에 삽입하세요
      ]
    };
  }
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

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.product-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  text-align: center;
}

.product-image {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
  margin-bottom: 12px;
}

.product-info {
  text-align: left;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.product-price {
  font-size: 16px;
  color: #333;
  margin: 8px 0;
}

.product-description {
  font-size: 14px;
  color: #777;
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