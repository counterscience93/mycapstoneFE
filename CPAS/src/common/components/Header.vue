<template>
  <div class="app-header-container">
    <b-row>
      <b-col cols="2">
        <div class="p-3">
          <div class="app-header-logo">CPAS</div>
        </div>
      </b-col>
      <b-col cols="10">
        <div class="app-header-content h-100">
          <b-row class="h-100">
            <b-col cols="6" />
            <b-col cols="6">
              <div class="p-2">
                <div class="d-inline-block float-right p-2">
                  {{ username }}
                </div>
                <div class="d-inline-block float-right user-img-container ml-2">
                  <img :src="userLogo" class="rounded-circle" />
                </div>
                <div class="d-inline-block float-right lang-container pr-2">
                  <div class="lang-img-container">
                    <img :src="langLogo" class="rounded-circle" />
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'Nguyễn Quốc Bảo - K11',
      userLogo:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn4h6I3mMYRMYflFTvRQjSS8_vCTgC677yJaLnD8L0yaEiDH1e',
      langLogo: require('../../assets/american.png')
    };
  }
};
</script>

<style scoped>
.app-header-container {
  z-index: 10;
  position: fixed;
  width: 100%;
  color: white;
  background: #4ba89c;
}
.app-header .header-shadow {
  box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03),
    0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03),
    0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05),
    0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
}
.app-header-content .user-img-container img {
  width: 2.5rem;
  height: 2.5rem;
}
.app-header-content .lang-container {
  border-right: 1px solid #dee2e6;
}
.app-header-content .lang-img-container {
  background: #e8e8eb;
  padding: 0.44rem;
  border-radius: 50%;
}
.app-header-content .lang-img-container img {
  width: 1.7rem;
  height: 1.7rem;
}
</style>
