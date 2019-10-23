<template>
  <b-row>
    <div class="detail-container mt-3 pr-3 pl-3">
      <div class="detail-header-container">
        <div class="detail-header">
          {{ header }}
        </div>
        <div class="detail-info-container mt-2">
          <div
            class="mb-2"
            v-for="(itemHeader, headerIndex) in dataHeader"
            :key="`h-${headerIndex}`"
          >
            <div class="detail-sub-header underline">
              {{ itemHeader.subHeader }}
            </div>
            <div class="detail-sub-container">
              <div
                class="detail-main-item"
                v-for="(item, index) in itemHeader.data"
                :key="index"
              >
                <div class="detail-sub-label">{{ item.label }}:</div>
                <div class="detail-sub-info">
                  {{ item.text }}
                </div>
              </div>
            </div>
          </div>
          <template v-if="dataHtml !== ''">
            <div
              class="html-text-container mb-2"
              v-for="(htmlText, htmlIndex) in dataHtml"
              :key="`html-${htmlIndex}`"
            >
              <div v-if="htmlText.key === 'theoryHtml'" class="underline">
                <strong>{{ dataHtmlHeader }}</strong>
              </div>
              <div v-html="htmlText.body" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </b-row>
</template>

<script>
import TopicDetailChildItem from './TopicDetailChildItem';
export default {
  components: {
    topicDetailChildItem: TopicDetailChildItem
  },
  data() {
    return {
      originData: undefined,
      header: '',
      dataHeader: [],
      dataHtml: [],
      dataHtmlHeader: ''
    };
  },
  methods: {
    init(data, header, title, htmlDataKeyName) {
      this.header = header;
      this.originData = data;
      if (!htmlDataKeyName.includes('otherCommentsHtml')) {
        this.convertCapstoneProjectName(title);
      }
      this.getHtmlDataByKeyName(htmlDataKeyName);
    },
    // Convert capstone project name
    convertCapstoneProjectName(title) {
      const result = {};
      result['subHeader'] = title;
      result['data'] = [
        {
          label: 'Vietnamese',
          text: this.originData.name_Vi
        },
        {
          label: 'English',
          text: this.originData.name_En
        },
        {
          label: 'Abbreviation',
          text: this.originData.shortName
        }
      ];
      // this.convertSubData();
      this.dataHeader.push(result);
    },
    // Get html data by key name
    getHtmlDataByKeyName(keyName) {
      const result = [];
      if (keyName.includes('theoryHtml')) {
        this.dataHtmlHeader = 'Main proposal content';
      }
      keyName.forEach(item => {
        const tmp = { body: this.originData[item], key: item };
        result.push(tmp);
      });
      this.dataHtml = result;
    }
  }
};
</script>

<style scoped>
.detail-container > .detail-header-container > .detail-header {
  font-weight: 600;
  font-size: 1.25rem;
  color: #f7931d;
  display: inline-block;
  padding-left: 10px;
  border-left: 4px solid;
  margin-bottom: 10px;
}
.detail-container > .detail-header-container > .detail-info-container {
  border-left: 4px solid #4aabc3;
  padding-left: 30px;
  font-size: 1.1rem;
  font-weight: 600;
}
.detail-container .detail-main-item {
  font-weight: 400;
  font-size: 1rem;
}
.detail-container .detail-main-item > div {
  display: inline-block;
}
.detail-container .detail-main-item .detail-sub-label {
  text-decoration: underline;
}
.detail-container .html-text-container {
  font-weight: 400;
  text-decoration: none;
}
</style>
