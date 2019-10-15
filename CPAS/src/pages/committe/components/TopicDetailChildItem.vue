<template>
  <div>
    <div
      class="detail-child-item"
      v-for="(item, index) in childData"
      :key="index"
    >
      <div class="detail-header-container">
        <div class="detail-header-line" />
        <div class="detail-header">{{ item.header }}</div>
        <div class="detail-body-container">
          <ul v-for="(childItem, childIndex) in item.data" :key="childIndex">
            <li>
              <div class="detail-body-item">
                {{ childItem.main }}
              </div>
              <template v-if="childItem.sub">
                <ul class="detail-sub-body-item">
                  <li
                    v-for="(subItem, subIndex) in childItem.sub"
                    :key="subIndex"
                  >
                    {{ subItem }}
                  </li>
                </ul>
              </template>
            </li>
          </ul>
        </div>
        <div class="detail-header-line-end" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  created() {
    console.log(this.data);
  },
  data() {
    return {
      childData: [
        {
          header: 'Context',
          data: [
            {
              main:
                'Babysitter has a high demand in busy day, especially, events andholiday, or some busy day in weeks'
            },
            {
              main: 'How confidence is ensured?'
            },
            {
              main: 'Reference: https://bsit.com/en-FR/parent'
            }
          ]
        },
        {
          header: 'Building the system provides following services',
          data: [
            {
              main:
                'The application is built in Vietnam environment, especially, HCM City'
            },
            {
              main:
                'Users can search babysitter, then the application suggests following circle of family members or friends, nearly next door, knowledge, skills certificates, ...'
            },
            {
              main:
                'Make API that can provide useful services to many applications'
            },
            {
              main: 'Make scheduling before event, holiday taking place'
            }
          ]
        },
        {
          header: 'Simulator',
          data: [
            {
              main:
                'Make the simulator with application more than 02 persons, 02 babysitter with immediately schedule and available schedule'
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped>
ul {
  margin-bottom: 0;
}
.detail-child-item {
  margin-top: 1rem;
}
.detail-child-item .detail-header-container {
  border-left: 1px dashed blue;
  position: relative;
}
.detail-child-item .detail-header-container .detail-header {
  padding-left: 10px;
  display: inline-block;
}
.detail-child-item .detail-header-container .detail-header-line {
  height: 1px;
  width: 10px;
  background: blue;
  display: inline-block;
  position: absolute;
  top: 0;
}
.detail-child-item .detail-header-container .detail-header-line-end {
  height: 1px;
  width: 10px;
  background: blue;
  display: inline-block;
  position: absolute;
  bottom: -1px;
}
.detail-child-item .detail-body-item {
  font-weight: 400;
  font-size: 1rem;
  padding-left: 15px;
}
.detail-child-item .detail-sub-body-item {
  font-weight: 400;
}
.detail-child-item .detail-sub-body-item {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}
.detail-child-item .detail-sub-body-item li {
  padding-left: 2em;
  text-indent: -1em;
}
.detail-child-item .detail-sub-body-item li:before {
  content: '+';
  padding-right: 5px;
}
</style>
