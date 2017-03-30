<template>
  <section class="payroll">
    <el-row>
      <el-col :span="8">
        <el-button type="success" size="large" @click="processPayroll"><i class="fa fa-plus"></i> Process Payroll</el-button>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import NProgress from 'nprogress'
  import API from '../api'

  export default {
    methods: {
      processPayroll () {
        NProgress.start()

        API.processPayroll().then((res) => {
          console.log(res)
          this.$notify.success({
            title: 'Success',
            message: 'Payroll processed.'
          })
          NProgress.done()
        }).catch(error => {
          console.log(error)
          this.$notify.error({
            title: 'Error',
            message: 'Error processing payroll.'
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  .payroll {
    padding: 2em;
  }
</style>
