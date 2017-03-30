<template>
  <section>
    <el-col :span="24" class="toolbar">
      <el-button type="success" @click="handleAdd"><i class="fa fa-plus"></i> New Ledger</el-button>
    </el-col>

    <el-table :data="ledgers" highlight-current-row v-loading="dataLoading" empty-text="No Ledgers" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="80" sortable>
      </el-table-column>
      <el-table-column prop="name" label="Name" sortable>
      </el-table-column>
      <el-table-column prop="currency" label="Currency" width="130" sortable>
      </el-table-column>
      <el-table-column label="Actions" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ledger-edit :title="editTitle" :show="showEdit" :dataModel="editData" v-on:close="editModalClose" />
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import LedgerEdit from './LedgerEdit'

  export default {
    components: {
      LedgerEdit
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
        'ledgers'
      ])
    },
    methods: {
      handleAdd: function () {
        this.showEdit = true
        this.editData = {
          id: 0,
          name: '',
          currency: 'USD'
        }
        this.editTitle = 'Create New Ledger'
      },
      handleEdit: function (index, row) {
        this.showEdit = true
        this.editData = Object.assign({}, row)
        this.editTitle = `Edit Ledger ${row.name}`
      },
      handleDel: function (index, row) {
        this.$confirm('Are you sure you want to delete the record?', 'Confirm', {
          type: 'warning',
          confirmButtonText: `Delete ${row.name}`,
          cancelButtonText: 'Cancel'
        }).then(() => {
          this.$store.dispatch('deleteLedger', row).then((res) => {
            this.$notify({
              title: 'Success',
              message: `Ledger ${row.name} Deleted`,
              type: 'success'
            })
          })
        }).catch(() => {
        })
      },

      editModalClose: function () {
        this.showEdit = false
      }
    },
    mounted () {
      this.$store.dispatch('loadLedgers')
    }
  }

</script>

<style lang="scss">
</style>
