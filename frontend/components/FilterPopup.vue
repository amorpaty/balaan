<template>
  <div v-if="this.isFilterPopupVisible " class="filter-popup-overlay">
    <div class="filter-popup">
      <div class="filter-popup-header">
        <header>
            <h2 class="filter-title">필터</h2>
            <button @click="closeFilterPopup" class="close-button">✖</button>
        </header>
      </div>
      <!--Filter Select -->
      <Select @sendData="sendData" v-bind:filterData="filterData" v-bind:filterType="filterType"></Select>
    </div>
  </div>
</template>

<script>
import '../public/css/filterPopup.css'
import Select from './Select.vue';

export default {
  name: 'FilterPopup',
  props: ["isFilterPopupVisible", "filterData", "filterType"],
  components : {
    Select,
  },
  data() {
    return {
  }},
  components : {
    Select
  },
  methods: {
    sendData(filterData){
      this.$emit('close-popup', filterData)
    },
    closeFilterPopup() { //팝업 닫기
      this.$emit('close-popup');
    },
  },
};
</script>

