import {
    Container,
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    TablePagination
} from '@mui/material'
import { Image } from './components/Image/Image'
import { Input } from './components/Input/Input'
import { Label } from './components/Input/Label'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { 
    fetchTags, 
    selectSortBy, 
    selectSortingOrder, 
    selectTags, 
    selectTagsError, 
    selectTagsStatus,
    setSortBy,
    setSortingOrder,
    sortData
} from './features/tags/tagsSlice'
import { useState, useEffect } from 'react'
import { Status } from './features/types'
import { Loader } from './components/Loader/Loader'


function App() {
    const dispatch = useAppDispatch()
    const tagsStatus = useAppSelector(selectTagsStatus)
    const tagsError = useAppSelector(selectTagsError)
    const tags = useAppSelector(selectTags)
    const [tagsNumber, setTagsNumber] = useState<string>('1')
    const sortBy = useAppSelector(selectSortBy)
    const sortingOrder = useAppSelector(selectSortingOrder)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    useEffect(() => {
        dispatch(sortData())
    }, [sortBy, sortingOrder, dispatch])

    return (
        <>
            <Box component="section">
                <AppBar
                    position="static"
                    sx={{ color: '#000000', bgcolor: '#ffffff' }}
                >
                    <Toolbar disableGutters sx={{ margin: '0 10px' }}>
                        <Image
                            src="src/assets/logo.png"
                            alt="Logo"
                        />
                    </Toolbar>
                </AppBar>
            </Box>
            <Container maxWidth="lg" /*sx={{ marginTop: '120px' }}*/ >
                <Box 
                    display="flex" 
                    flexDirection="column" 
                    alignItems="center"
                    sx={{ margin: '50px 0' }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>FETCH STACKOVERFLOW TAGS</Typography>
                    <Box
                        display="flex" 
                        flexDirection="row" 
                        alignItems="center"
                        sx={{ margin: '15px 0' }}
                    >
                        <Label 
                            htmlFor="tagsNumber" 
                            label="Number of tags:" 
                            style={{ margin: '0 10px' }} 
                        />
                        <Input 
                            type="number" 
                            name="tagsNumber" 
                            min="1" 
                            max="999" 
                            value={tagsNumber}
                            onChange={(e) => setTagsNumber(e.target.value)}
                        />
                        <Button 
                            variant="outlined"
                            sx={{ margin: '0 8px' }}
                            disabled={Number(tagsNumber) <= 0 ? true : false}
                            onClick={() => dispatch(fetchTags({ items: tagsNumber }))}
                        >
                            Get tags
                        </Button>
                    </Box>
                    <Paper sx={{ width: 460, overflow: 'hidden', margin: '50px 0' }}>
                        <TableContainer sx={{ maxHeight: 460 }}>
                            <Box
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                sx={{ padding: '10px' }}
                            >
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Sort by:</Typography>
                                <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="sorting-field">Field</InputLabel>
                                    <Select
                                        labelId="sorting-field"
                                        id="sorting-field"
                                        label="Field"
                                        disabled={tags ? false : true}
                                        value={sortBy}
                                        onChange={(e) => dispatch(setSortBy(e.target.value))}
                                    >
                                        <MenuItem value="name">Name</MenuItem>
                                        <MenuItem value="count">Count</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="sorting-order">Order</InputLabel>
                                    <Select
                                        labelId="sorting-order"
                                        id="sorting-order"
                                        label="Order"
                                        disabled={tags ? false : true}
                                        value={sortingOrder}
                                        onChange={(e) => dispatch(setSortingOrder(e.target.value))}
                                    >
                                        <MenuItem value="ascending">Ascending</MenuItem>
                                        <MenuItem value="descending">Descending</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Table stickyHeader sx={{ width: '100%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Tag name</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Count (related posts)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tagsStatus === Status.LOADING && (
                                        <TableRow>
                                            <TableCell colSpan={2}>
                                                <Box
                                                    display="flex"
                                                    justifyContent="center"
                                                >
                                                    <Loader />
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {tagsStatus === Status.FAILED && (
                                        <TableRow>
                                            <TableCell colSpan={2}>
                                                <Box
                                                    display="flex"
                                                    justifyContent="center"
                                                >
                                                    {tagsError}
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {!tags ?
                                        <TableRow>
                                            <TableCell>
                                                <Typography>No data fetched...</Typography>
                                            </TableCell>
                                        </TableRow> :
                                        tags
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((tag) => (
                                                <TableRow key={tag.name}>
                                                    <TableCell align="right">{tag.name}</TableCell>
                                                    <TableCell align="right">{tag.count}</TableCell>
                                                </TableRow>
                                            ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    {tags && 
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15, 20]} 
                            component="div"
                            count={tags?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    }
                </Box>
            </Container>
        </>
    )
}

export default App
