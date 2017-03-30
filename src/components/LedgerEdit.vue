<template>
  <el-dialog :title="title" v-model="isVisible" :close-on-click-modal="false" @close="dialogClose">
    <el-form :model="dataModel" label-width="100px" :rules="invoiceRules" ref="dataModel">
      <el-form-item label="Name" prop="name">
        <el-input v-model="dataModel.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Currency" prop="currency">
        <el-select v-model="dataModel.currency" placeholder="Currency">
          <el-option v-for="item in currencies" :label="item.label" :value="item.value" :key="item.value">
          </el-option>
        </el-select>
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
          currency: 'USD'
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
        currencies: [
          {value: 'CAD', label: 'CAD'},
          {value: 'USD', label: 'USD'}
        ]
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
            this.$store.dispatch('saveLedger', this.dataModel)
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
