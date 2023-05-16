"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from "@/components/inputs/Input";
import Button from "@/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

type Variant = "LOGIN" | "REGISTER";

export default function AuthForm() {
    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [isLoading, setLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant("REGISTER");
        } else {
            setVariant("LOGIN");
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);
        if (variant === "REGISTER") {
            axios
                .post("/api/register", data)
                .catch(() => toast.error("Something went wrong"))
                .finally(() => setLoading(false));
        }
        if (variant === "LOGIN") {
            signIn("credentials", {
                ...data,
                redirect: false,
            })
                .then((cb) => {
                    if (cb?.error) {
                        toast.error("Invalid credentials");
                    }
                    if (cb?.ok && !cb.error) {
                        toast.success("Logged in!");
                    }
                })
                .finally(() => setLoading(false));
        }
    };
    const socialAction = (action: string) => {
        setLoading(true);
        signIn(action, {
            redirect: false,
        })
            .then((cb) => {
                if (cb?.error) {
                    toast.error("Invalid credentials");
                }
                if (cb?.ok && !cb.error) {
                    toast.success("Logged in!");
                }
            })
            .finally(() => setLoading(false));
    };
    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:px-10 lg:rounded-lg">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === "REGISTER" && (
                        <Input
                            id="name"
                            errors={errors}
                            register={register}
                            label="Name"
                            disabled={isLoading}
                        />
                    )}
                    <Input
                        id="email"
                        errors={errors}
                        register={register}
                        label="Email"
                        disabled={isLoading}
                    />
                    <Input
                        id="password"
                        errors={errors}
                        register={register}
                        label="password"
                        disabled={isLoading}
                        type="password"
                    />
                    <div>
                        <Button type="submit" disabled={isLoading} fullWidth>
                            {variant === "LOGIN" ? "Sign in" : "Register"}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction("github")}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction("google")}
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
                    <div>
                        {variant === "LOGIN"
                            ? "New to Messenger?"
                            : "Already have an account"}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="cursor-pointer underline"
                    >
                        {variant === "LOGIN" ? "Create an account" : "Login"}
                    </div>
                </div>
            </div>
        </div>
    );
}
