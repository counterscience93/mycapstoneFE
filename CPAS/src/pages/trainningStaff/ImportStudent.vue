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
            Training Staff can import list students.
          </div>
        </div>
      </div>
      <div class="p-3">
        <div class="card card-shadow">
          <div class="card-header custom">
            <!-- <div>
              <label for="input-title">Select semester:</label>
              <b-form-select
                id="input-3"
                v-model="formData.semesterId"
                :options="optionsData.semester"
                class="mb-3"
                required
              />
            </div> -->
            <div>
              <label for="input-title">Select file:</label>
              <input type="file" id="my_file_input" @change="handle" />
              <b-button variant="success" @click="submitForm">Upload</b-button>
            </div>
          </div>
          <div class="card-body">
            <b-table
              hover
              :items="listStudent"
              :fields="fields"
              :current-page="tableOptions.currentPage"
              :per-page="tableOptions.perPage"
              @filtered="onFiltered"
            >
              <!-- action column -->
              <template v-slot:cell(action)="row">
                <template>
                  <b-button variant="primary" size="sm">
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
import XLSX from 'xlsx';
import {
  // SemesterService,
  StudentService,
  ProgramService
} from '../../services/service-provider';
import CommonUtil from '../../common/utils/common-util';
import CommonConstant from '../../common/constant/common-constant';

export default {
  data() {
    return {
      fields: [
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Student' },
        { key: 'program', label: 'Program' },
        { key: 'action', label: 'Action' }
      ],
      tableOptions: {
        totalRows: 1,
        currentPage: 1,
        perPage: 10
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
    this.getProgram();
    this.tableOptions.totalRows = this.listStudent.length;
    this.getStudents();
  },
  methods: {
    // trigger pagnination to update the number of pages
    onFiltered(filteredItems) {
      this.tableOptions.totalRows = filteredItems.length;
      this.tableOptions.currentPage = 1;
    },
    // import student
    submitForm() {
      CommonUtil.addLoading();
      const convertedData = this.convertData();
      console.log(this.program);
      for (let i = 0; i < convertedData.length; i++) {
        for (let j = 0; j < this.program.length; j++) {
          if (convertedData[i].programId === this.program[j].shortName) {
            convertedData[i].programId = this.program[j].id;
          }
        }
      }
      console.log(convertedData);
      StudentService.createStudent(
        convertedData,
        result => {
          CommonUtil.showNotification(
            'Success',
            'Import student successfull!',
            CommonConstant.NOTI_TYPE.SUCCESS
          );
          CommonUtil.removeLoading();
          this.getStudents();
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
    convertData() {
      const tmp = JSON.parse(JSON.stringify(this.formData));
      const student = tmp.students.map(item => ({
        fullName: item['Họ tên'],
        code: item['MSSV'],
        programId: item['Khóa ngành'].substring(0, 2)
      }));
      return student;
    },
    // get student
    getStudents() {
      CommonUtil.addLoading();
      StudentService.getStudent(
        result => {
          CommonUtil.removeLoading();
          result.forEach(item => {
            this.listStudent.push({
              code: item.code,
              name: item.fullName,
              program: item.programId
            });
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
    // Get program
    getProgram() {
      CommonUtil.addLoading();
      ProgramService.getProgram(
        result => {
          CommonUtil.removeLoading();
          result.forEach(item => {
            if (item.id === 3) {
              item.id = 1;
            }
            this.program.push({
              shortName: item.shortName,
              id: item.id
            });
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
    // import excel/csv file
    handle(e) {
      let oFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        let result = reader.result;
        let data = new Uint8Array(result);
        let arr = [];
        for (let i = 0; i !== data.length; ++i) {
          arr[i] = String.fromCharCode(data[i]);
        }
        let bstr = arr.join('');
        let workbook = XLSX.read(bstr, {
          type: 'binary'
        });
        let firstSheetName = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[firstSheetName];
        let dataJson = XLSX.utils.sheet_to_json(worksheet);
        this.formData.students = dataJson;
      };
      reader.readAsArrayBuffer(oFile);
    }
  }
};
</script>
<style scoped></style>
