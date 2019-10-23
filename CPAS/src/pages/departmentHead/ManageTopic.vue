<template>
  <div>
    <b-row class="m-0">
      <b-col cols="12" class="p-0">
        <div class="page-title-container">
          <div class="card card-shadow d-inline-block">
            <font-awesome-icon icon="table" class="page-title-item" />
          </div>
          <div class="d-inline-block pl-2">
            <div class="page-title-description-header">Manage Topic</div>
            <div class="page-title-description-detail">
              Department Head can approve or reject a topic
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="m-0">
      <b-col cols="12" class="mt-2 p-3">
        <div class="card card-shadow">
          <div class="card-header custom">Manage Topic Table</div>
          <div class="card-body">
            <b-table
              hover
              :items="topics"
              :fields="fields"
              :current-page="tableOptions.currentPage"
              :per-page="tableOptions.perPage"
              @filtered="onFiltered"
              class="text-align-left"
            >
              <!-- customize column -->

              <template v-slot:cell(option)="row">
                <b-button
                  size="sm"
                  variant="outline-primary"
                  @click="redirectToViewDetailPage(row.item.id)"
                  >Detail</b-button
                >
              </template>
            </b-table>
            <b-pagination
              v-model="tableOptions.currentPage"
              :total-rows="tableOptions.totalRows"
              :per-page="tableOptions.perPage"
              size="sm"
            />
          </div>
        </div>
        <b-btn size="sm" @click="addChanelFirebase()">Add Chanel</b-btn>
        <b-btn size="sm" @click="sendMessage()">Send Message</b-btn>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import moment from 'moment';
import UrlConstant from '../../common/constant/common-url';
import CommonConstant from '../../common/constant/common-constant';
import CommonUtil from '../../common/utils/common-util';
import { TopicService } from '../../services/service-provider';
import TableSuperVisorDetail from './components/topic-detail/TableSuperVisorDetail';
import TopicDetailDisplayInfo from './components/topic-detail/TopicDetailDisplayInfo';
import { firebaseObj } from '../../config/firebaseConfig';

