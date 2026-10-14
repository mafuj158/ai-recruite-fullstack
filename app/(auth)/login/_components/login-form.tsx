"use client";

import { Button } from "@/components/ui/button";
import CommonFieldset from "@/components/ui/fieldset";
import { LoginFormValues } from "@/types/auth/auth.types";
import Link from "next/link";
import { useForm } from "react-hook-form";
import SocialAuthButtons from "@/components/shared/social-auth-buttons";

const LoginForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        console.log(data);
    };

    return (
        <>
            {/* Social Logins */}
            <SocialAuthButtons label="Or continue with email" role="candidate" />
            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                <CommonFieldset<LoginFormValues>
                    control={control}
                    register_as="email"
                    label="Email Address"
                    type="email"
                    placeholder="name@example.com"
                    isRequired={true}
                    errors={errors}
                    validationRules={{
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                        },
                    }}
                />
                <CommonFieldset<LoginFormValues>
                    control={control}
                    register_as="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    isRequired={true}
                    errors={errors}
                    validationRules={{
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    }}
                />
                <div className="flex justify-end mt-1.5">
                    <Link
                        href="/forgot-password"
                        className="text-xs text-forest hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button type="submit" variant="primary" className="w-full text-xs sm:text-sm py-3 sm:py-3.5 rounded" isLoading={false}>
                    Sign In
                </Button>
            </form>
            {/* Footer */}
            <div className="mt-4 sm:mt-6 text-center text-xs text-zinc-500">
                Don&apos;t have an account?{" "}
                Sign up as {" "}
                <Link href="/register/candidate" className="text-forest font-semibold hover:underline">
                    Candidate
                </Link>
                {" "}
                or
                {" "}
                <Link href="/register/employer" className="text-forest font-semibold hover:underline">
                    Employer
                </Link>
            </div>
        </>
    );
};

export default LoginForm;