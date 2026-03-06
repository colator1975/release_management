import { DeliveryLaneConfig } from "@/types";
import DeliveryGrid from "./DeliveryGrid";

async function getDeliveryConfigs(): Promise<DeliveryLaneConfig[]> {
    try {
        const res = await fetch('http://localhost:8080/api/delivery-configs', { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
}

export default async function DeliveryPage() {
    const configs = await getDeliveryConfigs();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Couloirs de Livraison</h1>
                <div className="flex gap-2">
                    <span className="px-3 py-1 rounded bg-blue-100 text-blue-800 text-xs font-bold uppercase">Predica</span>
                    <span className="px-3 py-1 rounded bg-slate-100 text-slate-400 text-xs font-bold uppercase">Pacifica</span>
                    <span className="px-3 py-1 rounded bg-slate-100 text-slate-400 text-xs font-bold uppercase">Caci</span>
                </div>
            </div>

            <DeliveryGrid initialConfigs={configs} />
        </div>
    );
}
