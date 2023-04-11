// src/composables/useJsonProcessor.js
import useLuxonDateFormatter from '@/composables/useLuxonDateFormatter';
import numeral from 'numeral'

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const { formatDateTime } = useLuxonDateFormatter();

// const Roundnumber = (numero) => Math.round((numero + Number.EPSILON) * 100) / 100
const Roundnumber = (numero) => +numeral(numero).format('0.00')
const calculoImpto = (value) => Roundnumber((+value * 12) / 112)

export default function useJsonProcessor() {

  function extractColumns(sheet) {
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    console.log('json extract sheet')
    console.log(json)
    const headers = {
      fechaEmision: json[0][0], // Asume que "Fecha de emisión" está en la columna 0 (A)
      tipoDTE: json[0][2], // Asume que "Tipo DTE" está en la columna 2 (C)
      serie: json[0][3], // Asume que "Serie" está en la columna 3 (D)
      numeroDTE: json[0][4], // Asume que "Número del DTE" está en la columna 4 (E)
      montoGranTotal: json[0][14], // Asume que "Monto (Gran Total)" está en la columna 14 (O)
    };
    
    const data = json.slice(1).map(row => ({ // Excluye la primera fila y mapea las filas restantes
      fechaEmision: formatDateTime(row[0]), // Formatea la "Fecha de emisión" usando Luxon
      tipoDTE: 'DTE',
      serie: row[3],
      numeroDTE: row[4],
      montoGranTotal: row[14],
      impuestoFiscal: +calculoImpto(row[14])
    }));

    return {
      headers, // Retorna los encabezados
      data, // Retorna los datos
    };
  }

  function generateDailySummary(jsonData) {
    const dailySummary = jsonData.reduce((summary, row) => {
      const date = row.fechaEmision.split(' ')[0]; // Obtiene la fecha sin la hora
      
      const elementRow = `${row.numeroDTE}`

      if (!summary[date]) {
        summary[date] = {
          date,
          total: 0,
          invoiceCount: 0,
          exento: '',
          impuesto: 0,
          serie: row.serie,
          primeraFactura: elementRow,
          ultimaFactura: elementRow,
          tipoDTE: row.tipoDTE
        };
      }

      summary[date].total += +row.montoGranTotal;
      summary[date].invoiceCount += 1;
      summary[date].impuesto += Roundnumber(calculoImpto(row.montoGranTotal))
      summary[date].ultimaFactura = elementRow

      return summary;
    }, {});

    // Convierte el objeto dailySummary en un arreglo
    return Object.values(dailySummary).map(e => ({ ...e, impuesto: Roundnumber(e.impuesto) }));
  }

  function convertJsonToXLS(jsonData, fileName = 'output.xlsx', headers = []) {
    const worksheet = XLSX.utils.json_to_sheet(jsonData, { header: headers });
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const xlsData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([xlsData], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
    // return new Blob([xlsData], { type: 'application/octet-stream' });
  }


  return {
    extractColumns,
    generateDailySummary,
    convertJsonToXLS,
    // Agrega aquí otras funciones de procesamiento de JSON que necesites
  };
}
