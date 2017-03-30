export default {
  subledgerNames: state => state.subledgers.map(sub => sub.accountName),
  summedEntries: state => {
    var summedEntries = {}
    state.entries.forEach(el => { summedEntries[el.subledgerId] = (summedEntries[el.subledgerId] || 0) + el.amount })
    return state.subledgers.map(sub => summedEntries[sub.id] || 0)
  }
}
