<template>
     <div class="filter-content">
        <div class="filter-title" @click="toggleCategory">카테고리</div>
        <transition name="slide">
          <div v-if="isCategoryVisible" class="filter-group">
            <button class="filter-option" :class="{ active: category == ''}" @click="selectFilter('category','')">전체</button>
            <button class="filter-option" :class="{ active: category == 'Clothes' }" @click="selectFilter('category', 'Clothes')">의류</button>
            <button class="filter-option" :class="{ active: category == 'Shoes' }" @click="selectFilter('category','Shoes')">신발</button>
            <button class="filter-option" :class="{ active: category == 'Bag' }" @click="selectFilter('category','Bag')">가방</button>
          </div>
        </transition>
        <div class="filter-title" @click="toggleType">상품유형</div>
        <transition name="slide">
          <div v-if="isTypeVisible" class="filter-group">
            <button class="filter-option" :class="{ active: productType == ''}" @click="selectFilter('productType', '')">전체</button>
            <button class="filter-option" :class="{ active: productType == 'luxuary'}" @click="selectFilter('productType','luxuary')">럭셔리</button>
            <button class="filter-option" :class="{ active: productType == 'boutique'}" @click="selectFilter('productType','boutique')">부티크</button>
            <button class="filter-option" :class="{ active: productType == 'vintage'}" @click="selectFilter('productType','vintage')">빈티지</button>
          </div>
        </transition>

        <div class="filter-title" @click="togglevintageGrade">빈티지 등급</div>
        <transition name="slide">
          <div v-if="isvintageGradeVisible" class="filter-group">
            <button class="filter-option vintage" :class="{ active: vintageGrade.includes('')}"  @click="selectFilter('vintageGrade', '')">전체</button>
            <button class="filter-option vintage" :class="{ active: vintageGrade.includes('S+')}"  @click="selectFilter('vintageGrade','S+')">S+</button>
            <button class="filter-option vintage" :class="{ active: vintageGrade.includes('A+')}"  @click="selectFilter('vintageGrade','A+')">A+</button>
            <button class="filter-option vintage" :class="{ active: vintageGrade.includes('A')}"  @click="selectFilter('vintageGrade','A')">A</button>
            <button class="filter-option vintage" :class="{ active: vintageGrade.includes('B+')}"  @click="selectFilter('vintageGrade','B+')">B+</button>
            <button class="filter-option vintage" :class="{ active: vintageGrade.includes('B')}"  @click="selectFilter('vintageGrade','B')">B</button>
          </div>
        </transition>
        
        <div class="filter-title" @click="toggleDeliveryType">배송</div>
        <transition name="slide">
          <div v-if="isDeliveryTypeVisible" class="filter-group">
            <button class="filter-option vintage" :class="{ active: deliveryType.includes('domestic')}"  @click="selectFilter('deliveryType', 'domestic')">국내배송</button>
            <button class="filter-option vintage" :class="{ active: deliveryType.includes('abroad')}"  @click="selectFilter('deliveryType', 'abroad')">해외배송</button>
            <button class="filter-option vintage" :class="{ active: deliveryType.includes('express')}"  @click="selectFilter('deliveryType', 'express')">익스프레스</button>
          </div>
        </transition>

        <div class="filter-title" @click="togglePrice">가격</div>
        <transition name="slide">
          <div v-if="isPriceVisible" class="filter-group">
            <RangeSlider
                v-model="value"
                style="width: 100%"
                step
                @click="selectFilter('range', undefined)"
                :min="0"
                :max="3000000"
                >
                <template #suffix>원</template>
            </RangeSlider>
            <div>
              <button class="filter-option" :class="{ active: this.value[1] <= 200000}" @click="selectFilter('priceRange', '0,200000')">20만원 이하</button>
              <button class="filter-option" :class="{ active: this.value[0] >= 200000 && this.value[1] <= 490000}" @click="selectFilter('priceRange', '200000,490000')">20만원 ~ 49만원</button>
              <button class="filter-option" :class="{ active: this.value[0] >= 490000 && this.value[1] <= 750000}" @click="selectFilter('priceRange', '490000,750000')">49만원 ~ 75만원</button>
              <button class="filter-option" :class="{ active: this.value[0] >= 750000 && this.value[1] <= 1200000}" @click="selectFilter('priceRange','750000,1200000')">75만원 ~  120만원</button>
              <button class="filter-option" :class="{ active: this.value[0] >= 1200000 && this.value[1] <= 1790000}" @click="selectFilter('priceRange','1200000,1790000')">120만원 ~ 179만원</button>
              <button class="filter-option" :class="{ active: this.value[0] >= 1790000 && this.value[1] <= 2500000}" @click="selectFilter('priceRange','1790000,2500000')">179만원 ~ 250만원</button>
              <button class="filter-option" :class="{ active: this.value[0] >= 2500000 }" @click="selectFilter('priceRange','2500000,3000000')">250만원 이상</button>
            </div>
          </div>
        </transition>
        <button class="reset-button" @click="resetFilter">초기화</button>
        <button class="apply-button" @click="applyFilter"><span v-text="totalProductCnt"></span> 개의 상품보기</button>
    </div>
</template>

