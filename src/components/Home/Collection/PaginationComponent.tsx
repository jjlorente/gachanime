import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './PaginationComponent.css'

export const PaginationComponent = (props: any) => {
    let pages = []

    for(let i = 1; i <= Math.ceil(props.totalPosts/props.cardsPerPage); i++) {
        pages.push(i)
    }
    
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        props.setCurrentPage(page);
    };

    return (
        <Stack spacing={2}>
            <Pagination 
                count={pages.length} 
                onChange={handlePageChange} 
                className="pagination"
                siblingCount={0}
                boundaryCount={1}
            />
        </Stack>
    )
}
