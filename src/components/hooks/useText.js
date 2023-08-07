import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import noteService from "../../services/noteService";
import _ from "lodash";
import useNote from './useNote';

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
    const [isDirty, setIsDirty] = useState(false);

    const queryClient = useQueryClient();

    const updateNoteMutation = useMutation(content => noteService.updateNote({ id: note.id, content }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['note', note.id])
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
        setIsDirty(true);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (isDirty) {
                updateNoteMutation.mutate(note.content);
                setIsDirty(false);
            }
        }, 5000); // 5 seconds interval

        return () => clearInterval(interval);
    }, [isDirty, note.content]);

    const { data, isLoading } = useNote(note.id)
    useEffect(() => {
        if (!isLoading)
            setNote((prevData) => ({
                ...prevData,
                content: data.content
            }))
    }, [data, isLoading])

    const onMouseOver = () => setNote((prevData) => ({
        ...prevData,
        isMouseOnNote: true,
    }))

    const onMouseOut = () => setNote((prevData) => ({
        ...prevData,
        isMouseOnNote: false,
    }))

    const onClear = () => {
        setNote((prevData) => ({
            ...prevData,
            content: ""
        }))
        updateNoteMutation.mutate("")
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