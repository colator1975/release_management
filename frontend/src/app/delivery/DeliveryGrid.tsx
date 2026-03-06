'use client';

import { DeliveryLaneConfig } from "@/types";
import { useState } from "react";

interface Props {
    initialConfigs: DeliveryLaneConfig[];
}

export default function DeliveryGrid({ initialConfigs }: Props) {
    const [configs] = useState(initialConfigs);

    // Group by laneName
    const hv = configs.filter(c => c.laneName?.toLowerCase().includes('hors version'));
    const version = configs.filter(c => c.laneName?.toLowerCase().includes('version'));
    const maintenance = configs.filter(c => c.laneName?.toLowerCase().includes('maintenance'));

    const columns = [
        "Développement bouchonné",
        "Développement intégré",
        "Accostage",
        "Homologation",
        "THR intégré distributeurs",
        "PREPROD",
        "PROD"
    ];

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
            <div className="min-w-[1200px]">
                <div className="grid grid-cols-[180px_repeat(7,1fr)] gap-4 mb-8 text-center">
                    <div /> {/* Corner */}
                    {columns.map(col => (
                        <div key={col} className="p-4 border-2 border-slate-200 rounded-xl font-bold text-xs italic flex items-center justify-center bg-slate-50 min-h-[60px]">
                            {col}
                        </div>
                    ))}

                    {/* Row 1: Hors Version */}
                    <div className="flex items-center justify-center bg-slate-500 text-white font-black italic rounded-lg h-[60px]">
                        Hors Version
                    </div>
                    <Cell text={hv[0]?.devBouchonne} color="bg-slate-400" spanRow={2} />
                    <Cell text={hv[0]?.devIntegre} color="bg-slate-400" />
                    <Cell text={hv[0]?.accostage} color="bg-slate-400" />
                    <div className="bg-white border border-dashed border-slate-200 rounded-lg" />
                    <DualCell top={hv[0]} bottom={hv[1]} />
                    <Cell text={hv[0]?.preProd} color="bg-slate-400" />
                    <Cell text="PROD" color="bg-gradient-to-b from-slate-500 via-emerald-500 to-rose-500" spanRow={3} />

                    {/* Row 2: Version */}
                    <div className="flex items-center justify-center bg-emerald-500 text-white font-black italic rounded-lg h-[60px]">
                        Version
                    </div>
                    {/* devBouchonne spans from HV */}
                    <Cell text={version[0]?.devIntegre} color="bg-emerald-400" />
                    <Cell text={version[0]?.accostage} color="bg-emerald-400" />
                    <Cell text={version[0]?.qualFonct} color="bg-emerald-400" />
                    <DualCell top={version[0]} bottom={version[1]} />
                    <Cell text={version[0]?.preProd} color="bg-emerald-400" />

                    {/* Row 3: Maintenance */}
                    <div className="flex items-center justify-center bg-rose-500 text-white font-black italic rounded-lg h-[60px]">
                        Maintenance
                    </div>
                    <Cell text="N/A" color="bg-[repeating-linear-gradient(45deg,#f43f5e,#f43f5e_10px,#fb7185_10px,#fb7185_20px)]" />
                    <Cell text={maintenance[0]?.devIntegre} color="bg-rose-400" />
                    <Cell text={maintenance[0]?.accostage} color="bg-rose-400" />
                    <div className="bg-white border border-dashed border-slate-200 rounded-lg" />
                    <DualCell top={maintenance[0]} isSingle />
                    <Cell text={maintenance[0]?.preProd} color="bg-rose-400" />
                </div>
            </div>
        </div>
    );
}

function Cell({ text, color, spanRow = 1 }: { text?: string, color: string, spanRow?: number }) {
    if (!text) return <div className="bg-slate-50 rounded-lg border border-slate-100 min-h-[120px]" />;
    return (
        <div
            className={`${color} text-white font-black text-xl p-4 flex items-center justify-center text-center rounded-xl shadow-inner min-h-[120px]`}
            style={{ gridRow: `span ${spanRow}` }}
        >
            {text}
        </div>
    );
}

function DualCell({ top, bottom, isSingle = false }: { top?: DeliveryLaneConfig, bottom?: DeliveryLaneConfig, isSingle?: boolean }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-1 h-full">
                <div className="bg-emerald-400 p-2 rounded text-[10px] text-white font-bold flex flex-col justify-center text-center">
                    {top?.homolEntite || 'N/A'}
                    <span className="text-[8px] font-normal opacity-75">HOM</span>
                </div>
                <div className="bg-emerald-400 p-2 rounded text-[10px] text-white font-bold flex flex-col justify-center text-center">
                    {top?.homolDistrib || 'N/A'}
                    <span className="text-[8px] font-normal opacity-75">CATS</span>
                </div>
            </div>
            {!isSingle && (
                <>
                    <div className="text-[10px] text-center italic text-gray-400">puis</div>
                    <div className="grid grid-cols-2 gap-1 h-full">
                        <div className="bg-rose-400 p-2 rounded text-[10px] text-white font-bold flex flex-col justify-center text-center">
                            {bottom?.homolEntite || 'N/A'}
                            <span className="text-[8px] font-normal opacity-75">FORM</span>
                        </div>
                        <div className="bg-rose-400 p-2 rounded text-[10px] text-white font-bold flex flex-col justify-center text-center">
                            {bottom?.homolDistrib || 'N/A'}
                            <span className="text-[8px] font-normal opacity-75">NEHOM</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
