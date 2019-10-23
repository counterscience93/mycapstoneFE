<template>
  <b-row class="m-0">
    <b-col cols="12 p-0 m-0">
      <div class="page-title-container">
        <b-button
          variant="primary"
          size="sm"
          class="float-right"
          @click="redirectToSetDurationPage()"
        >
          <font-awesome-icon icon="plus" class="mr-2" />Create</b-button
        >
      </div>
      <div class="p-3">
        <div class="card card-shadow">
          <div class="card-header custom">Group Management Table</div>
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
              <template v-slot:cell(action)="row">
                <template
                  v-if="
                    row.item.status === 'done' || row.item.status === 'taking'
                  "
                >
                  <b-button variant="info" size="sm">Manage</b-button>
                </template>
                <template
                  v-else-if="
                    row.item.status === 'draft' ||
                      row.item.status === 'rejected'
                  "
                >
                  <b-button
                    variant="primary"
                    size="sm"
                    @click="redirectToCreatePage(row.item.data)"
                  >
                    <font-awesome-icon icon="pen" />
                  </b-button>
                </template>
                <template v-if="row.item.status !== 'draft'">
                  <b-button variant="outline-info" size="sm">
                    <font-awesome-icon icon="info" />
                  </b-button>
                </template>
              </template>
            </b-table>
            <b-pagination
              v-model="tableOptions.currentPage"
              :total-rows="tableOptions.totalRows"
              :per-page="tableOptions.perPage"
              size="sm"
            ></b-pagination>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>
<script>
// import UrlConstant from '../../common/constant/common-url';
// import CommonUtil from '../../common/utils/common-util';
// import { GroupService } from '../../services/service-provider';
// import groupService from '../../services/group-service';

export default {
  data() {
    return {
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'member', label: 'Member' },
        { key: 'code', label: 'Code' },
        { key: 'role', label: 'Role' },
        { key: 'note', label: 'Note' }
      ],
      items: [
        {
          name: 'Phạm Hồng Duy',
          code: 'SE62567',
          role: 'Member'
        },
        {
          name: 'Phạm Hồng Duy',
          code: 'SE62567',
          role: ''
        },
        {
          name: 'Phạm Hồng Duy',
          code: 'SE62567',
          role: ''
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
    // Set the initial number of items
    this.tableOptions.totalRows = this.items.length;
    // this.getGroupData();
  },
  methods: {
    // Trigger pagination to update the number of buttons/pages due to filtering
    onFiltered(filteredItems) {
      this.tableOptions.totalRows = filteredItems.length;
      this.tableOptions.currentPage = 1;
    }
    // Redirect to Create topic page
    // redirectToSetDurationPage() {
    //   this.$router.push({
    //     path: UrlConstant.page.advisor.CREATE_TOPIC
    //   });
    // },
    // Get topic data
    // getGroupData() {
    //   CommonUtil.addLoading();
    //   groupService.getGroup(
    //     result => {
    //       CommonUtil.removeLoading();
    //       if (result && result.length > 0) {
    //         result.forEach(item => {
    //           this.items.push({
    //             member: 'Pham Hong Duy',
    //             code: 'se62567',
    //             role: 'member'
    //           });
    //         });
    //       }
    //     },
    //     () => {
    //       CommonUtil.removeLoading();
    //     }
    //   );
    // }
  }
};
</script>
<style scoped>
.status-item {
  width: 80px;
}
</style>
