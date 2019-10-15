<template>
  <div class="table-detail-container w-100 mt-3">
    <div class="table-header">
      Register information for students
    </div>
    <table class="table-detail w-100" border="1">
      <tr>
        <th></th>
        <th>Fullname</th>
        <th>Student code</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Role in group</th>
      </tr>
      <tr>
        <td>Student 1</td>
        <td>Thảo Nguyên</td>
        <td>NguyenT62312</td>
        <td>0937857344</td>
        <td>NguyenT62312@fpt.edu.vn</td>
        <td>Leader</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {};
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
