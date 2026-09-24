import { MockProjectRepository } from "./project.mock.repository";
import { HttpProjectRepository } from "./project.http.repository";
const provider=import.meta.env.VITE_DATA_PROVIDER ?? "mock";
export const projectRepository=provider==="http"?new HttpProjectRepository(import.meta.env.VITE_API_BASE_URL ?? "/api/v1"):new MockProjectRepository();
