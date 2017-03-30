<template>
  <el-dialog :title="title" v-model="isVisible" :close-on-click-modal="false" @close="dialogClose">
    <el-form :model="dataModel" label-width="100px" :rules="invoiceRules" ref="dataModel">
      <el-form-item label="Invoice Reference" prop="ref">
        <el-input v-model="dataModel.ref" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Name" prop="name">
        <el-input v-model="dataModel.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Amount" prop="amount">
        <el-input v-model="dataModel.amount" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Due Date">
        <el-date-picker type="date" placeholder="Due date" v-model="dataModel.dueDate" :picker-options="dueDateOptions"></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="dialogClose">Cancel</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="dataLoading">Save</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: true,
        default: false
      },
      title: {
        type: String,
        required: true,
        default: 'Edit'
      },
      dataModel: {
        type: Object,
        required: true,
        default: {
          id: 0,
          name: '',
          amount: undefined,
          dueDate: new Date()
        }
      }
    },
    data () {
      return {
        dataLoading: false,
        invoiceRules: {
          id: [
            { required: true, message: 'ID required', trigger: 'blur' }
          ],
          name: [
            { required: true, message: 'Name required', trigger: 'blur' }
          ]
        },
        dueDateOptions: {
          shortcuts: [
            {
              text: '+30 Days',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() + 3600 * 1000 * 24 * 30)
                picker.$emit('pick', date)
              }
            },
            {
              text: '+60 Days',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() + 3600 * 1000 * 24 * 60)
                picker.$emit('pick', date)
              }
            },
            {
              text: '+90 Days',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() + 3600 * 1000 * 24 * 90)
                picker.$emit('pick', date)
              }
            }
          ]
        }
      }
    },
    computed: {
      isVisible: function () {
        return this.show
      }
    },
    methods: {
      editSubmit: function () {
        this.$refs.dataModel.validate((valid) => {
          if (valid) {
            this.$store.dispatch('saveInvoice', this.dataModel)
            this.dialogClose()
          }
        })
      },
      dialogClose: function () {
        this.$emit('close')
      }
    }
  }

</script>

<style scoped>
</style>
