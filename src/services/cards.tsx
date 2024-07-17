export const findCards = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/cards/findAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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

export const findCardsSummoned = async (id: string, raritys: Array<string>, throws:number, gachas:number, type: number) => {
    try {
        const response = await fetch(`http://localhost:3000/api/cards/findCardSummoned`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, raritys, throws, gachas, type}),
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
