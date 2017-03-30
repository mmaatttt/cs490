<template>
  <section>
    <el-table :data="incomeStatement" highlight-current-row v-loading="dataLoading" style="width: 100%;" :row-class-name="tableRowClassName">
      <el-table-column v-for="column in columns" :prop="column" :label="column" :key="column">
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        dataLoading: false
      }
    },
    computed: {
      ...mapState([
        'entries'
      ]),
      incomeStatement: function () {
        var bs = [
          {
            'label': 'Revenue',
            '2017': ''
          },
          {
            'label': 'Net sales',
            '2017': 60144
          },
          {
            'label': 'Cost of goods sold',
            '2017': 45835
          },
          {
            'label': 'Gross profit/(loss)',
            '2017': 0
          },
          {
            'label': 'Operating expenses',
            '2017': ''
          },
          {
            'label': 'Sales and marketing',
            '2017': 4733
          },
          {
            'label': 'Engineering and product development',
            '2017': 3141
          },
          {
            'label': 'General and administrative',
            '2017': 1913
          },
          {
            'label': 'Total operating expenses',
            '2017': 0
          },
          {
            'label': 'Operating income/loss',
            '2017': 0
          },
          {
            'label': 'Other income/expense',
            '2017': ''
          },
          {
            'label': 'Interest income/expense',
            '2017': 1747
          },
          {
            'label': 'Other income/(expense)',
            '2017': -6254
          },
          {
            'label': 'Income before provision for income taxes',
            '2017': 0
          },
          {
            'label': 'Income taxes',
            '2017': 1459
          },
          {
            'label': 'Net income/(loss)',
            '2017': 0
          }
        ]

        bs[1]['2017'] += Math.round(this.entries.reduce((sum, entry) => sum + (entry.subledgerId === 6 ? entry.amount / 1000 : 0), 0)) // Net sales

        bs[7]['2017'] += Math.round(this.entries.reduce((sum, entry) => sum + (entry.subledgerId === 1 || entry.subledgerId === 7 ? entry.amount / 1000 : 0), 0)) // General and administrative

        bs[14]['2017'] += Math.round(this.entries.reduce((sum, entry) => sum + (entry.subledgerId === 9 ? entry.amount / 1000 : 0), 0)) // Income taxes

        bs[3]['2017'] = bs[1]['2017'] - bs[2]['2017'] // Gross profit/(loss)
        bs[8]['2017'] = bs[5]['2017'] + bs[6]['2017'] + bs[7]['2017'] // Total operating expenses
        bs[9]['2017'] = bs[3]['2017'] - bs[8]['2017'] // Operating income/loss
        bs[13]['2017'] = bs[9]['2017'] + bs[11]['2017'] + bs[12]['2017'] // Income before provision for income taxes
        bs[15]['2017'] = bs[13]['2017'] - bs[14]['2017'] // Net income/(loss)

        return bs
      },
      columns: function () {
        return Object.keys(this.incomeStatement[0]).reverse()
      }
    },
    methods: {
      tableRowClassName (row, index) {
        if (row['2017'] === '') {
          return 'row-total'
        }
        return ''
      }
    },
    mounted () {
      this.$store.dispatch('loadEntries')
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
