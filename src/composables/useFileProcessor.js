// src/composables/useFileProcessor.js
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import useJsonProcessor from '@/composables/useJsonProcessor';

const dailySummary = ref([]); // Agrega una ref para dailySummary

export default function useFileProcessor() {
  const processing = ref(false);
  const extractedData = ref([]); // Agrega una ref para extractedData
  
  const { extractColumns, generateDailySummary, convertJsonToXLS } = useJsonProcessor();


  function processFile(file) {
    if (!file) return;

    processing.value = true;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      // extraer el nombre
      const firstSheetName = workbook.SheetNames[0];
      console.log('Nombre de la primera hoja:', firstSheetName);

      const firstSheet = workbook.Sheets[firstSheetName];
      extractedData.value = extractColumns(firstSheet);
      console.log('Datos extraídos:', JSON.parse(JSON.stringify(extractedData.value)));

      dailySummary.value = generateDailySummary(extractedData.value.data);
      console.log('Resumen diario:', JSON.parse(JSON.stringify(dailySummary.value)));

      // Aquí puedes agregar el código para procesar el contenido del archivo XLS.
      console.log('Contenido del archivo XLS:', workbook);

      // const fileName = 'output.xlsx';
      // const headers = ['date', 'tipoDTE', 'primeraFactura', 'ultimaFactura','total','exento','impuesto'];
      // convertJsonToXLS(dailySummary, fileName, headers);

      processing.value = false;
    };
    reader.readAsBinaryString(file);
  }

  return {
    processing,
    processFile,
    dailySummary,
    extractedData,
    convertJsonToXLS
  };
}
