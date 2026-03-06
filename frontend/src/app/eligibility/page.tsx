import { apiFetch } from "@/lib/api";
import { EligibilityForm } from "@/types";
import Link from "next/link";
import { Plus } from "lucide-react";

async function getForms(): Promise<EligibilityForm[]> {
    try {
        return await apiFetch<EligibilityForm[]>('/eligibility-forms');
    } catch (e) {
        return [];
    }
}

export default async function EligibilityListPage() {
    const forms = await getForms();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Formulaires d'éligibilité</h1>
                    <p className="text-gray-600">Gérez les dossiers CPR et leur éligibilité aux releases.</p>
                </div>
                <Link
                    href="/eligibility/new"
                    className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm font-medium"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Nouveau dossier
                </Link>
            </div>

            <div className="bg-white shadow rounded-xl border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">CPR Code</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Entité</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date de création</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {forms.map((form) => (
                            <tr key={form.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-emerald-700">{form.cprCode}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{form.entity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                                    {form.createdAt ? new Date(form.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <Link href={`/eligibility/${form.cprCode}`} className="text-emerald-600 hover:text-emerald-900 font-medium">
                                        Consulter
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {forms.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">
                                    Aucun dossier trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
