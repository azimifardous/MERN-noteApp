import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import noteService from "../../services/noteService";

const useText = (textAreaRef, noteId) => {
    const MAX_CHARS = 100;
    const noteInitialData = {
        id: noteId,
        content: "",
        isMouseOnNote: false,
        isFocused: false,
        isExceedingCharLimit: false,
    }
    let prevText = "";

    const [note, setNote] = useState(noteInitialData);

    const queryClient = useQueryClient();

    const updateNoteMutation = useMutation(content => noteService.updateNote({ id: note.id, content }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['note', note.id])
            queryClient.invalidateQueries(['notes'])
        }
    });

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
        updateNoteMutation.mutate(value);
    }

    const onMouseOver = () => setNote((prevData) => ({
        ...prevData,
        isMouseOnNote: true,
    }))

    const onMouseOut = () => setNote((prevData) => ({
        ...prevData,
        isMouseOnNote: false,
    }))

    const onClear = () => {
        updateNoteMutation.mutate("")
        setNote((prevData) => ({
            ...prevData,
            content: ""
        }))
    }

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