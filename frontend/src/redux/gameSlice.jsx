import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async (page, { getState, rejectWithValue }) => {
    const { games } = getState();

    if (games.fetchedPages.includes(page)) {
      return rejectWithValue("Page already fetched");
    }

    try {
      const response = await axios.get("https://api.rawg.io/api/games", {
        params: {
          key: import.meta.env.VITE_GAME_API_KEY,
          dates: "2000-09-01,2024-09-30",
          platforms: "18,1,7",
          page: page,
          page_size: 20,
        },
      });

      return { games: response.data.results, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const gamesSlice = createSlice({
  name: "games",
  initialState: {
    games: [],
    page: 1,
    fetchedPages: [],
    loading: false,
    error: null,
    searchQuery: "",
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state, action) => {
        if (!state.fetchedPages.includes(action.meta.arg)) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedPages.push(action.payload.page);

        const newGames = action.payload.games.filter(
          (newGame) => !state.games.some((game) => game.id === newGame.id)
        );

        state.games = [...state.games, ...newGames];
      })
      .addCase(fetchGames.rejected, (state, action) => {
        if (action.payload !== "Page already fetched") {
          state.error = action.payload;
        }
        state.loading = false;
      });
  },
});


export const { setPage, setSearchQuery } = gamesSlice.actions;
export default gamesSlice.reducer;
