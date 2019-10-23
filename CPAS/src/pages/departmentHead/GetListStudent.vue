<template>
  <b-row>
    <b-col col="12">
      <div class="card card-shadow">
        <div class="card-header custom">
          List student
          <b-button v-b-modal.my-modal>Range point for Students</b-button>
          <b-modal id="my-modal" ref="my-modal" title="Input Advisor">
            <b-form-input list="my-list-id"></b-form-input>
          </b-modal>
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
            <template v-slot:cell(option)="row">
              <b-button variant="info" size="sm">Change</b-button>
            </template>
          </b-table>
          <b-pagination
            v-model="tableOptions.currentPage"
            :total-rows="tableOptions.totalRows"
            :per-page="tableOptions.perPage"
            size="sm"
          ></b-pagination>
          <b-button>Classify Group</b-button>
        </div>
      </div>
    </b-col>
  </b-row>
</template>
<script>
import Multiselect from 'vue-multiselect';
export default {
  components: {
    Multiselect
  },
  data() {
    return {
      value: [],
      optioos: [
        { name: 'vue.js', language: 'javascript' },
        { name: 'node.js', language: 'javascript' },
        { name: 'react.js', language: 'PHP' },
        { name: 'or.js', language: 'Ruby' }
      ],
      fields: [
        {
          key: 'no',
          label: 'No.'
        },
        {
          key: 'code',
          label: 'MSSV'
        },
        {
          key: 'name',
          label: 'Name'
        },
        {
          key: 'industry',
          label: 'Industry'
        },
        {
          key: 'role',
          label: 'Role'
        },
        {
          key: 'group',
          label: 'Group'
        },
        {
          key: 'option',
          label: 'Option'
        }
      ],
      items: [
        {
          no: '1',
          code: 'SE62567',
          name: 'Phạm Hồng Duy',
          industry: 'SE',
          role: 'Leader',
          group: '1'
        },
        {
          no: '2',

          code: 'SE62567',
          name: 'Phạm Hồng Duy',
          industry: 'SE',
          role: '',
          group: '1'
        },
        {
          no: '3',
          code: 'SE62567',
          name: 'Phạm Hồng Duy',
          industry: 'SE',
          role: '',
          group: '1'
        }
      ],
      tableOptions: {
        totalRows: 1,
        currentPage: 1,
        perPage: 10
      }
    };
  },
  watch: {
    items(val) {
      this.tableOptions.totalRows = val.length;
    }
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
