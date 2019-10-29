<template>
  <b-row class="m-0">
    <b-col cols="12 p-0 m-0">
      <div class="page-title-container">
        <div class="card card-shadow d-inline-block">
          <font-awesome-icon icon="table" class="page-title-item" />
        </div>
        <div class="d-inline-block pl-2">
          <div class="page-title-description-header">
            Student Management
          </div>
          <div class="page-title-description-detail">
            Department Head can classify group student.
          </div>
        </div>
      </div>
      <div class="p-3">
        <div class="card card-shadow">
          <div class="card-header custom">Student Table</div>
          <div class="card-body">
            <b-table
              hover
              :items="listStudent"
              :fields="fields"
              :current-page="tableOptions.currentPage"
              :per-page="tableOptions.perPage"
              @filtered="onFiltered"
            >
              <!-- leader column -->
              <template v-slot:cell(leader)="row">
                <b-badge pill v-if="row.item.leader === null" variant="success">
                  Leader</b-badge
                ><b-badge pill v-else variant="primary"> Member</b-badge>
              </template>
              <!-- action column -->
              <template v-slot:cell(action)="row">
                <b-button v-b-modal.modal-1 variant="primary" size="sm"
                  >Change</b-button
                >
              </template>
            </b-table>
            <b-modal id="modal-1" title="Change student group" size="lg">
              <b-form-input
                v-model="text"
                placeholder="Enter group student"
                @change="getGroup()"
              ></b-form-input>
            </b-modal>
            <b-pagination
              v-model="tableOptions.currentPage"
              :total-rows="tableOptions.totalRows"
              :per-page="tableOptions.perPage"
              size="sm"
            ></b-pagination>
            <b-button variant="info" size="mm" @click="submitClassifyGroup()"
              >Submit</b-button
            >
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>
<script>
import Multiselect from 'vue-multiselect';
import { DHService } from '../../services/service-provider';
import CommonUtil from '../../common/utils/common-util';
import CommonConstant from '../../common/constant/common-constant';
export default {
  components: {
    Multiselect
  },
  data() {
    return {
      fields: [
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Student' },
        { key: 'weight', label: 'Weight Point' },
        { key: 'leader', label: 'Leader' },
        { key: 'groupId', label: 'Note' },
        { key: 'action', label: 'Action' }
      ],
      tableOptions: {
        totalRows: 1,
        currentPage: 1,
        perPage: 12
      },
      formData: {
        students: []
      },
      program: [],
      listStudent: []
    };
  },
  watch: {
    listStudent(val) {
      this.tableOptions.totalRows = val.length;
    }
  },
  mounted() {
    // set the initial number of items
    this.tableOptions.totalRows = this.listStudent.length;
    this.getStudent();
  },
  methods: {
    // trigger pagnination to update the number of buttons/pages due to filering
    onFiltered(filteredItems) {
      this.tableOptions.totalRows = filteredItems.length;
      this.tableOptions.currentPage = 1;
    },
    // get student
    getStudent() {
      CommonUtil.addLoading();
      DHService.getClassifyGroup(
        result => {
          CommonUtil.removeLoading();
          result.forEach(item => {
            for (var i = 0; i < item.length; i++) {
              this.listStudent.push({
                code: item[i].code,
                name: item[i].fullName,
                weight: item[i].weightPoint,
                leader: item[i].leaderCode
              });
            }
          });
        },
        () => {
          CommonUtil.removeLoading();
          CommonUtil.showNotification(
            'Error',
            'Server error!',
            CommonConstant.NOTI_TYPE.ERROR
          );
        }
      );
    },
    classifyGroup() {},
    submitClassifyGroup() {}
  }
};
</script>
<style scoped></style>
