<template>
  <div class="table-detail-container w-100 mt-3">
    <div class="table-header">
      Register information for supervisor
    </div>
    <table class="table-detail w-100" border="1">
      <tr>
        <th></th>
        <th>Fullname</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Title</th>
      </tr>
      <template v-if="advisor !== undefined">
        <tr>
          <td>Supervisor</td>
          <td>{{ advisor.fullName }}</td>
          <td>{{ advisor.phone }}</td>
          <td>{{ advisor.email }}</td>
          <td>{{ advisor.title }}</td>
        </tr>
      </template>
      <template v-if="subAdvisors.length !== 0">
        <tr v-for="(item, index) in subAdvisors" :key="index">
          <td>{{ item.role }} {{ index + 1 }}</td>
          <td>{{ item.fullName }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.title }}</td>
        </tr>
      </template>
      <template v-if="subAdvisors.length === 0 && advisor === undefined">
        <tr>
          <td colspan="5" class="text-center">No data</td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      advisor: undefined,
      subAdvisors: []
    };
  },
  methods: {
    init(data) {
      this.advisor = data.advisor;
      this.subAdvisors = data.subAdvisors;
    },
    clear() {
      this.advisor = undefined;
      this.subAdvisors = [];
    }
  }
};
</script>

<style scoped>
.table-detail-container .table-header {
  background: #4aabc3;
  color: white;
  font-size: 1.15rem;
  font-weight: 600;
  padding: 6px;
}
table tr th,
table tr td {
  padding: 10px;
}
</style>
