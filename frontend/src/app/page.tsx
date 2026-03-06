import Link from "next/link";
import { ArrowUpRight, CheckCircle, Clock, Layout } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { name: "Releases en cours", value: "12", icon: Clock, color: "text-blue-600", bg: "bg-blue-100", href: "/releases" },
    { name: "Projets éligibles", value: "45", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100", href: "/eligibility" },
    { name: "Couloirs configurés", value: "8", icon: Layout, color: "text-purple-600", bg: "bg-purple-100", href: "/delivery" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-2 text-gray-600">Bienvenue dans la nouvelle interface de gestion des releases CAA.</p>
        </div>
        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
          Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <Link key={item.name} href={item.href} className="bg-white overflow-hidden shadow rounded-xl border border-gray-100 transition-all hover:shadow-md active:scale-[0.98]">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 rounded-lg ${item.bg}`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-bold text-gray-900">
                        {item.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            Prochaines Releases
            <ArrowUpRight className="ml-2 h-4 w-4 text-gray-400" />
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((r) => (
              <div key={r} className="flex items-center p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                  R{r}
                </div>
                <div className="ml-4 flex-1">
                  <div className="text-sm font-semibold text-gray-900">Release Mars 2026 #{r}</div>
                  <div className="text-xs text-gray-500">Prévue pour le 15/03/2026</div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  En préparation
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            Activités récentes
            <Clock className="ml-2 h-4 w-4 text-gray-400" />
          </h2>
          <div className="flow-root">
            <ul className="-mb-8">
              {[1, 2, 3].map((item, idx) => (
                <li key={item}>
                  <div className="relative pb-8">
                    {idx !== 2 && <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center ring-8 ring-white">
                          <Layout className="h-4 w-4 text-gray-500" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            Modification du couloir <span className="font-medium text-gray-900">PREDICA Version</span> par <span className="font-medium text-gray-900">Admin</span>
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          Il y a {item}h
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
