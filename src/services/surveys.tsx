import config from "../config";

export const addVote = async (userId: string, vote: number) => {
    try {
        let voteUser = vote === 1 ? 0 : 1;

        const response = await fetch(`${config.apiUrl}/surveys/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, voteUser }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error en la respuesta del servidor:", errorData);
            throw new Error(errorData.error || 'Unknown error');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error capturado en addVote:', error);
        throw error;
    }
};


export const find = async () => {
    try {
        const response = await fetch(`${config.apiUrl}/surveys/find`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Unknown error');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};