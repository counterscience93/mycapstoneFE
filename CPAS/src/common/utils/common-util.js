import Vue from 'vue';
import store from '../../store/store';

export default {
  async requestAxios(promise, callback, errorCallBack) {
    try {
      const response = await promise;
      if (callback) {
        callback(response.data);
      }
    } catch (error) {
      if (errorCallBack) {
        errorCallBack(error);
      }
    }
  },
  // Add loading
  addLoading() {
    store.dispatch('setLoading', true);
  },

  // Convert Text html to text
  convertTextHtmlToText(input) {
    const div = document.createElement('div');
    div.innerHTML = input;
    let content = div.textContent || div.innerText || '';
    content = content.replace(/<\//gi, ' </').replace(/> </gi, '><');
    return content;
  },

  // Convert data reponse to select data
  convertToSelectBoxData(data, keyName) {
    if (!data || data.length === 0) return [];
    const result = [];
    data.forEach(item => {
      result.push({ text: item[keyName], value: item.id });
    });
    return result;
  },

  // Get selected data
  getSelectedData(selected, data, keyName) {
    // Return empty array when selected data is empty
    if (!selected && selected.length === 0) return [];
    // Return empty array when data is empty
    if (!data && data.length === 0) return [];
    const result = [];
    selected.forEach(item => {
      const filterResult = data.filter(
        selectDataItem => selectDataItem[keyName] === item.id
      );
      // In case have filter data
      if (filterResult.length > 0) result.push(filterResult[0]);
    });
    return result;
  },

  // Check array is empty
  isEmptyArray(data) {
    if (!data && data.length === 0) return true;
    return false;
  },

  // Remove loading
  removeLoading() {
    store.dispatch('setLoading', false);
  },

  showNotification(title, text, type) {
    Vue.notify({
      group: 'notification',
      title: title,
      text: text,
      type: type
    });
  }
};
