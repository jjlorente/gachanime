export const findUserGames = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/userGames/findById?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return undefined;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const findGameImageById = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/userGames/findGameImageById?id=${id}`, {
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

export const registerNewGameUser = async (userId: string) => {
    try {
        const response = await fetch('http://localhost:3000/api/userGames/create', {
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