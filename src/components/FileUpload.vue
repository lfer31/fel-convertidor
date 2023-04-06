<template>
  <div class="file-upload">
    <div class="file has-name is-boxed">
      <label class="file-label">
        <input class="file-input" type="file" name="uploadedFile" accept=".xls" @change="onFileChange" />
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">Elige un archivo…</span>
        </span>
        <span class="file-name" v-if="fileName">{{ fileName }}</span>
      </label>
    </div>
    <button class="button is-primary mt-2" @click="uploadFile" :disabled="!file">
      Subir archivo
    </button>
    <p class="help is-danger" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import JsonTable from '@/components/JsonTable.vue'
import useFileProcessor from '@/composables/useFileProcessor';

export default {
  name: 'FileUpload',
  components: {
    JsonTable
  },
  setup() {
    const file = ref(null);
    const fileName = ref('');
    const error = ref('');

    const { processing, processFile } = useFileProcessor();

    function onFileChange(event) {
      const uploadedFile = event.target.files[0];
      if (uploadedFile && uploadedFile.name.endsWith('.xls')) {
        file.value = uploadedFile;
        fileName.value = file.value ? file.value.name : '';
        error.value = '';
      } else {
        error.value = 'Por favor, sube un archivo con extensión .xls';
      }
    }

    function uploadFile() {
      if (!file.value) return;

      processFile(file.value);
    }

    return {
      file,
      fileName,
      error,
      onFileChange,
      uploadFile,
      processing,
      uploadFile
    };
  },
};
</script>
