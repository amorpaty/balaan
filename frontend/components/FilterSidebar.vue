<template>
  <div class="filter-sidebar">
    <div class="filter-category">
      <h4>카테고리</h4>
      <div v-for="category in categories" :key="category">
        <input type="radio" :id="category" name="category" v-model="selectedCategory" :value="category" />
        <label :for="category">{{ category }}</label>
      </div>
    </div>

    <div class="filter-price">
      <h4>가격</h4>
      <input type="range" v-model="priceRange" min="0" max="3000000" step="10000" />
      <p>{{ priceRange }}원</p>
    </div>

    <button @click="applyFilters">적용하기</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: ["의류", "신발", "가방"],
      selectedCategory: "의류",
      priceRange: 3000000
    };
  },
  methods: {
    applyFilters() {
      this.$emit('filter', { category: this.selectedCategory, price: this.priceRange });
    }
  }
};
</script>

<style scoped>
.filter-sidebar {
  padding: 20px;
  background-color: #f9f9f9;
}

.filter-category,
.filter-price {
  margin-bottom: 20px;
}
</style>
