"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import CommonFieldset from "@/components/ui/fieldset";
import Link from "next/link";
import { useForm } from "react-hook-form";
import SocialAuthButtons from "@/components/shared/social-auth-buttons";
import { LoginRequestPayload } from "@/types";
import { useLogin } from "@/hooks";
import { USER_ROLES } from "@/constants";
import ResendEmailModal from "./resend-email-modal";
import toast from "react-hot-toast";
import api from "@/lib/axios-client";

const LoginForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // state
    const [isResendModalOpen, setIsResendModalOpen] = useState(false);
    const [unverifiedEmail, setUnverifiedEmail] = useState("");
    const [isRedirecting, setIsRedirecting] = useState(false);

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
    const { loginAsync, isPending } = useLogin();

    // check user has touched the fields or not
    const isLoginButtonDisabled =
        isPending ||
        isRedirecting ||
        Object.keys(errors)?.length > 0 ||
        !watch("email") ||
        !watch("password");

    // handle form submission
    const onSubmit = (data: LoginRequestPayload) => {
        loginAsync(data, {
            onSuccess: (res) => {
                setIsRedirecting(true);
                toast.success(res?.message || "Login successful! Redirecting...");

                // Check for callback or protected redirect URL
                const callbackUrl = searchParams.get("redirect") || searchParams.get("from");

                // Get role-wise and onboarding-wise destination from API response or fallback
                const user = res?.data?.user;
                const isEmployer = user?.role === USER_ROLES.EMPLOYER;
                const destination =
                    callbackUrl ||
                    res?.data?.redirectTo ||
                    (!user?.isOnboarded
                        ? isEmployer
                            ? "/onboarding/employer"
                            : "/onboarding/candidate"
                        : isEmployer
                            ? "/employer/dashboard"
                            : "/candidate/dashboard");

                router.replace(destination);
            },
            onError: (error) => {
                const responseData = error.response?.data;
                const errors = responseData?.errors;

                // শুধুমাত্র ইমেল ভেরিফাইড না থাকলে এই মোডাল ওপেন হবে
                if (
                    responseData?.errorCode === "EMAIL_NOT_VERIFIED" ||
                    responseData?.isEmailVerified === false
                ) {
                    setUnverifiedEmail(responseData?.data?.email || data.email);
                    setIsResendModalOpen(true);
                    return;
                }

                if (errors && errors.length > 0) {
                    errors.forEach((err) => {
                        setError(err.field as keyof LoginRequestPayload, {
                            type: "server",
                            message: err.message,
                        });
                    });
                    return;
                }

                toast.error(responseData?.message || "Something went wrong. Please try again later.");
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

                <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoginButtonDisabled}
                    className="w-full text-xs sm:text-sm py-3 sm:py-3.5 rounded"
                    isLoading={isPending || isRedirecting}
                >
                    {isRedirecting ? "Redirecting..." : "Sign In"}
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

            {/* Resend Email Verification Modal */}
            <ResendEmailModal
                isOpen={isResendModalOpen}
                onClose={() => setIsResendModalOpen(false)}
                email={unverifiedEmail}
                onResend={async (email) => {
                    try {
                        const res = await api.post("/auth/resend-verification", { email });
                        toast.success(res?.data?.message || "Verification email sent successfully!");
                        setIsResendModalOpen(false);
                    } catch (err: any) {
                        toast.error(
                            err?.response?.data?.message || "Failed to resend verification email."
                        );
                    }
                }}
            />
        </>
    );
};

export default LoginForm;
