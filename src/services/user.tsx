export const findGoogleUser = async (username: any, email: any, googleAccount: any) => {
  try {
    const response = await fetch('http://localhost:3000/api/users/findGoogle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, googleAccount }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const findUser = async (username: string, password: string, googleAccount: boolean) => {
  try {
    const response = await fetch('http://localhost:3000/api/users/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, googleAccount }),
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

export const registerUser = async (username: string, password: string, email: string, googleAccount:boolean) => {
  try {
    const response = await fetch('http://localhost:3000/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email, googleAccount }),
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

export const findUserById = async (id: string) => {
  try {
      const response = await fetch(`http://localhost:3000/api/users/findById?id=${id}`, {
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