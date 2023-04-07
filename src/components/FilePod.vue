<!-- src/components/FileUpload.vue -->
<template>
  <div class="file-upload">
    <file-pond ref="pond" name="filepond" label-idle="Arrastra tus archivos aquí o haz clic para seleccionar"
      accepted-file-types="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      @init="initializeFilePond" @removefile="onRemoveFile" :server="filePondServer" />
  </div>
</template>

<script>
import { ref } from 'vue';
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import useFileProcessor from '@/composables/useFileProcessor';

const FilePond = vueFilePond();

export default {
  name: 'FileUpload',
  components: {
    FilePond,
  },
  setup() {
    const pond = ref(null);
    const { processing, processFile, clearData } = useFileProcessor();

    const filePondServer = {
      process: (fieldName, file, metadata, load) => {
        processFile(file);
        load(file.name);
      },
    };

    function initializeFilePond() {
      // No es necesario configurar las opciones aquí
    }

    function onRemoveFile() {
      clearData();
    }

    return {
      pond,
      filePondServer,
      initializeFilePond,
      processing,
      onRemoveFile,
    };
  },
};
</script>

<style scoped>
.file-upload {
  max-width: 500px;
  margin: 0 auto;
}
</style>
