export const findUserCards = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/userCards/findById?id=${id}`, {
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

export const registerUserCard = async (userId: string) => {
    try {
        const response = await fetch('http://localhost:3000/api/userCards/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({ userId }),
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