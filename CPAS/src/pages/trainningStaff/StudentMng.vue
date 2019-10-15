<template>
  <b-container>
    <b-row>
      <b-col col="12">
        <div class="card card-shadow">
          <div class="card-header custom">
            List student
            <b-button>ImportStudent</b-button>
          </div>

          <div class="card-body">
            <b-table
              hover
              :items="items"
              :fields="fields"
              :current-page="tableOptions.currentPage"
              :per-page="tableOptions.perPage"
              @filtered="onFiltered"
            >
              <!-- action column -->
              <template>
                <template>
                  <b-button variant="info" size="sm">Manage</b-button>
                  <b-button variant="outline-info" size="sm">Detail</b-button>
                </template>
              </template>
            </b-table>
            <b-pagination
              v-model="tableOptions.currentPage"
              :total-rows="tableOptions.totalRows"
              :per-page="tableOptions.perPage"
              size="sm"
            ></b-pagination>
            <b-button>Submit</b-button>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: 'Name'
        },
        {
          key: 'code',
          label: 'MSSV'
        },
        {
          key: 'industry',
          label: 'Industry'
        }
      ],
      items: [
        {
          name: 'Phạm Hồng Duy',
          code: 'SE62567',
          industry: 'SE'
        },
        {
          name: 'Phạm Hồng Duy',
          code: 'SE62567',
          industry: 'SE'
        },
        {
          name: 'Phạm Hồng Duy',
          code: 'SE62567',
          industry: 'SE'
        }
      ],
      tableOptions: {
        totalRows: 1,
        currentPage: 1,
        perPage: 10
      }
    };
  },
  mounted() {
    // set the initial number of items
    this.tableOptions.totalRows = this.items.length;
  },
  fileChange: function() {},
  methods: {
    // import files excel
    // trigger pagnination to update the number of buttons/pages due to filering
    onFiltered(filteredItems) {
      this.tableOptions.totalRows = filteredItems.length;
      this.tableOptions.currentPage = 1;
    }
  }
};
</script>
<style scoped></style>