<script>
import axios from 'axios';
import 'vue-simple-range-slider/css';
import RangeSlider from 'vue-simple-range-slider';

export default {
    name: 'FilterSelect',
    props : ["filterData"],
    data() {
      return {
        isCategoryVisible: true,
        isTypeVisible: true,
        isvintageGradeVisible: false,
        isDeliveryTypeVisible : true,
        isPriceVisible: true,
        category : Object.keys(this.filterData).length != 0 &&  this.filterData.categry != undefined ? this.filterData.category : '',               //카테고리
        productType : Object.keys(this.filterData).length != 0 &&  this.filterData.productType != undefined ? this.filterData.productType : '',     //상품유형
        vintageGrade : Object.keys(this.filterData).length != 0 &&  this.filterData.vintageGrade.length != 0 ? this.filterData.vintageGrade : [],   //빈티지타입
        deliveryType : Object.keys(this.filterData).length != 0 &&  this.filterData.deliveryType.length != 0 ? this.filterData.deliveryType : [],    //배송
        value: Object.keys(this.filterData).length != 0 && this.filterData.value.length != 0 ? this.filterData.value : [0, 3000000],  //가격
        totalProductCnt : 0,  //상품갯수
    }},
    components : {
        RangeSlider
    },
    created (){ // 팝업이 켜질 때 상품 건수 조회
      this.fetchProductCount(); 
    },
    methods: {
        toggleCategory() {
            this.isCategoryVisible = !this.isCategoryVisible;
        },
        toggleType() {
            this.isTypeVisible = !this.isTypeVisible;
        },
        togglevintageGrade() {
            if(this.type === 'vintage'){
                this.isvintageGradeVisible = !this.isvintageGradeVisible;
            }
        },
        toggleDeliveryType(){
          this.isDeliveryTypeVisible = !this.isDeliveryTypeVisible;
        },
        togglePrice() {
            this.isPriceVisible = !this.isPriceVisible;
        },
        async fetchProductCount(){ // 상품 건수 조회
          const response = await axios.get('http://localhost:3030/products/count', {
            params: {
              category: this.category == '' ? undefined : this.category,
              minPrice: parseInt(this.value[0], 10) || 0,
              maxPrice: parseInt(this.value[1], 10) || 3000000,
              productType: this.productType,
              vintageGrade: this.vintageGrade,
              deliveryType : this.deliveryType,
            }});

          if(response.status == 200){
            this.totalProductCnt = response.data.count;
          }else{
            throw new Exception();
          }
        },
        selectFilter(btnType, btnvalue){ //필터 선택 
            //btnType : category : 카테고리, type : 상품유형, vintageGrade : 빈티지등급 
            //btnvalue : 
            if(btnType === 'category'){
              this.category = btnvalue;
            }else if(btnType === 'vintageGrade'){
              if(this.vintageGrade.includes(btnvalue)){
                this.vintageGrade = this.vintageGrade.filter((item, index) => {return item != btnvalue;});
              }else{
                this.vintageGrade.push(btnvalue);
              }
            }else if(btnType === 'productType' && btnvalue === 'vintage'){ 
                this.productType = btnvalue;
                this.isvintageGradeVisible = true;  
            }else if(btnType === 'productType' && btnvalue !== 'vintage'){
                this.productType = btnvalue;
                this.isvintageGradeVisible = false;
                this.vintageGrade = [];
            }else if(btnType === 'deliveryType'){
              if(this.deliveryType.includes(btnvalue)){
                this.deliveryType = this.deliveryType.filter((item, index) => {return item != btnvalue;});
              }else{
                this.deliveryType.push(btnvalue);
              }
            }else if(btnType === 'priceRange'){
                this.value = btnvalue.split(",");
            }

            this.fetchProductCount();
        }, 
        resetFilter(){ // 필터 초기화 
          this.category = '';
          this.productType = '';
          this.vintageGrade = [];
          this.deliveryType = [];
          this.value = [0, 3000000];
          this.selectFilter('type', '', null);
          this.fetchProductCount();
        },
        applyFilter() { // 필터 적용하기 
          let data = {
            category : this.category =='' ? undefined : this.category ,
            productType : this.productType == '' ? undefined : this.productType,
            vintageGrade : this.vintageGrade,
            deliveryType : this.deliveryType,
            value : this.value,
          }
          this.$emit('sendData', data);
        }
    }, 
  };
  </script>
  
  <style scoped>
  
  /* 필터 팝업 스타일 */
  /* 슬라이드 애니메이션 스타일 */
 
.filter-content .filter-title{
  font-size: large;
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 0;
}

.filter-content {
  padding: 16px;
}

.filter-group {
  margin-bottom: 20px;
}

.filter-option{
  border-radius: 5px;
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
  display: inline;
  width: 70%;
  padding: 12px 0;
  background-color: #000;
  color: #fff;
  text-align: center;
  border: solid 1px #000;
  cursor: pointer;
}

.reset-button{
  display: inline;
  width: 30%;
  padding: 12px 0;
  background-color: #fff;
  color: #000;
  text-align: center;
  border: solid 1px #000;
  cursor: pointer;
}
.reset-button:hover{
  background-color: #ececec;
}
.apply-button:hover{
  background-color: #333;
}

.active {
  background-color: lightskyblue !important;
}
</style>