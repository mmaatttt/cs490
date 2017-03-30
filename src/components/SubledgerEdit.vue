<template>
  <el-dialog :title="title" v-model="isVisible" :close-on-click-modal="false" @close="dialogClose">
    <el-form :model="dataModel" label-width="100px" :rules="invoiceRules" ref="dataModel">
      <el-form-item label="Account Name" prop="accountName">
        <el-input v-model="dataModel.accountName" auto-complete="off"></el-input>
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
          accountName: ''
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
            this.$store.dispatch('saveSubledger', this.dataModel)
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
