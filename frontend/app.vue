<template>
  <div>
    <header class="header">상품 목록</header>
    <div class="product-list-page">
      <!-- 필터 및 정렬 옵션 -->
      <div class="filter-bar">
        <button class="filter-dropdown" :class="{active : Object.keys(this.filterData).length != 0 && this.filterData.category != undefined}" @click="toggleFilterPopup(null, 'categoryFilter')">
          카테고리 <span v-if="Object.keys(this.filterData).length != 0 && this.filterData.category != undefined"> 1 </span>
        </button>
        <button class="filter-dropdown" :class="{active : Object.keys(this.filterData).length != 0 && this.filterData.productType != undefined}" @click="toggleFilterPopup(null, 'productTypeFilter')">
          상품유형 <span v-if="Object.keys(this.filterData).length != 0 && this.filterData.productType != undefined"> 1 </span>
        </button> 
        <button class="filter-dropdown" :class="{active : Object.keys(this.filterData).length != 0 && this.filterData.vintageGrade.length > 0}" @click="toggleFilterPopup(null, 'vintageGradeFilter')">
          빈티지 등급 <span v-if="Object.keys(this.filterData).length != 0 && this.filterData.vintageGrade.length > 0"> {{this.filterData.vintageGrade.includes('') ? this.filterData.vintageGrade.length -1 : this.filterData.vintageGrade.length}} </span>
        </button>
        <button class="filter-dropdown" :class="{active : Object.keys(this.filterData).length != 0 && this.filterData.deliveryType.length > 0}" @click="toggleFilterPopup(null, 'deliveryTypeFilter')">
          배송 <span v-if="Object.keys(this.filterData).length != 0 && this.filterData.deliveryType.length > 0"> 1 </span>
        </button>
        <button class="filter-dropdown" :class="{active : Object.keys(this.filterData).length != 0 && (this.filterData.value[0] != 0 || this.filterData.value[1] != 3000000)}" @click="toggleFilterPopup(null, 'priceFilter')">        
          가격
        </button>
      </div>
      <!-- 상품 목록 -->
      <product-item v-bind:filterData="filterData"/>
      <!-- 필터 팝업 -->
      <filter-popup v-bind:isFilterPopupVisible="isFilterPopupVisible" v-bind:filterData="filterData"  v-bind:filterType="filterType" @close-popup="toggleFilterPopup"></filter-popup>
    </div>
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
      filterData : {},
      filterType : String,
  }},
  methods: {
    toggleFilterPopup(filterData, filterType) {
      if(filterData){ //필터데이터가 있으면 적용
        this.filterData = filterData;
      }

      this.isFilterPopupVisible = !this.isFilterPopupVisible;      
      this.filterType = filterType;
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
  font-size: 11px;
  font-weight: bold;
  padding: 5px;
  flex: 1;
  margin: 4px;
  background-color: #fff;
  border: 0.5px solid;
  border-radius: 5px;
  cursor: pointer;
}

.filter-dropdown.active{
  color: blue;
  border: 2px solid;
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