export default {
  components: {
    tableSuperDetail: TableSuperVisorDetail,
    topicDetailDisplayInfo: TopicDetailDisplayInfo
  },
  data() {
    return {
      topics: [],
      fields: [
        {
          key: 'name_En',
          label: 'Name'
        },
        {
          key: 'advisorName',
          label: 'Advisor'
        },
        {
          key: 'created_date',
          label: 'Created Time'
        },
        {
          key: 'option',
          label: 'Option'
        }
      ],
      tableOptions: {
        totalRows: 1,
        currentPage: 1,
        perPage: 10
      },
      detailData: {
        program: {
          name: ''
        }
      },
      channels: [],
      firstLoad: true,
      channelRef: firebaseObj.database().ref('channels'),
      messageRef: firebaseObj.database().ref('messages'),
      channel: null,
      messages: [],
      listeners: [],
      message: ''
      // selectTopic: null
    };
  },
  watch: {
    topics(val) {
      this.tableOptions.totalRows = val.length;
    }
  },
  created() {
    firebaseObj
      .auth()
      .signInWithEmailAndPassword('leman2@gmail.com', 'abc123')
      .then(user => {
        console.log(user);
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    // Set the initial number of items
    this.tableOptions.totalRows = this.topics.length;
    this.loadTopics();
    this.addListeners();
    this.addMessagesListeners();
  },
  methods: {
    // Trigger pagination to update the number of buttons/pages due to filtering
    onFiltered(filteredItems) {
      this.tableOptions.totalRows = filteredItems.length;
      this.tableOptions.currentPage = 1;
    },
    showDetail(topic) {
      console.log(`TOpic: ${topic.name_En}`);
    },
    loadTopics() {
      CommonUtil.addLoading();
      TopicService.getTopicByDepartmentHeadToReview(
        res => {
          CommonUtil.removeLoading();
          if (res && res.length > 0) {
            res.forEach(item => {
              this.topics.push({
                id: item.id,
                name_En: item.name_En,
                name_Vi: item.name_Vi,
                advisorName: item.advisorName,
                created_date: moment(item.createdDate).format(
                  CommonConstant.DEFAULT_TIME_FORMAT
                ),
                duplicatedTopics: item.duplicatedTopics,
                status: item.status
              });
            });
          }
        },
        () => {
          CommonUtil.removeLoading();
          CommonUtil.showNotification(
            'Error',
            'Server error!',
            CommonConstant.NOTI_TYPE.ERROR
          );
        }
      );
    },
    redirectToViewDetailPage(id) {
      this.$router.push({
        path: UrlConstant.page.departmentHead.DH_TOPIC_DETAIL.replace(':id', id)
      });
    },
    formatTime(topic) {
      return moment(topic).format(CommonConstant.DEFAULT_DATE_FORMAT);
    },
    addCustomDuplicatedTopics() {
      if (this.topics !== []) {
        const topic = this.topics[0];
        topic.duplicatedTopics = [
          {
            id: 5,
            name_En: 'Chess Online Learning System',
            createdDate: 1571199962506,
            advisorName: 'Nguyễn Văn A',
            duplicatedTopics: []
          },
          {
            id: 6,
            name_En:
              'Counseling software support treating diseases on ornamental plants',
            createdDate: 1571200081075,
            advisorName: 'Nguyễn Văn A',
            duplicatedTopics: []
          }
        ];
      }
    },
    addListeners() {
      this.channelRef.on('child_added', snap => {
        this.channels.push(snap.val());
        if (this.firstLoad && this.channels.length > 0) {
          this.channel = this.channels[0];
        }
        this.firstLoad = false;
      });
      // this.channelRef.on('value', snap => {
      //   console.log(snap);
      //   this.channels.push(snap.val());
      //   if (this.firstLoad && this.channels.length > 0) {
      //     this.channel = this.channels[0];
      //   }
      //   this.firstLoad = false;
      // });
    },
    addMessagesListeners() {
      // send messages by chanelID (replace userID later)
      this.messageRef.child('-LrS558Q0WdNWQx52Uv5').on('child_added', snap => {
        console.log('snap: ', snap);
        const message = snap.val();
        console.log('newmessage: ', message);
        message.id = snap.key;
        this.messages.push(message);
        this.$nextTick(() => {});
      });
      this.addToListeners(
        '-LrS558Q0WdNWQx52Uv5', // chanels id
        this.messageRef,
        'child_added'
      );
    },
    addToListeners(id, ref, event) {
      const index = this.listeners.findIndex(
        el => el.id === id && el.ref === ref && el.event === event
      );
      if (index === -1) {
        this.listeners.push({
          id,
          ref,
          event
        });
      }
    },
    addChanelFirebase() {
      // let key = this.channelRef.push().key;
      let newChannel = { id: 4, name: 'departmenthead' };
      this.channelRef
        .child(4)
        .update(newChannel)
        .then(() => {
          console.log('create success chanel: departmenthead');
        })
        .catch(err => {
          console.log(err);
        }); // root/channels/newchannel
    },
    detachListener() {
      this.channelRef.off();
      console.log('offf');
    },
    sendMessage() {
      let newMessage = {
        user: {
          id: '12345',
          name: 'KIEU TRONG KHANH',
          role: 'DEPARTMENTHEAD'
        },
        content: `Waynes aaa`,
        timestamp: firebaseObj.database.ServerValue.TIMESTAMP
      };
      this.messageRef
        .child('1')
        .push()
        .set(newMessage)
        .then(() => {
          console.log('new messages added: ', newMessage);
        })
        .catch(err => {
          console.log(err);
        });
    }
    // sendTopic(topic) {
    //   this.selectTopic = topic;
    // }
  },
  beforeDestroy() {
    this.detachListener();
  }
};
</script>

<style scoped>
.spinner {
  color: #4ba89c;
}
.topic-detail-container {
  width: 100%;
}
.topic-detail-container .header {
  background: #013972;
  font-weight: 600;
  color: white;
}
.topic-detail-container .body .detail-label {
  font-weight: 600;
}
.topic-detail-container .body .group-first-info {
  background: #f3f3f3;
  border-radius: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
