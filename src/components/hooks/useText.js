import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const useText = (textAreaRef) => {
    const MAX_CHARS = 100;
    const noteInitialData = {
        content: "",
        isMouseOnNote: false,
        isFocused: false,
        isExceedingCharLimit: false,
    }
    let prevText = "";

    const [note, setNote] = useState(noteInitialData);

    const onChange = (event) => {
        const { value } = event.target;
        const currentCharCount = value.length;

        if (currentCharCount > MAX_CHARS)
            return setNote((prevData) => ({
                ...prevData,
                isExceedingCharLimit: true
            }))

        prevText = value;
        setNote((prevData) => ({
            ...prevData,
            isExceedingCharLimit: false,
            content: value
        }))
    }

    const onMouseOver = () => setNote((prevData) => ({
        ...prevData,
        isMouseOnNote: true,
    }))

    const onMouseOut = () => setNote((prevData) => ({
        ...prevData,
        isMouseOnNote: false,
    }))

    const onClear = () => setNote((prevData) => ({
        ...prevData,
        content: ""
    }))

    useEffect(() => {
        const textareaElement = textAreaRef.current;

        const handleFocus = () => setNote((prevData) => ({
            ...prevData,
            isFocused: true
        }));

        const handleBlur = () => setNote((prevData) => ({
            ...prevData,
            isFocused: false
        }));

        textareaElement.addEventListener("focus", handleFocus);
        textareaElement.addEventListener("blur", handleBlur);

        return () => {
            textareaElement.removeEventListener("focus", handleFocus);
            textareaElement.removeEventListener("blur", handleBlur);
        };
    }, []);

    return {
        note,
        onChange,
        onMouseOver,
        onMouseOut,
        onClear
    };
}

export default useText;