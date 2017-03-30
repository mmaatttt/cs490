<template>
  <section>
    <el-table :data="balanceSheet" highlight-current-row v-loading="dataLoading" style="width: 100%;" :row-class-name="tableRowClassName">
      <el-table-column v-for="column in columns" :prop="column" :label="column" :key="column">
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        dataLoading: false,
        balanceSheet: [
          {
            'label': 'Current assets',
            '2012': '',
            '2011': '',
            '2010': ''
          },
          {
            'label': 'Cash and cash equivalents',
            '2012': '6,994',
            '2011': '7,197',
            '2010': '6,891'
          },
          {
            'label': 'Accounts receivable',
            '2012': '13,083',
            '2011': '12,981',
            '2010': '12,872'
          },
          {
            'label': 'Inventories',
            '2012': '6,315',
            '2011': '5,931',
            '2010': '5,843'
          },
          {
            'label': 'Total current assets',
            '2012': '26,392',
            '2011': '26,109',
            '2010': '25,606'
          },
          {
            'label': '',
            '2012': '',
            '2011': '',
            '2010': ''
          },
          {
            'label': 'Property plant, and equipment',
            '2012': '36,920',
            '2011': '34,515',
            '2010': '32,002'
          },
          {
            'label': 'Other assets',
            '2012': '1,765',
            '2011': '1,903',
            '2010': '1,834'
          },
          {
            'label': 'Total assets',
            '2012': '65,077',
            '2011': '62,527',
            '2010': '59,442'
          },
          {
            'label': '',
            '2012': '',
            '2011': '',
            '2010': ''
          },
          {
            'label': 'Current liabilities',
            '2012': '',
            '2011': '',
            '2010': ''
          },
          {
            'label': 'Accounts payable',
            '2012': '8,943',
            '2011': '8,694',
            '2010': '7,592'
          },
          {
            'label': 'Accrued expenses and other liabilities',
            '2012': '10,877',
            '2011': '9,382',
            '2010': '8,654'
          },
          {
            'label': 'Total current liabilities',
            '2012': '19,820',
            '2011': '18,076',
            '2010': '16,246'
          },
          {
            'label': '',
            '2012': '',
            '2011': '',
            '2010': ''
          },
          {
            'label': 'Long-term debt',
            '2012': '9,772',
            '2011': '9,338',
            '2010': '8,890'
          },
          {
            'label': 'Total liabilities',
            '2012': '29,592',
            '2011': '27,414',
            '2010': '25,136'
          },
          {
            'label': '',
            '2012': '',
            '2011': '',
            '2010': ''
          },
          {
            'label': 'Shareholders equity',
            '2012': '35,485',
            '2011': '35,113',
            '2010': '34,306'
          },
          {
            'label': 'Total liabilities + shareholders equity',
            '2012': '65,077',
            '2011': '62,527',
            '2010': '59,442'
          }
        ]
      }
    },
    computed: {
      columns: function () {
        return Object.keys(this.balanceSheet[0]).reverse()
      }
    },
    methods: {
      tableRowClassName (row, index) {
        if (row.label.includes('Total')) {
          return 'row-total'
        }
        return ''
      }
    }
  }

</script>

<style lang="scss">
  .row-total {
    td:first-child {
      font-weight: bold;
    }
  }
</style>
