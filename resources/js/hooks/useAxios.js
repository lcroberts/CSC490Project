import { usePage } from "@inertiajs/react";
import axios from "axios";

export default function useAxios() {
    const { apiToken } = usePage().props;
    const http = axios.create({
        headers: {
            Authorization: "Bearer " + apiToken,
        },
        withCredentials: true,
    });

    return http;
}
