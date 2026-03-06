'use client';

import { EligibilityForm } from "@/types";
import { QUESTIONS, THEMES } from "@/lib/questions";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Save, Download, Printer } from "lucide-react";

interface Props {
    initialData: EligibilityForm | null;
    isNew: boolean;
}

export default function EligibilityFormClient({ initialData, isNew }: Props) {
    const router = useRouter();
    const [formData, setFormData] = useState<Record<string, any>>(initialData?.formData || {});
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (id: number, question: string, value: string) => {
        setFormData(prev => ({ ...prev, [question]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Find CPR code and Entity from formData (standardized IDs in old app)
            const cprCode = formData["[CPR] Code Projet release"];
            const entity = formData["Entité (PREDICA/PACIFICA/CACI)"];

            if (!cprCode) {
                alert("Le code CPR est obligatoire.");
                return;
            }

            await apiFetch('/eligibility-forms', {
                method: 'POST',
                body: JSON.stringify({
                    cprCode,
                    entity,
                    formData
                })
            });

            alert("Enregistré avec succès !");
            router.push('/eligibility');
        } catch (e: any) {
            alert(`Erreur: ${e.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {THEMES.map(theme => (
                    <div key={theme} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
                        <h2 className="text-lg font-bold text-emerald-800 border-b pb-2 flex items-center">
                            {theme}
                        </h2>
                        {QUESTIONS.filter(q => q.theme === theme).map(q => (
                            <div key={q.id} className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">{q.question}</label>
                                {q.type === 'select' ? (
                                    <select
                                        className="w-full rounded-lg border-gray-200 text-sm focus:ring-emerald-500 transition-all"
                                        value={formData[q.question] || ""}
                                        onChange={(e) => handleChange(q.id, q.question, e.target.value)}
                                    >
                                        <option value="">Sélectionnez...</option>
                                        {q.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                ) : q.type === 'textarea' ? (
                                    <textarea
                                        className="w-full rounded-lg border-gray-200 text-sm focus:ring-emerald-500 transition-all"
                                        rows={3}
                                        value={formData[q.question] || ""}
                                        onChange={(e) => handleChange(q.id, q.question, e.target.value)}
                                    />
                                ) : (
                                    <input
                                        type={q.type}
                                        className="w-full rounded-lg border-gray-200 text-sm focus:ring-emerald-500 transition-all"
                                        value={formData[q.question] || ""}
                                        onChange={(e) => handleChange(q.id, q.question, e.target.value)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="flex justify-end gap-3 sticky bottom-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-lg">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="inline-flex items-center px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all shadow-md font-bold disabled:opacity-50"
                >
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? "Enregistrement..." : "Enregistrer"}
                </button>
                <button className="inline-flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium">
                    <Download className="mr-2 h-4 w-4" />
                    JSON
                </button>
                <button
                    onClick={() => window.print()}
                    className="inline-flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium"
                >
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimer
                </button>
            </div>
        </div>
    );
}
