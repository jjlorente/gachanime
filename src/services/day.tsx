import config from "../config";

export const findDay = async () => {
    try {
        const response = await fetch(`${config.apiUrl}/day/findById`, {
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
    } catch (error: any) {
        console.error('Error:', error.message || error);
        throw error;
    }
};

export const createDay = async () => {
    try {
        const response = await fetch(`${config.apiUrl}/day/create`, {
            method: 'POST',
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
    } catch (error: any) {
        console.error('Error:', error.message || error);
        throw error;
    }
};

export const updateDay = async () => {
    try {
        const response = await fetch(`${config.apiUrl}/day/update`, {
            method: 'PUT',
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
    } catch (error: any) {
        console.error('Error:', error.message || error);
        throw error;
    }
};

export const updateWeek = async () => {
    try {
        const response = await fetch(`${config.apiUrl}/day/updateWeek`, {
            method: 'PUT',
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
    } catch (error: any) {
        console.error('Error:', error.message || error);
        throw error;
    }
};