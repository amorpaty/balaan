<template>
    <div class="product-list">
      <div class="product-item" v-for="product in products" :key="product.productNo" @click="detailProduct(product.productNo)">
        <img :src="product.image" alt="Product Image" class="product-image"/>
        <div class="product-info">
          <h2 class="product-name">{{ product.productName }}</h2>
          <p class="product-price">{{ Number(product.price).toLocaleString() }}원</p>
          <div class="delivery-categroy" v-for="deilivery in product.deliveryType" :key="deilivery">
              {{deilivery == 'express' ? "익스프레스" : deilivery == 'domestic' ? '국내배송' :  '해외배송'}}
          </div>
        </div>
      </div>
    </div>
    <!-- 페이지 네비게이션 -->
    <div class="pagination">
      <button @click="changePage(pageNumber)" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ active: pageNumber === currentPage }" class="custom-button">
        {{ pageNumber }}
      </button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      totalCount : Number,
      currentPage: 1,
      totalPages: 0,
      pageSize: 30,  // 한 페이지에 표시할 항목 수
      products: [],  // 초기 빈 배열
    };
  },
  methods: {
    async fetchProducts(page = 1) {
      try {
        const response = await axios.get('http://localhost:3030/products', {
          params: {
            page: page,
            size: this.pageSize
          }});

        if(response.status == 200){
          this.products = response.data.list;
          this.totalCount = response.data.totalCount;
          this.totalPages = Math.ceil(this.totalCount / this.pageSize);
        }else{
          throw new Exception();
        }
      } catch (error) {
        console.error('상품 목록을 가져오는데 실패했습니다:', error);
      }
    }, 
    changePage(page) {
      this.fetchProducts(page);
    },
    async detailProduct(productNo){
      try {
        const response = await axios.get('http://localhost:3030/products/' + productNo, );

        console.log(response);
        debugger;
      }catch (error) {
        console.error('상품 상세 정보를 가져오는데 실패했습니다:', error);
      }
    }
  },
  mounted() {
    this.fetchProducts(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }
};
</script>

<style scoped>

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
  cursor: pointer;
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
  font-weight: bold;
}

.product-description {
  font-size: 14px;
  color: #777;
}
.delivery-categroy{
  display: inline;
  float: left;
  padding: 3px 7px 4px 7px;
  margin-right: 2px;
  background-color: lightgray;
  color: slategray;
  border-radius: 9px;
  text-align: center;
  font-size: 12px;
}
.pagination{
  margin-top: 0.5rem;
  text-align: center;
}
.pagination .custom-button {
  background-color: black;
  border: 1px solid #ccc;
  color: #fff;
  padding: 8px 12px;
  margin: 0 5px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
</style>