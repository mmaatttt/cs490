<template>
  <section class="chart-container">
    <el-row>
      <el-col :span="8">
        <chart :type="'pie'" :data="pieData" :options="pieOptions"></chart>
      </el-col>
      <el-col :span="16">
        <chart :type="'bar'" :data="pieData" :options="barOptions"></chart>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import Chart from 'vue-bulma-chartjs'
  import { mapState, mapGetters } from 'vuex'

  export default {
    components: {
      Chart
    },
    data () {
      return {
        pieOptions: {
          segmentShowStroke: false
        },
        barOptions: {
          legend: {
            display: false
          }
        },
        backgroundColor: [
          '#5392ff', // Blue40
          '#71cddd', // Aqua20
          '#34bc6e', // Green30
          '#95d13c', // Lime20
          '#fed500', // Yellow10
          '#ffb000', // Gold20
          '#fe8500', // Peach30
          '#e62325', // Red50
          '#ff509e', // Magenta40
          '#7732bb', // Violet60
          '#9b82f3' // Indigo40
        ]
      }
    },

    computed: {
      ...mapState([
        'subledgers'
      ]),
      ...mapGetters({
        entrySumLabels: 'subledgerNames',
        entrySumData: 'summedEntries'
      }),

      pieData () {
        return {
          labels: this.entrySumLabels,
          datasets: [{
            data: this.entrySumData,
            backgroundColor: this.backgroundColor
          }]
        }
      }
    },

    mounted () {
      this.$store.dispatch('loadSubledgers')
      this.$store.dispatch('loadEntries')
    }
  }
</script>

<style scoped>
  .chart-container {
    width: 100%;
    float: left;
  }

  .el-col {
    padding: 30px 20px;
  }
</style>
