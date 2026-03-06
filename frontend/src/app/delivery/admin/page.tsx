'use client';

import { DeliveryLaneConfig } from "@/types";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Plus, Trash2, Save, RotateCcw, Download, Upload } from "lucide-react";

export default function DeliveryAdminPage() {
    const [configs, setConfigs] = useState<DeliveryLaneConfig[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadConfigs();
    }, []);

    const loadConfigs = async () => {
        try {
            const data = await apiFetch<DeliveryLaneConfig[]>('/delivery-configs');
            setConfigs(data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const addRow = () => {
        setConfigs([...configs, {
            entity: '',
            laneName: '',
            subLaneId: '',
            devBouchonne: '',
            devIntegre: '',
            accostage: '',
            qualFonct: '',
            homolEntite: '',
            homolDistrib: '',
            preProd: '',
            prod: ''
        }]);
    };

    const removeRow = (index: number) => {
        setConfigs(configs.filter((_, i) => i !== index));
    };

    const updateVal = (index: number, key: keyof DeliveryLaneConfig, val: string) => {
        const updated = [...configs];
        updated[index] = { ...updated[index], [key]: val };
        setConfigs(updated);
    };

    const handleSave = async () => {
        try {
            await apiFetch('/delivery-configs/batch', {
                method: 'PUT',
                body: JSON.stringify(configs)
            });
            alert("Config sauvegardée !");
        } catch (e) {
            alert("Erreur lors de la sauvegarde");
        }
    };

    const clearAll = () => {
        if (confirm("Vider toutes les configurations ?")) {
            setConfigs([]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Administration des Couloirs</h1>
                    <p className="text-gray-600">Configuration en mode "Flat-6" des environnements de livraison.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={clearAll} className="flex items-center px-4 py-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-rose-100 font-medium">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Réinitialiser
                    </button>
                    <button onClick={handleSave} className="flex items-center px-6 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors shadow-md font-bold">
                        <Save className="h-4 w-4 mr-2" />
                        Sauvegarder tout
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-slate-50 uppercase text-[10px] font-black tracking-widest text-slate-500">
                            <tr>
                                <th className="px-4 py-4 text-left">Entité</th>
                                <th className="px-4 py-4 text-left">Couloir</th>
                                <th className="px-4 py-4 text-left">Niveau</th>
                                <th className="px-4 py-4 text-left">Sous-Niveau</th>
                                <th className="px-4 py-4 text-left">Distributeur</th>
                                <th className="px-4 py-4 text-left">Environnement</th>
                                <th className="px-4 py-4 text-right px-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {configs.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-2">
                                        <input
                                            className="w-full bg-transparent border-0 focus:ring-2 focus:ring-emerald-500 rounded text-sm px-2 py-1"
                                            value={row.entity}
                                            onChange={e => updateVal(idx, 'entity', e.target.value)}
                                            placeholder="PREDICA..."
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            className="w-full bg-transparent border-0 focus:ring-2 focus:ring-emerald-500 rounded text-sm px-2 py-1"
                                            value={row.laneName}
                                            onChange={e => updateVal(idx, 'laneName', e.target.value)}
                                            placeholder="VERSION..."
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <select
                                            className="w-full bg-transparent border-0 focus:ring-2 focus:ring-emerald-500 rounded text-sm px-2 py-1"
                                            value={row.devBouchonne} // On utilise ce champ temporairement pour le niveau
                                            onChange={e => updateVal(idx, 'devBouchonne', e.target.value)}
                                        >
                                            <option value="">Niveau...</option>
                                            <option value="FABRICATION">FABRICATION</option>
                                            <option value="QUALIFICATION">QUALIFICATION</option>
                                            <option value="HOMOLOGATION">HOMOLOGATION</option>
                                            <option value="PRODUCTION">PRODUCTION</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            className="w-full bg-transparent border-0 focus:ring-2 focus:ring-emerald-500 rounded text-sm px-2 py-1"
                                            value={row.subLaneId}
                                            onChange={e => updateVal(idx, 'subLaneId', e.target.value)}
                                            placeholder="Accostage..."
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            className="w-full bg-transparent border-0 focus:ring-2 focus:ring-emerald-500 rounded text-sm px-2 py-1"
                                            value={row.homolDistrib}
                                            onChange={e => updateVal(idx, 'homolDistrib', e.target.value)}
                                            placeholder="CA/LCL..."
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            className="w-full bg-transparent border-0 focus:ring-2 focus:ring-emerald-500 rounded text-sm px-2 py-1"
                                            value={row.devIntegre}
                                            onChange={e => updateVal(idx, 'devIntegre', e.target.value)}
                                            placeholder="Dév Intégré..."
                                        />
                                    </td>
                                    <td className="px-4 py-2 text-right px-6">
                                        <button onClick={() => removeRow(idx)} className="text-gray-300 hover:text-rose-600 transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button
                    onClick={addRow}
                    className="w-full py-4 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-emerald-600 transition-all font-bold text-xs uppercase tracking-widest border-t border-slate-100 flex items-center justify-center"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une ligne
                </button>
            </div>

            <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center px-4 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 font-semibold transition-all shadow-sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exporter CSV
                </button>
                <button className="flex-1 flex items-center justify-center px-4 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 font-semibold transition-all shadow-sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Importer CSV
                </button>
            </div>
        </div>
    );
}
