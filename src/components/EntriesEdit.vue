<template>
  <el-dialog :title="title" v-model="isVisible" :close-on-click-modal="false" @close="dialogClose">
    <el-form :model="dataModel" label-width="100px" :rules="validationRules" ref="dataModel">
      <el-form-item label="Amount" prop="amount">
        <el-input v-model="dataModel.amount" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="dataModel.description" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Subledger" prop="subledgerId">
        <el-select v-model="dataModel.subledgerId" placeholder="Subledger">
          <el-option v-for="item in subledgers" :label="item.accountName" :value="item.id" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Date">
        <el-date-picker type="date" placeholder="Date" v-model="dataModel.date" :picker-options="dateOptions"></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="dialogClose">Cancel</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="dataLoading">Save</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { mapState } from 'vuex'

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
          id: '',
          subledgerId: undefined,
          date: new Date(),
          description: '',
          amount: undefined,
          // department: false,
          partnerEntry: null
        }
      }
    },
    data () {
      return {
        dataLoading: false,
        validationRules: {
          amount: [
            { required: true, message: 'Amount required', trigger: 'blur' }
          ],
          description: [
            { required: true, message: 'Description required', trigger: 'blur' }
          ],
          subledgerId: [
            { required: true, type: 'number', message: 'Subledger required', trigger: 'blur' }
          ],
          date: [
            { required: true, type: 'date', message: 'Date required', trigger: 'blur' }
          ]
        },
        dateOptions: {
          shortcuts: [
            {
              text: 'Today',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime())
                picker.$emit('pick', date)
              }
            },
            {
              text: 'Yesterday',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 1)
                picker.$emit('pick', date)
              }
            }
          ]
        }

      }
    },
    computed: {
      ...mapState([
        'subledgers'
      ]),
      isVisible: function () {
        return this.show
      }
    },
    methods: {
      editSubmit: function () {
        this.$refs.dataModel.validate((valid) => {
          if (valid) {
            this.$store.dispatch('saveEntry', this.dataModel)
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
