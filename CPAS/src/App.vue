<template>
  <div id="app">
    <loading />
    <div id="app-container">
      <header-custom />
      <notifications group="notification" position="top right" />
      <b-row class="p-0 m-0">
        <b-col cols="2" id="app-sidebar-root">
          <sidebar-custom id="app-sidebar-container" />
        </b-col>
        <b-col cols="10" class="p-0 m-0">
          <router-view id="app-body-container" class="mb-3" />
          <b-row class="p-0 m-0">
            <b-col cols="12" class="p-0 m-0">
              <footer-custom id="app-footer-container" />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Header from './common/components/Header';
import Sidebar from './common/components/Sidebar';
import Footer from './common/components/Footer';
import Loading from './common/components/Loading';
export default {
  components: {
    headerCustom: Header,
    sidebarCustom: Sidebar,
    footerCustom: Footer,
    loading: Loading
  }
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #eef1f6;
}
#app-body-container {
  padding-top: 57px;
  min-height: calc(100vh - 72px);
}
#app-sidebar-root {
  min-height: 100vh;
  background: #fff;
  z-index: 11;
}
#app-footer-container {
  background: #fafbfc;
}
</style>
