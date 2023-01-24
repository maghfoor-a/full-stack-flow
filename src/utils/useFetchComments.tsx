import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BackendURL } from "./backendURL";
import { IComments } from "./interfaces";


export default function useFetchComments(id: string | undefined) {
    const [commentList, setCommentList] = useState<IComments[]>([]);
    const updateComments = useCallback(() => {
        try {
            axios.get(BackendURL + "comments/" + id).then((res) => setCommentList(res.data.rows));
        } catch (error) {
            window.alert("Failed to fetch comments");
        }
    }, [id]);
    useEffect(() => {
        updateComments();
    }, [updateComments]);
    return { commentList, updateComments };
}
