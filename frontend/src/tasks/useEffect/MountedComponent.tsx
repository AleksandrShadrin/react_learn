import { useEffect, type ReactElement } from "react";

export default function ComponentMounted(): ReactElement {
    useEffect(() => {
        console.log("component mounted");
    }, [])

    return <></>;
}