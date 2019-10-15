<template>
  <div>
    <b-row class="m-0">
      <b-col cols="12" class="mt-2">
        <div class="card card-shadow p-3">
          <div class="search-container">
            <b-form-input
              type="text"
              class="d-inline-block mr-2 search-text "
              v-model="txtSearch"
              placeholder="Input topic name"
            />
            <b-button variant="primary" class="d-inline-block search-btn">
              Search
            </b-button>
          </div>
        </div>
      </b-col>
      <template v-if="isHaveData">
        <b-col cols="12" class="mt-2 search-item-container">
          <div
            class="card card-shadow mb-2"
            v-for="(item, index) in searchResult"
            :key="index"
          >
            <div>
              <div class="search-item-header text-ellipsis pl-3 p-2">
                {{ item.header }}
              </div>
              <div class="search-item-body text-ellopsis pl-3 p-2">
                {{ item.body }}
              </div>
            </div>
          </div>
        </b-col>
        <b-col cols="12" class="mt-2 pagination-container">
          <b-pagination
            v-model="tableOptions.currentPage"
            :total-rows="tableOptions.totalRows"
            :per-page="tableOptions.perPage"
            size="sm"
          ></b-pagination>
        </b-col>
      </template>
      <template v-else>
        <b-col cols="12" class="mt-2">
          <div class="no-data-img-container">
            <img src="../../assets/no-data.jpg" />
          </div>
        </b-col>
      </template>
    </b-row>
  </div>
</template>

<script>
export default {
  watch: {
    // Check when search value have value
    txtSearch(newVal) {
      if (newVal.length > 0) {
        this.isHaveData = true;
      } else {
        this.isHaveData = false;
      }
    }
  },
  data() {
    return {
      isHaveData: false,
      txtSearch: '',
      searchResult: [
        {
          header:
            'Capstone project approval system of FPTU - Kiều Trọng Khánh (15/5/2019)',
          body:
            'Manage a list of project title over years. Support teacher giving capstone project. Support admin managing capstone project approval. Support students enrolling a capstone project.'
        },
        {
          header:
            'Capstone project approval system of FPTU - Kiều Trọng Khánh (15/5/2019)',
          body:
            'Manage a list of project title over years. Support teacher giving capstone project. Support admin managing capstone project approval. Support students enrolling a capstone project.'
        },
        {
          header:
            'Capstone project approval system of FPTU - Kiều Trọng Khánh (15/5/2019)',
          body:
            'Manage a list of project title over years. Support teacher giving capstone project. Support admin managing capstone project approval. Support students enrolling a capstone project.'
        }
      ],
      tableOptions: {
        totalRows: 1,
        currentPage: 1,
        perPage: 10
      }
    };
  },
  methods: {}
};
</script>

<style scoped>
.no-data-img-container img {
  width: 100%;
  height: calc(100vh - 225px);
}
.search-container .search-text {
  width: calc(100% - 120px);
}
.search-container .search-btn {
  position: relative;
  top: -1px;
  width: 100px;
}
.search-item-container .card {
  border-radius: 14px;
}
.search-item-container .search-item-header {
  color: #2319af;
  border-bottom: 1px solid #ececec;
}
.search-item-container .search-item-header:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
