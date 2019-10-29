<template>
  <div class="sidebar-container">
    <div class="logo-container">
      <img :src="logoImg" class="w-100" height="56px" />
    </div>
    <div v-for="(item, index) in displayHeader" :key="index">
      <div class="item-header">{{ item.header }}</div>
      <div class="item-body w-100">
        <div v-for="(bodyItem, bodyIndex) in item.body" :key="bodyIndex">
          <div class="item" :class="bodyItem.isActive ? 'active' : ''">
            <router-link :to="bodyItem.url">{{ bodyItem.name }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UrlConstant from '../constant/common-url';
export default {
  data() {
    return {
      logoImg: require('../../assets/logo.jpg'),
      currentPath: '',
      sidebarData: [
        {
          header: 'Advisor',
          role: 2,
          subRole: [3, 4, 5],
          body: [
            {
              name: 'Get Topic',
              url: UrlConstant.page.advisor.GET_TOPIC,
              isActive: false
            },
            {
              name: 'Topic Management',
              url: UrlConstant.page.advisor.TOPIC_MNG,
              isActive: false
            },
            {
              name: 'Search Topic',
              url: UrlConstant.page.advisor.SEARCH_TOPIC,
              isActive: false
            }
          ]
        },
        {
          header: 'Committee',
          role: 3,
          subRole: [5],
          body: [
            {
              name: 'List Approval Topic',
              url: UrlConstant.page.committe.CM_GETLIST_TOPIC,
              isActive: false
            }
          ]
        },
        {
          header: 'Training Staff',
          role: 1,
          subRole: [],
          body: [
            {
              name: 'Listing Topic',
              url: UrlConstant.page.trainningStaff.TS_PUBLISHED_TOPIC,
              isActive: false
            },
            // {
            //   name: 'List Student',
            //   url: UrlConstant.page.trainningStaff.TS_STUDENT_MNG,
            //   isActive: false
            // },
            {
              name: 'Import Student',
              url: UrlConstant.page.trainningStaff.TS_IMPORT_STUDENT,
              isActive: false
            }
            // {
            //   name: 'Group Student',
            //   url: UrlConstant.page.trainningStaff.TS_GET_GROUP,
            //   isActive: false
            // }
          ]
        },
        {
          header: 'Student',
          role: 0,
          subRole: [],
          body: [
            {
              name: 'Get Public Topic',
              url: UrlConstant.page.student.ST_GET_PUBLICTOPIC,
              isActive: false
            }
          ]
        },
        {
          header: 'Department Head',
          role: 4,
          subRole: [5],
          body: [
            {
              name: 'List Student',
              url: UrlConstant.page.departmentHead.DH_GET_STUDENT,
              isActive: false
            },
            // {
            //   name: 'List Student',
            //   url: UrlConstant.page.departmentHead.DH_GET_STUDENT,
            //   isActive: false
            // },
            // {
            //   name: 'List Topic',
            //   url: UrlConstant.page.departmentHead.DH_GET_TOPIC,
            //   isActive: false
            // },
            {
              name: 'Send Topic',
              url: UrlConstant.page.departmentHead.DH_APPROVED_TOPIC,
              isActive: false
            },
            {
              name: 'Review Topic',
              url: UrlConstant.page.departmentHead.DH_MNG_TOPIC,
              isActive: false
            }
          ]
        }
      ],
      displayHeader: []
    };
  },
  computed: {
    ...mapGetters({
      decodeToken: 'decodeToken'
    })
  },
  watch: {
    decodeToken() {
      this.init();
    },
    $route(to, from) {
      // react to route changes...
      this.currentPath = to.path;
      this.calculateActiveHeader();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    // Init header for first load
    init() {
      this.currentPath = this.$route.path;
      this.calculateDisplayHeader();
      this.calculateActiveHeader();
    },
    calculateDisplayHeader() {
      this.displayHeader = this.sidebarData.filter(
        item =>
          item.role === parseInt(this.decodeToken.role) ||
          item.subRole.includes(parseInt(this.decodeToken.role))
      );
    },
    // Calculate current active header
    calculateActiveHeader() {
      this.sidebarData.forEach(mainItem => {
        mainItem.body.forEach(item => {
          if (item.url === this.currentPath) {
            item.isActive = true;
          } else {
            item.isActive = false;
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.sidebar-container {
  position: fixed;
  width: 15%;
}
.sidebar-container .item-header {
  text-transform: uppercase;
  font-size: 0.85455rem;
  margin: 0.75rem 0;
  font-weight: 700;
  color: #20897b;
  white-space: nowrap;
  position: relative;
}
.sidebar-container .item-body {
  content: '';
  opacity: 1;
  width: 3px;
  padding-left: 1rem;
  border-left: 3px solid #c0ddef;
}
.sidebar-container .item-body .item {
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
}
.sidebar-container .item-body .item:hover {
  cursor: pointer;
}
.sidebar-container .item-body .item.active {
  background: #e0f3ff;
  color: #3f6ad8;
  font-weight: 600;
  border-radius: 4px;
}
.sidebar-container .item-body .item:hover {
  background: #e0f3ff;
  border-radius: 4px;
}
.sidebar-container .item-body .item:hover > a {
  color: #3f6ad8;
}
.sidebar-container .item-body .item > a {
  color: black;
  text-decoration: none;
}
.sidebar-container .item-body .item.active > a {
  color: #3f6ad8;
}
</style>
