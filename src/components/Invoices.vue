<template>
  <section>
    <el-col :span="24" class="toolbar">
      <el-button type="success" @click="handleAdd"><i class="fa fa-plus"></i> New Invoice</el-button>
    </el-col>

    <el-table :data="invoices" highlight-current-row v-loading="dataLoading" empty-text="No Invoices" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="ref" label="Reference" width="130" sortable>
      </el-table-column>
      <el-table-column prop="name" label="Name" sortable>
      </el-table-column>
      <el-table-column prop="amount" label="Amount" width="130" :formatter="formatAmount" sortable>
      </el-table-column>
      <el-table-column prop="dueDate" label="Due Date" width="150" :formatter="formatDate" sortable>
      </el-table-column>
      <el-table-column label="Actions" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <invoice-edit :title="editTitle" :show="showEdit" :dataModel="editData" v-on:close="editModalClose" />
  </section>
</template>

<script>
  import moment from 'moment'
  import { mapState } from 'vuex'
  import InvoiceEdit from './InvoiceEdit'

  export default {
    components: {
      InvoiceEdit
    },
    data () {
      return {
        dataLoading: false,
        showEdit: false,
        editTitle: 'Edit',
        editData: {}
      }
    },
    computed: {
      ...mapState([
        'invoices'
      ])
    },
    methods: {
      handleAdd: function () {
        this.showEdit = true
        this.editData = {
          id: '',
          name: '',
          amount: undefined,
          dueDate: new Date()
        }
        this.editTitle = 'Create New Invoice'
      },
      handleEdit: function (index, row) {
        this.showEdit = true
        this.editData = Object.assign({}, row)
        this.editTitle = `Edit Invoice ${row.ref}`
      },
      handleDel: function (index, row) {
        this.$confirm('Are you sure you want to delete the record?', 'Confirm', {
          type: 'warning',
          confirmButtonText: `Delete ${row.ref}`,
          cancelButtonText: 'Cancel'
        }).then(() => {
          this.$store.dispatch('deleteInvoice', row).then((res) => {
            this.$notify({
              title: 'Success',
              message: `Invoice ${row.ref} Deleted`,
              type: 'success'
            })
          })
        }).catch(() => {
        })
      },

      formatAmount: function (row) {
        return '$' + row.amount
      },
      formatDate: function (row) {
        return moment(row.dueDate).format('MMMM Do YYYY')
      },

      editModalClose: function () {
        this.showEdit = false
      }
    },
    mounted () {
      this.$store.dispatch('loadInvoices')
    }
  }

</script>

<style lang="scss">
</style>
