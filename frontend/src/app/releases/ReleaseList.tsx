'use client';

import { Release, EligibilityForm } from "@/types";
import { useState } from "react";
import { Plus, Search, Filter, Calendar, Package, Trash2, Edit } from "lucide-react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

interface Props {
    initialReleases: Release[];
    availableProjects: EligibilityForm[];
}

export default function ReleaseList({ initialReleases, availableProjects }: Props) {
    const [releases, setReleases] = useState<Release[]>(initialReleases);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRelease, setEditingRelease] = useState<Partial<Release> | null>(null);

    const filteredReleases = releases.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.version.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (!confirm("Supprimer cette release ?")) return;
        try {
            await apiFetch(`/releases/${id}`, { method: 'DELETE' });
            setReleases(prev => prev.filter(r => r.id !== id));
        } catch (e) {
            alert("Erreur lors de la suppression");
        }
    };

    const handleSave = async (release: Partial<Release>) => {
        try {
            const saved = await apiFetch<Release>('/releases', {
                method: 'POST',
                body: JSON.stringify(release)
            });
            setReleases(prev => {
                const index = prev.findIndex(r => r.id === saved.id);
                if (index > -1) {
                    const newReleases = [...prev];
                    newReleases[index] = saved;
                    return newReleases;
                }
                return [...prev, saved];
            });
            setIsModalOpen(false);
            setEditingRelease(null);
        } catch (e) {
            alert("Erreur lors de l'enregistrement");
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex gap-2 flex-1 min-w-[300px]">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher une release..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-200 text-sm focus:ring-emerald-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtres
                    </button>
                </div>
                <button
                    onClick={() => { setEditingRelease({ name: '', version: '', status: 'Planifié', entity: 'PREDICA', canal: 'VERSION', projects: [], dates: {} }); setIsModalOpen(true); }}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center font-medium shadow-sm"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle Release
                </button>
            </div>

            <div className="bg-white shadow rounded-xl border border-gray-100 overflow-hidden text-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left font-bold text-slate-500 uppercase tracking-wider">Release</th>
                            <th className="px-6 py-4 text-left font-bold text-slate-500 uppercase tracking-wider">Compagnie</th>
                            <th className="px-6 py-4 text-left font-bold text-slate-500 uppercase tracking-wider">Canal</th>
                            <th className="px-6 py-4 text-left font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                            <th className="px-6 py-4 text-left font-bold text-slate-500 uppercase tracking-wider">Date PROD</th>
                            <th className="px-6 py-4 text-right font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredReleases.map(release => (
                            <tr key={release.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-gray-900">{release.name}</div>
                                    <div className="text-gray-400 text-xs text-uppercase">v{release.version}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${release.entity === 'PREDICA' ? 'bg-emerald-100 text-emerald-800' :
                                            release.entity === 'PACIFICA' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {release.entity}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-600">{release.canal}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium border border-slate-200">
                                        {release.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-bold text-gray-700">
                                    {/* Simplification: date de prod est souvent la dernière date saisie */}
                                    {Object.values(release.dates).pop() || '-'}
                                </td>
                                <td className="px-6 py-4 text-right space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => { setEditingRelease(release); setIsModalOpen(true); }} className="text-gray-400 hover:text-emerald-600">
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleDelete(release.id!)} className="text-gray-400 hover:text-rose-600">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && editingRelease && (
                <div className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 border border-white">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                            {editingRelease.id ? "Modifier la Release" : "🚀 Nouvelle Release"}
                        </h2>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Nom de la Release</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border-gray-200 focus:ring-emerald-500"
                                        placeholder="ex: Release Mars 2026"
                                        value={editingRelease.name}
                                        onChange={e => setEditingRelease({ ...editingRelease, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Version</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border-gray-200 focus:ring-emerald-500"
                                        placeholder="ex: 26.3"
                                        value={editingRelease.version}
                                        onChange={e => setEditingRelease({ ...editingRelease, version: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Statut</label>
                                    <select
                                        className="w-full rounded-lg border-gray-200 focus:ring-emerald-500"
                                        value={editingRelease.status}
                                        onChange={e => setEditingRelease({ ...editingRelease, status: e.target.value })}
                                    >
                                        <option>Planifié</option>
                                        <option>En cours</option>
                                        <option>Livré</option>
                                        <option>Bloqué</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Entité</label>
                                    <select
                                        className="w-full rounded-lg border-gray-200 focus:ring-emerald-500"
                                        value={editingRelease.entity}
                                        onChange={e => setEditingRelease({ ...editingRelease, entity: e.target.value })}
                                    >
                                        <option>PREDICA</option>
                                        <option>PACIFICA</option>
                                        <option>CACI</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Canal de livraison</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['VERSION', 'CMA', 'HORS VERSION'].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => setEditingRelease({ ...editingRelease, canal: c })}
                                            className={`px-4 py-3 rounded-xl border-2 text-xs font-bold transition-all ${editingRelease.canal === c
                                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                    : 'border-slate-100 hover:border-slate-200 text-slate-500'
                                                }`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t font-semibold">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2 text-slate-500 hover:text-slate-700 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={() => handleSave(editingRelease)}
                                    className="bg-emerald-600 text-white px-8 py-2 rounded-lg hover:bg-emerald-700 shadow-md transition-all active:scale-95"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
