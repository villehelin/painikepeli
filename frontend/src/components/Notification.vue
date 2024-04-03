<template>
    <div v-if="notification.message" :style="setBackground">
      {{ notification.message }}
    </div>
    <!-- <div v-else>No new notifications</div> -->
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from '../store/store';
  
  export default {
    setup() {
      const store = useStore();
  
      const notification = computed(() => store);
  
      const setBackground = computed(() => {
        const color = store.color;
        return { 
          backgroundColor: color,
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '9999',
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          textAlign: 'center'
        };
      });
  
      return {
        notification,
        setBackground
      };
    }
  };
  </script>
  