<!-- src/components/JsonTable.vue -->
<template>
  <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="(header, colIndex) in headers" :key="colIndex">
          {{
            totalColumns.includes(header)
              ? formato(row[header])
              : row[header]
          }}
        </td>
      </tr>
    </tbody>
    <tfoot v-if="totalColumns.length > 0">
      <tr>
        <td v-for="(header, colIndex) in headers" :key="colIndex">
          <template v-if="totalColumns.includes(header)">{{ formato(getColumnTotal(header)) }}</template>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import numeral from 'numeral'

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [],
    },
    totalColumns: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getColumnTotal(column) {
      return this.data.reduce((total, row) => total + (row[column] || 0), 0);
    },
    formato (value) {
      return numeral(value).format('0,0.00')
    }
  },
};
</script>

<style scoped></style>
