import { createSlice } from "@reduxjs/toolkit/react"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import type { RootState } from "../../app/store"
import { Status, Tag } from "../types"


const TAGS_URL = 'https://api.stackexchange.com/2.3/tags'

type SortingDirection = 'ascending' | 'descending'

interface DataItem {
    [key: string]: any
}

interface TagsState {
    status: Status,
    error: string | undefined,
    tags: Tag[] | undefined,
    sortBy: string,
    sortingOrder: SortingDirection
}

const initialState: TagsState = {
    status: Status.IDLE,
    error: undefined,
    tags: undefined,
    sortBy: '',
    sortingOrder: 'ascending'
}

export const fetchTags = createAsyncThunk<Tag[], { items: string | undefined }>(
    'tags/fetchTags',
    async ({ items }) => {
        const response = await axios.get(`${TAGS_URL}?page=1&pagesize=${items}&site=stackoverflow`)
        return response.data.items
    }
)

const comparator = (a: DataItem, b: DataItem, field: keyof DataItem, direction: SortingDirection) => {
    let comparison = 0
    if (a[field] > b[field]) {
        comparison = 1
    } else if (a[field] < b[field]) {
        comparison = -1
    }
    return direction === 'ascending' ? comparison : -comparison
}

export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setSortBy(state, action) {
            state.sortBy = action.payload
        },
        setSortingOrder(state, action) {
            state.sortingOrder = action.payload
        },
        sortData(state) {
            state.tags?.sort((a, b) => comparator(a, b, state.sortBy, state.sortingOrder))
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTags.pending, (state) => {
                state.tags = undefined
                state.status = Status.LOADING
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.status = Status.SUCCEEDED
                state.tags = action.payload
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.status = Status.FAILED
                state.error = `Failed to load data (${action.error.message})`
            })
    },
})

export const { setSortBy, setSortingOrder, sortData } = tagsSlice.actions
export default tagsSlice.reducer
export const selectTagsStatus = (state: RootState) => state.tags.status
export const selectTagsError = (state: RootState) => state.tags.error
export const selectTags = (state: RootState) => state.tags.tags
export const selectSortBy = (state: RootState) => state.tags.sortBy
export const selectSortingOrder = (state: RootState) => state.tags.sortingOrder