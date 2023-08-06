import { useState } from "react";
import { validateProperty, validate } from "../utils/validateForm";

const useForm = (userData, schema) => {
    const [data, setData] = useState(userData);

    const handleChange = ({ currentTarget: input }) => {
        const errorMessage = validateProperty(input, schema);

        if (errorMessage) {
            setData((prevData) => ({
                ...prevData,
                errors: {
                    ...prevData.errors,
                    [input.name]: errorMessage,
                },
            }));
        } else delete data.errors[input.name];

        setData((prevData) => ({
            ...prevData,
            user: {
                ...prevData.user,
                [input.name]: input.value,
            },
        }));
    };

    const handleSubmit = (e, doSubmit) => {
        e.preventDefault();

        const errors = validate(data.user, schema);
        setData((prevData) => ({
            ...prevData,
            errors: errors || {},
        }));

        if (errors) return;

        doSubmit()
    };

    return {
        data,
        setData,
        handleChange,
        handleSubmit
    }

}

export default useForm;