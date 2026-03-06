'use client';

import { ProjectMapping } from "@/types";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Plus, Trash2, Save, Upload } from "lucide-react";

export default function MappingAdminPage() {
    const [mappings, setMappings] = useState<ProjectMapping[]>([]);

    useEffect(() => {
        loadMappings();
    }, []);

    const loadMappings = async () => {
        try {
            const data = await apiFetch<ProjectMapping[]>('/project-mappings');
            setMappings(data);
        } catch (e) { }
    };

    const addRow = () => {
        setMappings([...mappings, { cprCode: '', bloc: '', application: '', status: 'USED', state: '' }]);
    };

    const updateVal = (idx: number, key: keyof ProjectMapping, val: string) => {
        const next = [...mappings];
        next[idx] = { ...next[idx], [key]: val };
        setMappings(next);
    };

    const removeRow = async (idx: number) => {
        const mapping = mappings[idx];
        if (mapping.id) {
            await apiFetch(`/project-mappings/${mapping.id}`, { method: 'DELETE' });
        }
        setMappings(mappings.filter((_, i) => i !== idx));
    };

    const saveAll = async () => {
        try {
            for (const m of mappings) {
                await apiFetch('/project-mappings', {
                    method: 'POST',
                    body: JSON.stringify(m)
                });
            }
            alert("Mappings sauvegardés !");
            loadMappings();
        } catch (e) {
            alert("Erreur lors de la sauvegarde");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Administration du Mapping</h1>
                    <p className="text-gray-600">Réconciliez les codes CPR avec les briques SI.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={saveAll} className="flex items-center px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold shadow-md hover:bg-emerald-700 transition-all">
                        <Save className="h-4 w-4 mr-2" />
                        Enregistrer tout
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-slate-50 uppercase text-[10px] font-black tracking-widest text-slate-500">
                        <tr>
                            <th className="px-6 py-4 text-left">Code CPR</th>
                            <th className="px-6 py-4 text-left">Bloc applicatif</th>
                            <th className="px-6 py-4 text-left">Nom Application</th>
                            <th className="px-6 py-4 text-left">Statut</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {mappings.map((m, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-2">
                                    <input
                                        className="w-full bg-transparent border-0 focus:ring-2 focus:ring-emerald-500 rounded px-2 py-1 font-bold text-emerald-700"
                                        value={m.cprCode}
                                        onChange={e => updateVal(idx, 'cprCode', e.target.value)}
                                        placeholder="CPR-XXXX..."
                                    />
                                </td>
                                <td className="px-6 py-2">
                                    <input
                                        className="w-full bg-transparent border-0 focus:ring-2 focus:ring-emerald-500 rounded px-2 py-1"
                                        value={m.bloc}
                                        onChange={e => updateVal(idx, 'bloc', e.target.value)}
                                        placeholder="CATS / AIA..."
                                    />
                                </td>
                                <td className="px-6 py-2">
                                    <input
                                        className="w-full bg-transparent border-0 focus:ring-2 focus:ring-emerald-500 rounded px-2 py-1"
                                        value={m.application}
                                        onChange={e => updateVal(idx, 'application', e.target.value)}
                                        placeholder="App Name..."
                                    />
                                </td>
                                <td className="px-6 py-2">
                                    <select
                                        className="bg-transparent border-0 focus:ring-2 focus:ring-emerald-500 rounded text-[10px] font-bold uppercase"
                                        value={m.status}
                                        onChange={e => updateVal(idx, 'status', e.target.value)}
                                    >
                                        <option value="USED">USED</option>
                                        <option value="UNUSED">UNUSED</option>
                                    </select>
                                </td>
                                <td className="px-6 py-2 text-right">
                                    <button onClick={() => removeRow(idx)} className="text-gray-300 hover:text-rose-600 transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    onClick={addRow}
                    className="w-full py-4 bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all font-bold text-xs uppercase tracking-widest border-t border-slate-100 flex items-center justify-center"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau Mapping
                </button>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                <Upload className="h-8 w-8 text-slate-300 mb-2" />
                <h3 className="font-bold text-slate-600">Import de masse</h3>
                <p className="text-xs text-slate-400 mb-4 max-w-xs">Glissez votre fichier de mapping .csv ou .json pour synchroniser le référentiel.</p>
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold shadow-sm hover:border-slate-300 transition-all">
                    Parcourir les fichiers
                </button>
            </div>
        </div>
    );
}
