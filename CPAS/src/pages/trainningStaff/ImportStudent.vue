<template>
  <b-container>
    <b-row>
      <b-col cols="12">
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
          <div class="card-body"></div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import XLSX from 'xlsx';
import {
  // SemesterService,
  StudentService
} from '../../services/service-provider';
import CommonUtil from '../../common/utils/common-util';
export default {
  mounted() {
    // this.getSemester();
  },
  data() {
    return {
      formData: {
        students: []
      },
      optionsData: {
        semester: []
      }
    };
  },
  methods: {
    submitForm() {
      CommonUtil.addLoading();
      const convertedData = this.convertData();
      StudentService.createStudent(
        convertedData,
        result => {
          CommonUtil.removeLoading();
        },
        () => {
          CommonUtil.removeLoading();
        }
      );
    },
    convertData() {
      const tmp = JSON.parse(JSON.stringify(this.formData));
      const student = tmp.students.map(item => ({
        fullname: item['Họ tên'],
        code: item['MSSV'],
        programId: item['Khóa ngành']
      }));
      console.log(student);
      return student;
    },
    // getSemester() {
    //   CommonUtil.addLoading();
    //   SemesterService.getSemester(
    //     result => {
    //       this.optionsData.semester = CommonUtil.convertToSelectBoxData(
    //         result,
    //         'name'
    //       );
    //       if (!CommonUtil.isEmptyArray(result)) {
    //         this.formData.semesterId = result[0].id;
    //       }
    //       CommonUtil.removeLoading();
    //     },
    //     () => {
    //       CommonUtil.removeLoading();
    //     }
    //   );
    // },
    // import excel/csv file
    handle(e) {
      let oFile = e.target.files[0];
      let sFilename = oFile.name;
      console.log('file: ' + sFilename);
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
        console.log(dataJson, {
          raw: true
        });
        this.formData.students = dataJson;
      };
      reader.readAsArrayBuffer(oFile);
    }
  }
};
</script>
<style scoped></style>
