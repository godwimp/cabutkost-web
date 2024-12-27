import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { toast } from 'react-hot-toast';
import { Button } from "../../Components/uiadmin/Button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../Components/uiadmin/Form";
import { Input } from "../../Components/uiadmin/Input";

const Login = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        return () => {
            reset('password');
        }
    }, []);

    const submit = (e) => {
        e.preventDefault();
        
        post('/login', {
            onSuccess: () => {
                toast.success("Login berhasil!");
                router.visit("/dashboard");
            },
            onError: (errors) => {
                if (errors.email || errors.password) {
                    toast.error("Email atau password salah!");
                }
                if (errors.default) {
                    toast.error("Terjadi kesalahan, silahkan coba lagi!");
                }
            },
            onFinish: () => {
                reset('password');
            }
        });
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
            );
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setData("email", value);

        setValidationErrors(prev => {
            const newErrors = { ...prev };
            if(value && !validateEmail(value)) {
                newErrors.email = "Email tidak valid";
            } else {
                delete newErrors.email;
            }
            return newErrors;
        });
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setData("password", value);

        setValidationErrors(prev => {
            const newErrors = { ...prev };
            if(value.length < 6) {
                newErrors.password = "Password minimal 6 karakter";
            } else {
                delete newErrors.password;
            }
            return newErrors;
        });
    }

    const isValid = () => {
        return validateEmail(data.email) && data.password.length >= 6;
    };

    return (
        <div>
            <div className="p-4 mx-2 md:px-10 md:pt-6">
                <div className="flex justify-center">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="w-14 md:w-20 h-auto mb-2"
                    />
                </div>
                <img
                    src="/images/blurred.png"
                    alt="Blurred Circle"
                    className="hidden md:block absolute top-0 right-0 w-[380px] h-[380px]"
                />
                <img
                    src="/images/blurred2.png"
                    alt="Blurred Circle"
                    className="hidden md:block absolute bottom-0 left-0 w-[380px] h-[380px]"
                />
                <div className="md:flex md:justify-center md:mt-24 z-10">
                    <div className="md:items-center md:justify-center md:w-[400px] md:shadow-lg md:p-8 rounded-3xl">
                        <p className="hidden md:block text-md font-semibold">
                            Welcome Admin
                        </p>
                        <h1 className="font-semibold text-3xl md:text-4xl my-5">
                            Masuk
                        </h1>
                        <p className="md:hidden text-sm text-gray-500 my-5">
                            Masukkan email dan password kamu
                        </p>
                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="text-gray-500 text-sm">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleEmailChange}
                                    placeholder="example@gmail.com"
                                />
                                {(validationErrors.email) && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {validationErrors.email}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="text-gray-500 text-sm">
                                    Password
                                </label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handlePasswordChange}
                                    placeholder="******"
                                    className={errors.password ? "border-red-500" : ""}
                                    required
                                    minLength={6}
                                />
                                {(validationErrors.password) && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {validationErrors.password}
                                    </div>
                                )}
                            </div>
                            <Button
                                type="submit"
                                className={`w-full ${
                                    processing || !isValid() ? 'opacity-70 cursor-not-allowed' : "bg-gray-400"
                                }`}
                                disabled={processing || !isValid()}
                            >
                                {processing ? "Loading..." : "Masuk"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
