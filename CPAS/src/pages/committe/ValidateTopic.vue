<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <div class="card card-shadow">
          <div class="card-header custom">
            <div class="card-body">
              <div>
                <b-checkbox
                  >Các đề tài có khả thi thực hiện trong 4 tháng với 4 sinh viên
                  không?</b-checkbox
                >
                <b-form-input></b-form-input>
              </div>
              <div>
                <b-checkbox>
                  Đề tài phù hợp với khả năng 4 sinh viên theo nghĩa là không
                  quá dễ, không quá khó?
                </b-checkbox>
                <b-form-input></b-form-input>
              </div>
              <div>
                <b-checkbox>
                  Đề tài có cần bổ sung chi tiết nhằm tạo thuận lợi cho sv thực
                  hiện dễ dàng hay đọc hiểu rõ hơn khi chon lựa hay
                  không?</b-checkbox
                >
                <b-form-input placeholder="Enter comment"></b-form-input>
              </div>
              <div>
                <b-form-checkbox
                  >Đề tài có tính ứng dụng thực tế không?</b-form-checkbox
                >
                <b-form-input placeholder="Enter comment"></b-form-input>
              </div>
              <div>
                <b-form-checkbox>
                  Đề tài có khuyến khích sự sáng tạo của sinh viên
                  không?</b-form-checkbox
                >
                <b-form-input placeholder="Enter comment"></b-form-input>
              </div>
              <b-button variant="success">Submit</b-button>
            </div>
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
      comments: [
        {
          criteria1: {
            content: '',
            topicId: '',
            createdDate: '',
            commentTypeId: ''
          }
        },
        {
          criteria2: {
            content: '',
            topicId: '',
            createdDate: '',
            commentTypeId: ''
          }
        },
        {
          criteria3: {
            content: '',
            topicId: '',
            createdDate: '',
            commentTypeId: ''
          }
        },
        {
          criteria4: {
            content: '',
            topicId: '',
            createdDate: '',
            commentTypeId: ''
          }
        },
        {
          criteria5: {
            content: '',
            topicId: '',
            createdDate: '',
            commentTypeId: ''
          }
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
    this.tableOptions.totalRows = this.items.length;
    this.getValidateData();
  },
  methods: {
    onFiltered(filteredItems) {
      this.tableOptions.totalRows = filteredItems.length;
      this.tableOptions.currentPage = 1;
    },
    getValidateData() {}
  }
};
</script>
