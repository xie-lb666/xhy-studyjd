<template>
  <div class="toast">{{ message }}</div>
</template>



<script>
import { reactive ,toRefs} from "vue";
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
  },
};
export const useToastEffect = () => {
  const toastData = reactive({
    show: false,
    toastMessage: "",
  });
  const showToast = (mesg) => {
    toastData.show = true;
    toastData.toastMessage = mesg;
    setTimeout(() => {
      toastData.show = false;
      toastData.toastMessage = "";
    }, 2000);
  };
  const {show,toastMessage} = toRefs(toastData);
  return { showToast, show,toastMessage };
};
</script>


<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.35);
  color: #ffffff;
  border-radius: 5px;
}
</style>