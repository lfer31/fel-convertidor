<script setup>
import NavBar from './components/NavBar.vue'
import FileUpload from './components/FileUpload.vue'
import JsonTable from './components/JsonTable.vue';

import useFileProcessor from '@/composables/useFileProcessor';

const { dailySummary, convertJsonToXLS } = useFileProcessor();

const convertToExcel = (json) => {
  const fileName = 'output.xlsx';
  const headers = ['date', 'tipoDTE', 'primeraFactura', 'ultimaFactura','total','exento','impuesto'];
  convertJsonToXLS(json, fileName, headers);
}

</script>

<template>
  <div id="app-dev">
    <NavBar />
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <FileUpload />
          </div>
        </div>
        <JsonTable v-if="dailySummary.length > 0" 
          :data="dailySummary" 
          :totalColumns="['total','impuesto','invoiceCount']"
          :headers="['date', 'tipoDTE', 'primeraFactura', 'ultimaFactura', 'total', 'exento', 'impuesto','invoiceCount']" />
        <div v-if="dailySummary.length > 0" class="has-text-centered">
          <button class="button is-primary mt-2" @click="convertToExcel(dailySummary)">Convertir a Excel</button>
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
