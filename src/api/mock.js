import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// Semi-persistent state hack
import store from '../vuex'

var DATABASE = {
  ID_INDEX: {
    USERS: 1,
    LEDGERS: 1,
    SUBLEDGERS: 10,
    ENTRIES: 1,
    INVOICES: 2
  },
  USERS: [
    {
      id: 1,
      username: 'admin',
      password: 'password',
      avatar: 'https://img.clipartfest.com/97d2abb83868cb5172ee2fdecd5acedb_iron-man-face-clipart-1-iron-man-face-clipart_256-256.png',
      name: 'Admin User'
    }
  ],
  LEDGERS: [
    {
      'id': 1,
      'name': 'Recreation USA',
      'currency': 'USD'
    }
  ],
  SUBLEDGERS: [
    {
      'id': 1,
      'accountName': 'Payroll Expense'
    },
    {
      'id': 2,
      'accountName': 'Inventory'
    },
    {
      'id': 3,
      'accountName': 'Cash'
    },
    {
      'id': 4,
      'accountName': 'Accounts Receivables'
    },
    {
      'id': 5,
      'accountName': 'Accounts Payable'
    },
    {
      'id': 6,
      'accountName': 'Sales'
    },
    {
      'id': 7,
      'accountName': 'General Expense'
    },
    {
      'id': 8,
      'accountName': 'Fixed Asset'
    },
    {
      'id': 9,
      'accountName': 'Tax Payable'
    },
    {
      'id': 10,
      'accountName': 'Financing'
    }
  ],
  ENTRIES: [
    {
      'id': 1,
      'subledgerId': 6,
      'date': '2017-03-01',
      'description': 'Sale of 20 units of enduro-250\'s',
      'amount': 45500
    },
    {
      'id': 2,
      'subledgerId': 2,
      'date': '2017-03-01',
      'description': 'Sale of 20 units of enduro-250\'s',
      'amount': -45500
    },
    {
      'id': 3,
      'subledgerId': 1,
      'date': '2017-03-05',
      'description': 'Services department biweekly salary expense',
      'amount': 24000
    },
    {
      'id': 4,
      'subledgerId': 5,
      'date': '2017-03-05',
      'description': 'Services department biweekly salary - net payroll payable',
      'amount': -16800
    },
    {
      'id': 4,
      'subledgerId': 9,
      'date': '2017-03-05',
      'description': 'Services department biweekly salary - income tax',
      'amount': -7200
    }
  ],
  INVOICES: [
    {
      'id': 1,
      'ref': 'TST_001',
      'name': 'Invoice Name',
      'amount': 50,
      'dueDate': '2017-04-01'
    },
    {
      'id': 2,
      'ref': 'TST_002',
      'name': 'Invoice Name Here',
      'amount': 700,
      'dueDate': '2017-05-01'
    }
  ]
}

export default {
  bootstrap () {
    let mock = new MockAdapter(axios)

    // mock generic
    mock.onGet('http://mock/success').reply(200, {msg: 'success'})
    mock.onGet('http://mock/error').reply(500, {msg: 'failure'})

    mock.onPost('http://mock/login').reply(config => {
      let {username, password} = JSON.parse(config.data)
      return new Promise((resolve, reject) => {
        let user = null
        setTimeout(() => {
          let hasUser = DATABASE.USERS.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u))
              user.password = undefined
              return true
            }
          })

          if (hasUser) {
            resolve([200, { code: 200, msg: 'Successful request', user }])
          } else {
            resolve([200, { code: 500, msg: 'Incorrect username or password' }])
          }
        }, 1000)
      })
    })

    // LEDGERS BOILERPLATE
    mock.onGet('http://mock/ledgers').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            ledgers: DATABASE.LEDGERS
          }])
        }, 500)
      })
    })
    mock.onPost('http://mock/ledgers').reply(config => {
      var ledger = (JSON.parse(config.data)).ledger
      ledger.id = ++DATABASE.ID_INDEX.LEDGERS
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          DATABASE.LEDGERS = store.state.ledgers // Semi-persistent state hack
          resolve([200, {
            msg: 'success',
            ledger: ledger
          }])
        }, 500)
      })
    })
    mock.onPut('http://mock/ledgers').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          DATABASE.LEDGERS = store.state.ledgers // Semi-persistent state hack
          resolve([200, {
            msg: 'success'
          }])
        }, 500)
      })
    })
    mock.onDelete('http://mock/ledgers').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          DATABASE.LEDGERS = store.state.ledgers // Semi-persistent state hack
          resolve([200, {
            msg: 'success'
          }])
        }, 500)
      })
    })

    // SUBLEDGERS BOILERPLATE
    mock.onGet('http://mock/subledgers').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            subledgers: DATABASE.SUBLEDGERS
          }])
        }, 500)
      })
    })
    mock.onPost('http://mock/subledgers').reply(config => {
      var subledger = (JSON.parse(config.data)).subledger
      subledger.id = ++DATABASE.ID_INDEX.SUBLEDGERS
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          DATABASE.SUBLEDGERS = store.state.subledgers // Semi-persistent state hack
          resolve([200, {
            msg: 'success',
            subledger: subledger
          }])
        }, 500)
      })
    })
    mock.onPut('http://mock/subledgers').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          DATABASE.SUBLEDGERS = store.state.subledgers // Semi-persistent state hack
          resolve([200, {
            msg: 'success'
          }])
        }, 500)
      })
    })
    mock.onDelete('http://mock/subledgers').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          DATABASE.SUBLEDGERS = store.state.subledgers // Semi-persistent state hack
          resolve([200, {
            msg: 'success'
          }])
        }, 500)
      })
    })

    // ENTRIES BOILERPLATE
    mock.onGet('http://mock/entries').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            entries: DATABASE.ENTRIES
          }])
        }, 500)
      })
    })
    mock.onPost('http://mock/entries').reply(config => {
      var entry = (JSON.parse(config.data)).entry
      entry.id = ++DATABASE.ID_INDEX.ENTRIES
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          DATABASE.ENTRIES = store.state.entries // Semi-persistent state hack
          resolve([200, {
            msg: 'success',
            entry: entry
          }])
        }, 500)
      })
    })
    mock.onPut('http://mock/entries').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          DATABASE.ENTRIES = store.state.entries // Semi-persistent state hack
          resolve([200, {
            msg: 'success'
          }])
        }, 500)
      })
    })
    mock.onDelete('http://mock/entries').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          DATABASE.ENTRIES = store.state.entries // Semi-persistent state hack
          resolve([200, {
            msg: 'success'
          }])
        }, 500)
      })
    })

    // INVOICES BOILERPLATE
    mock.onGet('http://mock/invoices').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            invoices: DATABASE.INVOICES
          }])
        }, 500)
      })
    })
    mock.onPost('http://mock/invoices').reply(config => {
      var invoice = (JSON.parse(config.data)).invoice
      invoice.id = ++DATABASE.ID_INDEX.INVOICES
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          DATABASE.INVOICES = store.state.invoices // Semi-persistent state hack
          resolve([200, {
            msg: 'success',
            invoice: invoice
          }])
        }, 500)
      })
    })
    mock.onPut('http://mock/invoices').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          DATABASE.INVOICES = store.state.invoices // Semi-persistent state hack
          resolve([200, {
            msg: 'success'
          }])
        }, 500)
      })
    })
    mock.onDelete('http://mock/invoices').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          DATABASE.INVOICES = store.state.invoices // Semi-persistent state hack
          resolve([200, {
            msg: 'success'
          }])
        }, 500)
      })
    })

    mock.onAny().passThrough()
  }
}
