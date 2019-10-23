<template>
  <div class="messages-container">
    <div class="content">
      <div class="header">Channel</div>
      <div>Content</div>
    </div>
    <message-card></message-card>
  </div>
</template>

<script>
import MessageCard from './MessageCard'
import { firebaseObj } from '../../../config/firebaseConfig'; 
export default {
    data() {
        return {
            messagesRef: firebaseObj.database().ref('message')
        }
    },
    components: {
        messageCard : MessageCard
    },
    mounted() {

    }
};
</script>

<style></style>
