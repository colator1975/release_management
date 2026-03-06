import { apiFetch } from "@/lib/api";
import { Release, EligibilityForm } from "@/types";
import ReleaseList from "./ReleaseList";

async function getReleases(): Promise<Release[]> {
    try {
        return await apiFetch<Release[]>('/releases');
    } catch (e) {
        return [];
    }
}

async function getProjects(): Promise<EligibilityForm[]> {
    try {
        return await apiFetch<EligibilityForm[]>('/eligibility-forms');
    } catch (e) {
        return [];
    }
}

export default async function ReleasesPage() {
    const [releases, projects] = await Promise.all([
        getReleases(),
        getProjects()
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Planning des Releases</h1>
                    <p className="text-gray-600">Pilotez les versions et les jalons de livraison.</p>
                </div>
            </div>

            <ReleaseList initialReleases={releases} availableProjects={projects} />
        </div>
    );
}
