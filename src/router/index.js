import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import NotFound from '@/components/404.vue'
import Home from '@/components/Home.vue'
import Dashboard from '@/components/Dashboard.vue'
import Ledgers from '@/components/Ledgers.vue'
import Subledgers from '@/components/Subledgers.vue'
import Entries from '@/components/Entries.vue'
import Payroll from '@/components/Payroll.vue'
import Invoices from '@/components/Invoices.vue'
import IncomeStatement from '@/components/IncomeStatement.vue'
import BalanceSheet from '@/components/BalanceSheet.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    },
    {
      path: '/',
      component: Home,
      name: 'Dashboards',
      iconCls: 'fa fa-bar-chart',
      leaf: true,
      children: [
        { path: '/dashboard', component: Dashboard, name: 'Dashboard' }
      ]
    },
    {
      path: '/transactions',
      component: Home,
      name: 'Transactions',
      iconCls: 'fa fa-calculator',
      children: [
        { path: '/ledgers', component: Ledgers, name: 'Ledgers' },
        { path: '/subledgers', component: Subledgers, name: 'Subledgers' },
        { path: '/entries', component: Entries, name: 'Entries' }
      ]
    },
    {
      path: '/payrollitem',
      component: Home,
      name: 'PayrollItem',
      iconCls: 'fa fa-address-book',
      leaf: true,
      children: [
        { path: '/payroll', component: Payroll, name: 'Payroll' }
      ]
    },
    {
      path: '/invoicesitem',
      component: Home,
      name: 'InvoicesItem',
      iconCls: 'fa fa-envelope',
      leaf: true,
      children: [
        { path: '/invoices', component: Invoices, name: 'Invoices' }
      ]
    },
    {
      path: '/statement',
      component: Home,
      name: 'Reports',
      iconCls: 'fa fa-file-excel-o',
      children: [
        { path: '/income', component: IncomeStatement, name: 'Income Statement' },
        { path: '/balance', component: BalanceSheet, name: 'Historical Balance Sheet' }
      ]
    },

    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})
