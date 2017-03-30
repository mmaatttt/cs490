import NProgress from 'nprogress'
import { Notification } from 'element-ui'
import API from '../api'

function error (error) {
  Notification.error({
    title: 'Error',
    message: 'Error connecting to remote data server.'
  })
  console.log(error.response)
}

export default {
  initialize: function (store, {user}) {
    store.commit('setUser', {user})
  },

  // LEDGERS BOILERPLATE
  loadLedgers: function ({commit}) {
    NProgress.start()
    API.getLedgers().then((res) => {
      var ledgers = res.data.ledgers
      commit('addLedgers', {ledgers})
      NProgress.done()
    }).catch(error)
  },
  saveLedger: function (store, ledger) {
    NProgress.start()
    var index = store.state.ledgers.findIndex(led => { return led.id === ledger.id })

    if (index === -1) {
      store.commit('createLedger', {ledger})
      API.createLedger({ledger}).then((res) => {
        store.commit('setId', {storeName: 'ledgers', oldId: ledger.id, newId: res.data.ledger.id})
        NProgress.done()
      }).catch(error)
    } else {
      store.commit('updateLedger', {index, ledger})
      API.updateLedger({ledger}).then((res) => {
        NProgress.done()
      }).catch(error)
    }
  },
  deleteLedger: function (store, ledger) {
    NProgress.start()
    var index = store.state.ledgers.findIndex(led => { return led.id === ledger.id })

    if (index !== -1) {
      store.commit('deleteLedger', {index})
      API.deleteLedger({index}).then((res) => {
        NProgress.done()
      }).catch(error)
    }
  },

  // SUBLEDGERS BOILERPLATE
  loadSubledgers: function ({commit}) {
    NProgress.start()
    API.getSubledgers().then((res) => {
      var subledgers = res.data.subledgers
      commit('addSubledgers', {subledgers})
      NProgress.done()
    }).catch(error)
  },
  saveSubledger: function (store, subledger) {
    NProgress.start()
    var index = store.state.subledgers.findIndex(sub => { return sub.id === subledger.id })

    if (index === -1) {
      store.commit('createSubledger', {subledger})
      API.createSubledger({subledger}).then((res) => {
        store.commit('setId', {storeName: 'subledgers', oldId: subledger.id, newId: res.data.subledger.id})
        NProgress.done()
      }).catch(error)
    } else {
      store.commit('updateSubledger', {index, subledger})
      API.updateSubledger({subledger}).then((res) => {
        NProgress.done()
      }).catch(error)
    }
  },
  deleteSubledger: function (store, subledger) {
    NProgress.start()
    var index = store.state.subledgers.findIndex(sub => { return sub.id === subledger.id })

    if (index !== -1) {
      store.commit('deleteSubledger', {index})
      API.deleteSubledger({index}).then((res) => {
        NProgress.done()
      }).catch(error)
    }
  },

  // ENTRIES BOILERPLATE
  loadEntries: function ({commit}) {
    NProgress.start()
    API.getEntries({limit: 1000}).then((res) => {
      var entries = res.data
      commit('addEntries', {entries})
      NProgress.done()
    }).catch(error)
  },
  saveEntry: function (store, entry) {
    NProgress.start()
    var index = store.state.entries.findIndex(ent => { return ent.id === entry.id })
    entry.amount = parseInt(entry.amount)
    if (index === -1) {
      store.commit('createEntry', {entry})
      API.createEntry(entry).then((res) => {
        store.commit('setId', {storeName: 'entries', oldId: entry.id, newId: res.data.id})

        // Handle partner entry update
        if (entry.partnerEntry !== null) {
          var doubleUpdate = {
            id: entry.partnerEntry,
            partnerEntry: res.data.id
          }
          store.commit('reconcileEntry', {entryId: doubleUpdate.id, partnerId: doubleUpdate.partnerEntry})
          API.updateEntry(doubleUpdate).then((res) => {
            NProgress.done()
          }).catch(error)
        } else {
          NProgress.done()
        }
      }).catch(error)
    } else {
      store.commit('updateEntry', {index, entry})
      // Handle partner entry update
      if (entry.partnerEntry !== null) {
        store.commit('reconcileEntryAmount', {id: entry.partnerEntry, amount: -entry.amount})
      }
      API.updateEntry(entry).then((res) => {
        // Handle partner entry update
        if (entry.partnerEntry !== null) {
          var doubleUpdate = {
            id: entry.partnerEntry,
            amount: -entry.amount
          }
          API.updateEntry(doubleUpdate).then((res) => {
            NProgress.done()
          }).catch(error)
        } else {
          NProgress.done()
        }
      }).catch(error)
    }
  },
  deleteEntry: function (store, entry) {
    NProgress.start()
    API.deleteEntry(entry.id).then((res) => {
      // Handle partner entry update
      if (entry.partnerEntry !== null) {
        var doubleUpdate = {
          id: entry.partnerEntry,
          partnerEntry: null
        }
        API.updateEntry(doubleUpdate).then((res) => {
          store.commit('reconcileEntry', {entryId: doubleUpdate.id, partnerId: doubleUpdate.partnerEntry})
          NProgress.done()
        }).catch(error)
      } else {
        NProgress.done()
      }
    }).catch(error)

    var index = store.state.entries.findIndex(ent => { return ent.id === entry.id })
    if (index !== -1) {
      store.commit('deleteEntry', {index})
    }
  },

  // INVOICES BOILERPLATE
  loadInvoices: function ({commit}) {
    NProgress.start()
    API.getInvoices().then((res) => {
      var invoices = res.data.invoices
      commit('addInvoices', {invoices})
      NProgress.done()
    }).catch(error)
  },
  saveInvoice: function (store, invoice) {
    NProgress.start()
    var index = store.state.invoices.findIndex(inv => { return inv.id === invoice.id })

    if (index === -1) {
      store.commit('createInvoice', {invoice})
      API.createInvoice({invoice}).then((res) => {
        store.commit('setId', {storeName: 'invoices', oldId: invoice.id, newId: res.data.invoice.id})
        NProgress.done()
      }).catch(error)
    } else {
      store.commit('updateInvoice', {index, invoice})
      API.updateInvoice({invoice}).then((res) => {
        NProgress.done()
      }).catch(error)
    }
  },
  deleteInvoice: function (store, invoice) {
    NProgress.start()
    var index = store.state.invoices.findIndex(inv => { return inv.id === invoice.id })

    if (index !== -1) {
      store.commit('deleteInvoice', {index})
      API.deleteInvoice({index}).then((res) => {
        NProgress.done()
      }).catch(error)
    }
  }
}
