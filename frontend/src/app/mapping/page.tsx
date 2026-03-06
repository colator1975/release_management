import { apiFetch } from "@/lib/api";
import { ProjectMapping } from "@/types";
import { Layers } from "lucide-react";

async function getMappings(): Promise<ProjectMapping[]> {
    try {
        return await apiFetch<ProjectMapping[]>('/project-mappings');
    } catch (e) {
        return [];
    }
}

export default async function MappingPage() {
    const mappings = await getMappings();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Mapping Projets</h1>
                    <p className="text-gray-600">Suivi des applications et blocs par projet CPR.</p>
                </div>
            </div>

            <div className="bg-white shadow rounded-xl border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Projet</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Bloc</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Application</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">État</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {mappings.map((m) => (
                            <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <Layers className="h-4 w-4 text-gray-400 mr-2" />
                                        <span className="font-medium text-gray-900">{m.cprCode}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{m.bloc}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{m.application}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${m.status === 'USED' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {m.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                                    {m.state || '-'}
                                </td>
                            </tr>
                        ))}
                        {mappings.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                                    Aucun mapping trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
