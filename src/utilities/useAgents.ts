import { useMemo } from 'react';
import agentsSource from '@/StaticData/agents';

export interface Agent {
    id: string;
    name: string;
    role: string;
    image: string;
    email: string;
    phone: string;
    specialties: string[];
    description: string;
}

export const useAgents = () => {
    const agentsList = useMemo(() => agentsSource as Agent[], []);
    return { agents: agentsList };
};

export const useAgent = (id: string | number) => {
    const agent = useMemo(() => (agentsSource as Agent[]).find(a => String(a.id) === String(id)) || null, [id]);
    return { agent };
};


