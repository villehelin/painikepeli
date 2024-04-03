import { createPinia, defineStore } from 'pinia';

const pinia = createPinia();

export const useStore = defineStore({
    id: 'notification',
    state: () => ({
        message: null,
        color: null
    }),
    actions: {
        setNotification(message, color) {
        this.message = message;
        this.color = color;
        },
        clearNotification() {
        this.message = null;
        this.color = null;
        },
        triggerNotification(message, color) {
        this.setNotification(message, color);

        setTimeout(() => {
            this.clearNotification();
        }, 5000);
        }
    }
});

export default pinia;