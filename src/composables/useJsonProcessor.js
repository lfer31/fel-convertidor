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
    const headers = [
      'fechaEmision',
      'autorizacion',
      'serie',
      'numeroDTE',
      'establecimiento',
      'receptor',
      'moneda',
      'montoGranTotal',
      'estado'
    ];
    
    const data = json.slice(1).map(row => ({ // Excluye la primera fila y mapea las filas restantes
      fechaEmision: formatDateTime(row[0]).split(' ')[0], // Formatea la "Fecha de emisión" usando Luxon
      autorizacion: row[1],
      serie: row[3],
      numeroDTE: row[4],
      establecimiento: row[9],
      receptor: row[12],
      moneda: row[16],
      montoGranTotal: row[17],
      estado: row[15],
      impuestoFiscal: +calculoImpto(row[17])
    }));

    return {
      headers, // Retorna los encabezados
      data, // Retorna los datos
    };
  }

  function generateDailySummary(jsonData) {
    const dailySummary = jsonData.reduce((summary, row) => {
      const date = row.fechaEmision.split(' ')[0]; // Obtiene la fecha sin la hora
      
      const elementRow = `${row.serie}-${row.numeroDTE}`

      if (!summary[date]) {
        summary[date] = {
          date,
          total: 0,
          invoiceCount: 0,
          exento: '',
          impuesto: 0,
          serie: '',
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
