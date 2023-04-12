<script setup>
import NavBar from './components/NavBar.vue'
// import FileUpload from './components/FileUpload.vue'
import FilePod from './components/FilePod.vue'
import JsonTable from './components/JsonTable.vue';

import useFileProcessor from '@/composables/useFileProcessor';

const { dailySummary, convertJsonToXLS, extractedData } = useFileProcessor();

const convertToExcel = ({ data, headers }) => {
  const fileName = 'output.xlsx';
  convertJsonToXLS(data, fileName, headers);
}

// const saveAsExcel = (json) => {
//   const fileName = 'output.xlsx';
//   const headers = ['date', 'tipoDTE', 'primeraFactura', 'ultimaFactura', 'total', 'exento', 'impuesto'];
//   const blob = convertJsonToXLS(json, headers);

//   const link = document.createElement('a');
//   link.href = URL.createObjectURL(blob);
//   link.download = fileName;
//   link.click();
//   URL.revokeObjectURL(link.href);
// }

</script>

<template>
  <div id="app-dev">
    <NavBar />
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <!-- <FileUpload /> -->
            <FilePod />
          </div>
        </div>
        <JsonTable
          :data="extractedData.data" 
          :totalColumns="['montoGranTotal']"
          :headers="extractedData.headers" />
        <div v-if="Object.keys(extractedData).length > 0" class="has-text-centered">
          <button class="button is-primary mt-2" @click="convertToExcel(extractedData)">
            Convertir a Excel
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.file-cta {
  background-color: #4a4a4a;
  border-color: transparent;
  color: #fff;
  transition: all 0.3s;
}

.file-cta:hover {
  background-color: #2c3e50;
  border-color: transparent;
  color: #fff;
}
</style>
