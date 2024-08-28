<template>
     <div class="filter-content">
        <div class="filter-title" @click="toggleCategory">카테고리</div>
        <transition name="slide">
          <div v-if="isCategoryVisible" class="filter-group">
            <button class="filter-option" :class="{ active: category == 'ALL'}" @click="selectFilter('category','ALL', $event)">전체</button>
            <button class="filter-option" :class="{ active: category == 'close' }" @click="selectFilter('category', 'close', $event)">의류</button>
            <button class="filter-option" :class="{ active: category == 'shoes' }" @click="selectFilter('category','shoes', $event)">신발</button>
            <button class="filter-option" :class="{ active: category == 'bag' }" @click="selectFilter('category','bag', $event)">가방</button>
          </div>
        </transition>
        <div class="filter-title" @click="toggleType">상품유형</div>
        <transition name="slide">
          <div v-if="isTypeVisible" class="filter-group">
            <button class="filter-option" :class="{ active: type == 'ALL'}" @click="selectFilter('type', 'ALL', $event)">전체</button>
            <button class="filter-option" :class="{ active: type == 'luxury'}" @click="selectFilter('type','luxury', $event)">럭셔리</button>
            <button class="filter-option" :class="{ active: type == 'boutique'}" @click="selectFilter('type','boutique', $event)">부티크</button>
            <button class="filter-option" :class="{ active: type == 'vintage'}" @click="selectFilter('type','vintage', $event)">빈티지</button>
          </div>
        </transition>

        <div class="filter-title" @click="toggleGrade">빈티지 등급</div>
        <transition name="slide">
          <div v-if="isGradeVisible" class="filter-group">
            <button class="filter-option vintage" :class="{ active: grade.includes('ALL')}"  @click="selectFilter('grade', 'ALL', $event)">전체</button>
            <button class="filter-option vintage" :class="{ active: grade.includes('S+')}"  @click="selectFilter('grade','S+', $event)">S+</button>
            <button class="filter-option vintage" :class="{ active: grade.includes('A+')}"  @click="selectFilter('grade','A+', $event)">A+</button>
            <button class="filter-option vintage" :class="{ active: grade.includes('A')}"  @click="selectFilter('grade','A', $event)">A</button>
            <button class="filter-option vintage" :class="{ active: grade.includes('B+')}"  @click="selectFilter('grade','B+', $event)">B+</button>
            <button class="filter-option vintage" :class="{ active: grade.includes('B')}"  @click="selectFilter('grade','B', $event)">B</button>
          </div>
        </transition>

        <div class="filter-title" @click="togglePrice">가격</div>
        <transition name="slide">
          <div v-if="isPriceVisible" class="filter-group">
            <RangeSlider
                v-model="value"
                style="width: 100%"
                exponential
                :min="0"
                :max="3000000"
                >
                <template #suffix>원</template>
            </RangeSlider>
          </div>
        </transition>
        <button class="reset-button" @click="resetFilter">초기화</button>
        <button class="apply-button" @click="applyFilter"><span v-text="prourtCntText"></span> 개의 상품보기</button>
    </div>
</template>

<script>
import 'vue-simple-range-slider/css';
import RangeSlider from 'vue-simple-range-slider';
export default {
    name: 'FilterSelect',
    data() {
      return {
        isCategoryVisible: true,
        isTypeVisible: true,
        isGradeVisible: false,
        isPriceVisible: true,
        category : '',
        type : '',
        grade : [],
        prourtCntText : '',
        value: [0, 3000000],
    }},
    components : {
        RangeSlider
    },
    methods: {
        toggleCategory() {
            this.isCategoryVisible = !this.isCategoryVisible;
        },
        toggleType() {
            this.isTypeVisible = !this.isTypeVisible;
        },
        toggleGrade() {
            if(this.type === 'vintage'){
                this.isGradeVisible = !this.isGradeVisible;
            }
        },
        togglePrice() {
            this.isPriceVisible = !this.isPriceVisible;
        },
        async fetchProductCount(){ // 상품 건수 조회
           
        },
        selectFilter(btnType, btnvalue, event){
            //btnType : category : 카테고리, type : 상품유형, grade : 빈티지등급 
            //btnvalue : 
            if(btnType === 'category'){
              this.category = btnvalue;
            }else if(btnType === 'grade'){
              if(this.grade.includes(btnvalue)){
                this.grade.pop(btnvalue);
              }else{
                this.grade.push(btnvalue);
              }
            }else if(btnType === 'type' && btnvalue === 'vintage'){ 
                this.type = btnvalue;
                this.isGradeVisible = true;  
            }else{
                this.type = btnvalue;
                this.isGradeVisible = false;
                this.grade = [];
            }

            this.fetchProductCount();
        }, 
        applyFilter() {
            ProductListPage.toggleFilterPopup(); // 필터 적용 후 팝업 닫기
        },
        watch(){
          this.fetchProductCount();
        }
    }
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