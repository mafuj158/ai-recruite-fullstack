"use client";

import { Button } from "@/components/ui/button";
import CommonFieldset from "@/components/ui/fieldset";

import Link from "next/link";
import { useForm } from "react-hook-form";
import SocialAuthButtons from "@/components/shared/social-auth-buttons";
import { LoginRequestPayload } from "@/types";
import { useLogin } from "@/hooks/login.hook";

const LoginForm = () => {


    // hooks
    const {
        control,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm<LoginRequestPayload>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
    });
    const { login, loginAsync, isPending, data } = useLogin();


    // check user has touched the fields or not
    const isLoginButtonDisabled = isPending || Object.keys(errors)?.length > 0 || !watch('email') || !watch('password');


    // handle form submission
    const onSubmit = (data: LoginRequestPayload) => {

        loginAsync(data, {
            onSuccess: (data) => {
                console.log(data);

            },
            onError: (error) => {
                const responseData = error.response?.data;
                const errors = responseData?.errors;

                if (!responseData?.isEmailVerified) {
                    // show modal
                    console.log(errors);
                }

                if (errors && errors.length > 0) {
                    errors.forEach((err) => {
                        setError(err.field as keyof LoginRequestPayload, {
                            type: "server",
                            message: err.message,
                        });
                    });
                }

            }
        });




    };

    return (
        <>
            {/* Social Logins */}
            <SocialAuthButtons label="Or continue with email" role="candidate" />
            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                <CommonFieldset<LoginRequestPayload>
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
                <CommonFieldset<LoginRequestPayload>
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

                <Button type="submit" variant="primary" disabled={isLoginButtonDisabled} className="w-full text-xs sm:text-sm py-3 sm:py-3.5 rounded" isLoading={isPending}>
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