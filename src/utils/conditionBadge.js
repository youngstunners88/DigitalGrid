export function conditionBadgeClasses(condition) {
  const map = {
    'Like New':  'bg-brand-500/20 text-brand-400 border border-brand-500/40',
    'Excellent': 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40',
    'Good':      'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40',
    'Fair':      'bg-orange-500/20 text-orange-400 border border-orange-500/40',
  }
  return map[condition] ?? 'bg-gray-500/20 text-gray-400 border border-gray-500/40'
}
