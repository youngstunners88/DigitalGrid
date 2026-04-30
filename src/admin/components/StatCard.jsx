export default function StatCard({ label, value, icon: Icon, trend, color = 'brand' }) {
  const palette = {
    brand: 'bg-brand-50 text-brand-700 border-brand-200',
    blue:  'bg-blue-50  text-blue-700  border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    purple:'bg-purple-50 text-purple-700 border-purple-200',
    orange:'bg-orange-50 text-orange-700 border-orange-200',
  }
  return (
    <div className={`rounded-2xl border-2 p-5 ${palette[color] ?? palette.brand}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center">
          <Icon size={20} />
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trend >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-sm opacity-70 font-medium mb-1">{label}</p>
      <p className="font-heading font-bold text-2xl">{value}</p>
    </div>
  )
}
