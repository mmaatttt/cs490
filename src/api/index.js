import axios from 'axios'

let mockBase = 'http://mock'
let base = 'http://52.168.10.209:1337'

export default {
  authenticate: params => { return axios.post(`${mockBase}/login`, params) },

  processPayroll: params => { return axios.get(`${base}/external/processPayroll`) },

  // LEDGERS BOILERPLATE
  getLedgers: params => { return axios.get(`${mockBase}/ledgers`, { params: params }) },
  createLedger: params => { return axios.post(`${mockBase}/ledgers`, params) },
  updateLedger: params => { return axios.put(`${mockBase}/ledgers`, params) },
  deleteLedger: params => { return axios.delete(`${mockBase}/ledgers`, params) },

  // SUBLEDGERS BOILERPLATE
  getSubledgers: params => { return axios.get(`${mockBase}/subledgers`, { params: params }) },
  createSubledger: params => { return axios.post(`${mockBase}/subledgers`, params) },
  updateSubledger: params => { return axios.put(`${mockBase}/subledgers`, params) },
  deleteSubledger: params => { return axios.delete(`${mockBase}/subledgers`, params) },

  // ENTRIES BOILERPLATE
  getEntries: params => { return axios.get(`${base}/transaction`, { params: params }) },
  createEntry: data => { return axios.post(`${base}/transaction`, data) },
  updateEntry: data => { return axios.put(`${base}/transaction/${data.id}`, data) },
  deleteEntry: id => { return axios.delete(`${base}/transaction/${id}`) },

  // INVOICES BOILERPLATE
  getInvoices: params => { return axios.get(`${mockBase}/invoices`, { params: params }) },
  createInvoice: params => { return axios.post(`${mockBase}/invoices`, params) },
  updateInvoice: params => { return axios.put(`${mockBase}/invoices`, params) },
  deleteInvoice: params => { return axios.delete(`${mockBase}/invoices`, params) }
}
