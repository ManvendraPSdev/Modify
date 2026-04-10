import { useContext, useCallback } from "react";
import { getSong } from "../services/song.api.js";
import { songContext } from "../song.context.jsx";

export const useSong = () => {
    const context = useContext(songContext);
    const { song, setSong, loading, setLoading } = context;

    const handelGetSong = useCallback(
        async ({ mood }) => {
            if (mood == null || mood === "") return;
            setLoading(true);
            try {
                const data = await getSong({ mood });
                setSong(data?.song ?? data);
            } finally {
                setLoading(false);
            }
        },
        [setSong, setLoading]
    );

    return { loading, song, handelGetSong };
};