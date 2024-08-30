<template>
  <div>
    <div class="product-list">
      <div class="product-item" v-for="product in this.products" :key="product.productNo" @click="detailProduct(product.productNo)">
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
      <button @click="changePage(pageNumber)" v-for="pageNumber in totalPages" :key="pageNumber" class="custom-button">
        {{ pageNumber }}
      </button>
    </div>
  </div>  
</template>

<script>
import axios from 'axios';
import '../public/css/productItem.css'

export default {
  data() {
    return {
      totalCount : Number, // 상품 총 갯수 
      currentPage: 1, // 현재 페이지
      totalPages: 0, // 표출된 페이지 수  
      pageSize: 30,  // 한 페이지에 표시할 항목 수
      products: [],  // 초기 빈 배열
    };
  },
  props: ["filterData"],
  methods: {  
    async fetchProducts(page = 1) { // 상품목록 조회

      let params =  {
           page: page,
           size: this.pageSize
      }

      if(Object.keys(this.filterData).length != 0){
         Object.assign(params, this.filterData);
         params.minPrice = this.filterData.value[0];
         params.maxPrice = this.filterData.value[1];
      }

      try {
        const response = await axios.get('http://localhost:3030/products', {params});

        if(response.status == 200){
          this.products = response.data.list;
          this.totalCount = response.data.totalCount;
          this.totalPages = Math.ceil(this.totalCount / (this.pageSize == undefined? 30 : this.pageSize));
        }else{
          throw new Exception();
        }
      } catch (error) {
        console.error('상품 목록을 가져오는데 실패했습니다:', error);
      }
    }, 
    changePage(page) { //페이징 처리
      this.fetchProducts(page);
    },
    async detailProduct(productNo){ //상품 디테일 팝업
      try {
        const response = await axios.get('http://localhost:3030/products/' + productNo, );        
      }catch (error) {
        console.error('상품 상세 정보를 가져오는데 실패했습니다:', error);
      }
    }
  },
  mounted() {
    this.fetchProducts(); // 컴포넌트가 마운트될 때 데이터 가져오기
  },
  watch : { //변경된 필터 감지 후 필터에 해당하는 상품 목록 조회
    filterData(newValue, oldValue){
      this.fetchProducts();
    }
  }
};
</script>