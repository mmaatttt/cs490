<template>
  <section>
    <el-col :span="18" class="toolbar">
      <el-radio-group v-model="entryFilter">
        <el-radio-button label="All"></el-radio-button>
        <el-radio-button label="Reconciled"></el-radio-button>
        <el-radio-button label="Unreconciled"></el-radio-button>
      </el-radio-group>
    </el-col>
    <el-col :span="6" class="toolbar">
      <el-button type="success" @click="handleAdd" style="float:right"><i class="fa fa-plus"></i> New Entry</el-button>
    </el-col>

    <el-table :data="tableData" highlight-current-row v-loading="dataLoading" empty-text="No Entries" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="80" sortable>
      </el-table-column>
      <el-table-column prop="subledgerId" label="Subledger" width="180" :formatter="formatSubledgerId" sortable>
      </el-table-column>
      <el-table-column prop="amount" label="Debit" width="120" :formatter="formatDebit" sortable>
      </el-table-column>
      <el-table-column prop="amount" label="Credit" width="120" :formatter="formatCredit" sortable>
      </el-table-column>
      <el-table-column prop="description" label="Description" sortable>
      </el-table-column>
      <el-table-column prop="partnerEntry" label="Partner Entry" width="130">
        <template scope="scope">
          <template v-if="scope.row.partnerEntry !== null">
            <el-tooltip class="item" effect="dark" content="Edit partner entry" placement="right">
              <el-button type="text" @click="handlePartnerView(scope.row.partnerEntry)">{{ scope.row.partnerEntry }}</el-button>
            </el-tooltip>
          </template>
          <template v-else>
            <el-button type="text" @click="handlePartnerReconcile(scope.$index, scope.row)">Reconcile</el-button>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="Date" width="110" :formatter="formatDate" sortable>
      </el-table-column>

      <el-table-column label="Actions" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <entries-edit :title="editTitle" :show="showEdit" :dataModel="editData" v-on:close="editModalClose" />

    <el-dialog :title="reconcile.title" v-model="reconcile.isVisible" :close-on-click-modal="false">
      <h1>ID {{reconcile.dataModel.id}}</h1>
      <el-form :model="reconcile.dataModel" label-width="100px" :rules="reconcile.formRules" ref="reconcile">
        <el-form-item label="Amount" prop="amount">
          <el-input v-model="reconcile.dataModel.amount" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="reconcile.dataModel.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Subledger" prop="subledgerId">
          <el-select v-model="reconcile.dataModel.subledgerId" placeholder="Subledger">
            <el-option v-for="item in subledgers" :label="item.accountName" :value="item.id" :key="item.id" :disabled="item.id === reconcile.disallowedSubledgerId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Date">
          <el-date-picker type="date" placeholder="Date" v-model="reconcile.dataModel.date" disabled></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="reconcileClose">Cancel</el-button>
        <el-button type="primary" @click.native="reconcileSubmit" :loading="dataLoading">Reconcile</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  import moment from 'moment'
  import { mapState } from 'vuex'
  import EntriesEdit from './EntriesEdit'

  export default {
    components: {
      EntriesEdit
    },
    data () {
      return {
        entryFilter: 'All',
        dataLoading: false,
        showEdit: false,
        editTitle: 'Edit',
        editData: {},
        reconcile: {
          title: 'Reconcile',
          isVisible: false,
          disallowedSubledgerId: false,
          dataModel: {
            amount: 0,
            description: '',
            subledgerId: null,
            date: new Date(),
            partnerEntry: null
          },
          formRules: {
            descrption: [
              { required: true, message: 'Description required', trigger: 'blur' }
            ],
            subledgerId: [
              { required: true, type: 'number', message: 'Subledger required', trigger: 'blur' }
            ]
          }
        }
      }
    },
    computed: {
      ...mapState([
        'subledgers',
        'entries'
      ]),
      tableData () {
        if (this.entryFilter === 'Reconciled') {
          return this.entries.filter(entry => entry.partnerEntry !== null)
        } else if (this.entryFilter === 'Unreconciled') {
          return this.entries.filter(entry => entry.partnerEntry === null)
        } else {
          return this.entries
        }
      }
    },
    methods: {
      handleAdd: function () {
        this.showEdit = true
        this.editData = {
          id: '',
          subledgerId: undefined,
          date: new Date(),
          description: '',
          amount: undefined,
          // department: false,
          partnerEntry: null
        }
        this.editTitle = 'Create New Entry'
      },
      handleEdit: function (index, row) {
        this.showEdit = true
        this.editData = Object.assign({}, row)
        this.editTitle = `Edit Entry ${row.description}`
      },
      handleDel: function (index, row) {
        this.$confirm('Are you sure you want to delete the record?', 'Confirm', {
          type: 'warning',
          confirmButtonText: `Delete ${row.description}`,
          cancelButtonText: 'Cancel'
        }).then(() => {
          this.$store.dispatch('deleteEntry', row).then((res) => {
            this.$notify({
              title: 'Success',
              message: `Entry ${row.description} Deleted`,
              type: 'success'
            })
          })
        }).catch(() => {
        })
      },
      handlePartnerView: function (partnerEntryId) {
        this.showEdit = true
        this.editData = Object.assign({}, this.entries.find(entry => entry.id === partnerEntryId))
        this.editTitle = `Edit Entry "${this.editData.description}"`
      },
      handlePartnerReconcile: function (index, row) {
        this.reconcile.isVisible = true
        this.reconcile.title = `Reconcile entry "${row.description}"`
        this.reconcile.disallowedSubledgerId = row.subledgerId

        this.reconcile.dataModel = Object.assign({}, row)
        this.reconcile.dataModel.id = ''
        this.reconcile.dataModel.amount = -row.amount
        this.reconcile.dataModel.subledgerId = null
        this.reconcile.dataModel.partnerEntry = row.id
      },

      reconcileSubmit: function () {
        this.$refs.reconcile.validate((valid) => {
          if (valid) {
            this.$store.dispatch('saveEntry', this.reconcile.dataModel)
            this.reconcileClose()
          }
        })
      },
      reconcileClose: function () {
        this.reconcile.isVisible = false
      },

      formatSubledgerId: function (row) {
        var subledger = this.subledgers.find(subl => { return subl.id === row.subledgerId })
        return subledger ? subledger.accountName : ''
      },
      formatDebit: function (row) {
        return (row.amount < 0 ? '$' + -row.amount : '')
      },
      formatCredit: function (row) {
        return (row.amount > 0 ? '$' + row.amount : '')
      },
      formatDate: function (row) {
        return moment(row.date).format('YYYY/MM/DD')
      },

      editModalClose: function () {
        this.showEdit = false
      }
    },
    mounted () {
      this.$store.dispatch('loadSubledgers')
      this.$store.dispatch('loadEntries')
    }
  }

</script>

<style lang="scss">
</style>
