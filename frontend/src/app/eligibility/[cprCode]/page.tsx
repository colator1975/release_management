import { apiFetch } from "@/lib/api";
import { EligibilityForm } from "@/types";
import EligibilityFormClient from "./EligibilityFormClient";

interface Props {
    params: Promise<{ cprCode: string }>;
}

export default async function EligibilityFormPage({ params }: Props) {
    const { cprCode } = await params;

    let initialData: EligibilityForm | null = null;

    if (cprCode !== 'new') {
        try {
            initialData = await apiFetch<EligibilityForm>(`/eligibility-forms/${cprCode}`);
        } catch (e) {
            console.error("Dossier introuvable", e);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {cprCode === 'new' ? 'Nouveau dossier' : `Dossier ${cprCode}`}
                    </h1>
                    <p className="text-gray-600">Complétez le questionnaire pour évaluer l'éligibilité.</p>
                </div>
            </div>

            <EligibilityFormClient initialData={initialData} isNew={cprCode === 'new'} />
        </div>
    );
}
