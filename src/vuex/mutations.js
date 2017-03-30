export default {
  setUser (state, {user}) {
    state.user = user
    sessionStorage.setItem('user', JSON.stringify(user))
  },

  setId (state, {storeName, oldId, newId}) {
    var recordIndex = state[storeName].findIndex(record => { return record.id === oldId })
    var record = state[storeName][recordIndex]
    record.id = newId
    state[storeName].splice(recordIndex, 1, record)
  },

  // LEDGERS BOILERPLATE
  addLedgers (state, {ledgers}) {
    state.ledgers = ledgers
    // state.ledgers = state.ledgers.concat(ledgers)
  },
  createLedger (state, {ledger}) {
    state.ledgers.push(ledger)
  },
  updateLedger (state, {index, ledger}) {
    state.ledgers.splice(index, 1, ledger)
  },
  deleteLedger (state, {index}) {
    state.ledgers.splice(index, 1)
  },

  // SUBLEDGERS BOILERPLATE
  addSubledgers (state, {subledgers}) {
    state.subledgers = subledgers
    // state.subledgers = state.subledgers.concat(subledgers)
  },
  createSubledger (state, {subledger}) {
    state.subledgers.push(subledger)
  },
  updateSubledger (state, {index, subledger}) {
    state.subledgers.splice(index, 1, subledger)
  },
  deleteSubledger (state, {index}) {
    state.subledgers.splice(index, 1)
  },

  // ENTRIES BOILERPLATE
  addEntries (state, {entries}) {
    state.entries = entries
    // state.entries = state.entries.concat(entries)
  },
  createEntry (state, {entry}) {
    state.entries.push(entry)
  },
  updateEntry (state, {index, entry}) {
    state.entries.splice(index, 1, entry)
  },
  deleteEntry (state, {index}) {
    state.entries.splice(index, 1)
  },
  reconcileEntry (state, {entryId, partnerId}) {
    var entryIndex = state.entries.findIndex(entry => entry.id === entryId)
    var entry = state.entries[entryIndex]
    entry.partnerEntry = partnerId
    state.entries.splice(entryIndex, 1, entry)
  },
  reconcileEntryAmount (state, {id, amount}) {
    var entryIndex = state.entries.findIndex(entry => entry.id === id)
    var entry = state.entries[entryIndex]
    entry.amount = amount
    state.entries.splice(entryIndex, 1, entry)
  },

  // INVOICES BOILERPLATE
  addInvoices (state, {invoices}) {
    state.invoices = invoices
    // state.invoices = state.invoices.concat(invoices)
  },
  createInvoice (state, {invoice}) {
    state.invoices.push(invoice)
  },
  updateInvoice (state, {index, invoice}) {
    state.invoices.splice(index, 1, invoice)
  },
  deleteInvoice (state, {index}) {
    state.invoices.splice(index, 1)
  }
}
