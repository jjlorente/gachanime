import { useEffect, useState } from 'react'
import { getRank } from '../../../services/user';

export const Ranking = () => {
    const [ranks, setRanks] = useState<any>([]); 

    useEffect(() => {
        const getRanks = async () => {
        try {
            const data = await getRank(); 
            setRanks(data);
        } catch (error) {
            console.error("Error fetching ranks:", error);
        }
        };

        getRanks();
        console.log(ranks)
    }, []);
    
    useEffect(() => {
        console.log(ranks)
    }, [ranks]);

    return (
        <div>Ranking</div>
    )
}
